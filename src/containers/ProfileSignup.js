import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../actions'
import { browserHistory } from 'react-router'
import { SubmissionError } from 'redux-form'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import cookie from 'react-cookie'
import SignupValidationForm from '../components/profile/SignupValidationForm'
import { api } from '../config.js'
import Modal from 'boron/DropModal'
import CustomInput from '../components/componentKit/CustomInput'
import SelectProgram from '../components/componentKit/SelectProgram'

const contentStyle = {
  borderRadius: '18px',
  padding: '30px'
}

let email
let password

class ProfileSignup extends Component {
  componentWillMount() {
    const programParam = this.props.params.program
    const { amount, type, promo } = this.props.location.query
    const packageType = type
    let program

    switch (programParam) {
      case 'hero':
        program = 1
        break
      case 'mommy':
        program = 2
        break
      case 'extremeways':
        program = 3
        break
      case 'tomorrowman':
        program = 4
        break
      default:
        break
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
    let { amount, packageType, promo, program } = this.props
    const { setToken, signup } = this.props
    let programName
    let packageName
    amount = !!amount ? amount : 0

    switch (program) {
      case 1:
        programName = '#Я ГЕРОЙ'
        break
      case 2:
        programName = '#МАМА МОЖЕТ'
        break
      case 3:
        programName = '#ЭКСТРИМАЛЬНАЯ СУШКА'
        break
      case 4:
        programName = '#Я ЗАВТРА'
        break
      default:
        programName = 'ЯСЕГОДНЯ'
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
        packageName = 'Не определено'
    }

    const userCreate = (payload) => {
      console.log(payload)
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
                  email = data.email
                  password = data.password
                  if (!program || !packageType) {
                    this.refs.accModal.show()
                    return
                  }

                  const payload = { program, email, password, package: packageType }

                  return userCreate(payload)
                }}/>

                <p className="entry-form__note">Выполнив этот шаг вы автоматически перейдете к следующему</p>

              </div>

            </div>
          </div>

        </div>


        <Modal ref='accModal' modalStyle={contentStyle}>
          <h2>Выберите программу</h2>
          <br/>
          <Field name="programValue" id="programValue" options={[
            { name: '#Я ГЕРОЙ', value: 1},
            { name: '#МАМА МОЖЕТ', value: 2 },
            { name: '#ЭКСТРИМАЛЬНАЯ СУШКА', value: 3 },
            { name: '#Я ЗАВТРА', value: 4 }
          ]} component={SelectProgram} />
          <Field name="packageTypeValue" id="packageTypeValue" options={[
            { name: '1 человек', value: 1},
            { name: '2 человека', value: 2 },
            { name: '3 человека', value: 3 }
          ]} component={SelectProgram} />
          <Field name='promoValue' id='promoValue' title='Промокод, если есть' component={CustomInput} />
          <button className="btn btn--action" onClick={() => {
            program = !!program ? program : 1
            packageType = !!packageType ? packageType : 1
            signup(program, undefined, packageType, promo)
            const payload = { program, email, password, package: packageType }
            return userCreate(payload)
          }}>
            Продолжить
          </button>
        </Modal>

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

ProfileSignup = reduxForm({
  form: 'signupValidation'
})(ProfileSignup)

const selector = formValueSelector('signupValidation')
const mapStateToProps = state => {
  let { program, packageType, promo, amount } = state.profile

  if (!program || !packageType) {
    program = selector(state, 'programValue')
    packageType = selector(state, 'packageTypeValue')
  }

  promo = selector(state, 'promoValue')

  return {
    program,
    packageType,
    promo,
    amount
  }
}

const mapDispatchToProps = dispatch => ({
  signup: bindActionCreators(actions.signup, dispatch),
  setToken: bindActionCreators(actions.setToken, dispatch)
})

ProfileSignup = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileSignup)

export default ProfileSignup
