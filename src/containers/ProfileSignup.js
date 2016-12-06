import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../actions'
import { browserHistory } from 'react-router'
import { SubmissionError } from 'redux-form'
import cookie from 'react-cookie'
import SignupValidationForm from '../components/profile/SignupValidationForm'
import { api } from '../config.js'

class ProfileSignup extends Component {
  componentWillMount() {
    const programParam = this.props.params.program
    const { amount, type, promo } = this.props.location.query
    const packageType = type
    let program

    switch (programParam) {
      case 'mommy':
        program = 2
        break
      case 'extremeways':
        program = 3
        break
      case 'tommorowman':
        program = 4
        break
      default:
        program = 1
    }

    const { signup } = this.props
    signup(program, amount, packageType, promo)
  }

  statusChangeCallback(response) {
    if (response.status === 'connected') {
    } else if (response.status === 'not_authorized') {
      document.getElementById('status').innerHTML = 'Please log ' +
        'into this app.'
    } else {
      document.getElementById('status').innerHTML = 'Please log ' +
        'into Facebook.'
    }
  }

  render() {
    const programParam = this.props.params.program
    const { amount, type } = this.props.location.query
    const packageType = type

    const { setToken } = this.props
    let program
    let programName
    let packageName

    switch (programParam) {
      case 'mommy':
        programName = '#МАМА МОЖЕТ'
        program = 2
        break
      case 'extremeways':
        programName = '#ЭКСТРИМАЛЬНАЯ СУШКА'
        program = 3
        break
      case 'tommorowman':
        programName = '#Я ЗАВТРА'
        program = 4
        break
      default:
        programName = '#Я ГЕРОЙ'
        program = 1
    }

    switch (packageType) {
      case 1:
        packageName = '1  человек'
        break
      case 2:
        packageName = '2  человек'
        break
      case 3:
        packageName = '3  человек'
        break
      default:
        packageName = '1  человек'
    }

    return (
      <div className="layout layout--registration">

        <div className="header">
          <div className="grid header__inner">
            <h1 className="1/2--portable 1/1--desk grid__cell header__logo">
              Ясегодня
              <img src="/assets/img/ys_logo.svg" alt="Ясегодня"/>
            </h1>
            <div className="1/2--portable grid__cell header__right-side">
              <a href="#" className="header__link js-popup-ya-geroy">{programName}</a>
            </div>
          </div>
        </div>

        <div className="entry-bc__wrap entry-bc__wrap--step-1">
          <ul className="entry-bc">
            <li className="entry-bc__item entry-bc__item--active">
              <span className="entry-bc__num">1</span>
              <span className="entry-bc__title">Регистрация/Вход</span>
            </li>
            <li className="entry-bc__item">
              <span className="entry-bc__num">2</span>
              <span className="entry-bc__title">Способ оплаты</span>
            </li>
            <li className="entry-bc__item">
              <span className="entry-bc__num">3</span>
              <span className="entry-bc__title">Оплата</span>
            </li>
            <li className="entry-bc__item">
              <span className="entry-bc__num">4</span>
              <span className="entry-bc__title">Подтверждение</span>
            </li>
          </ul>
        </div>

        <div className="entry entry--sign-up">

          <div className="entry__inner">
            <div className="entry-info">
              <div className="entry-info__inner">
                <div className="entry-info__mob-title">
                  <p>Информация о пакете</p>
                  <hr/>
                </div>
                <div className="entry-info__title">{programName}</div>
                <p className="entry-info__sub-title">Оформление на участие в проекте</p>

                <ul className="packet-info">
                  <li className="packet-info__item">
                    <span className="packet-info__name-title">Пакет</span>
                    <span className="packet-info__name">{packageName}</span>
                  </li>
                  <li className="packet-info__item">
                    <span className="packet-info__name-title">Цена</span>
                    <span className="packet-info__name">{amount} руб.</span>
                  </li>
                </ul>

                <p>Учавствуешь в проекте и борешься за ценные призы</p>
              </div>
            </div>

            <div className="entry__box">

              <div className="entry-form">

                <h2 className="h2">Зарегистрируйтесь или Войдите</h2>

                <hr/>

                <SignupValidationForm onSubmit={data => {
                  const { email, password } = data
                  const payload = { program, email, password, package: packageType }

                  return fetch(`${api}/user/user-create`, {
                      headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                      },
                      method: 'POST',
                      body: JSON.stringify(payload)
                    })
                    .then(response => response.json())
                    .then(json => {
                      if (json.data && json.data.authToken) {
                        cookie.save('token', json.data.authToken, { path: '/' })
                        setToken(json.data.authToken)
                        browserHistory.push('/signup/pay')
                      } else {
                        throw new SubmissionError({ password: '', _error: 'Что-то пошло не так, возможно такой email уже существует' })
                      }
                    })
                }}/>

                <p className="entry-form__note">Выполнив этот шаг вы автоматически перейдете к следующему</p>

              </div>

            </div>
          </div>

        </div>

        <div id="pay-success">
          <div className="base-popup__msg">
            <h3 className="h1">Оплата прошла успешно!</h3>
            <hr/>
            <div className="base-popup__msg-content">
              <p className="base-parag">Вам придет подтверждение об оплате с кодом на ваш Email<br/> alex@gmail.com</p>
            </div>
            <div className="btn btn--primary">Отлично!</div>
          </div>
        </div>

      </div>
    )
  }
}

const mapStateToProps = state => ({
  program: state.profile,
  email: state.profile,
  password: state.profile,
})

const mapDispatchToProps = dispatch => ({
  signup: bindActionCreators(actions.signup, dispatch),
  setToken: bindActionCreators(actions.setToken, dispatch)
})

ProfileSignup = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileSignup)

export default ProfileSignup
