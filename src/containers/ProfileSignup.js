import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../actions'
import LoginValidationForm from '../components/profile/LoginValidationForm'
import { browserHistory } from 'react-router'
import { SubmissionError } from 'redux-form'
import cookie from 'react-cookie'
import { Field, reduxForm } from 'redux-form'
import CustomInput from '../components/componentKit/CustomInput'
import SignupValidationForm from '../components/profile/SignupValidationForm'

const FB = window.FB
const VK = window.VK

class ProfileSignup extends Component {
  componentWillMount() {
    const programParam = this.props.params.program
    const { amount, type } = this.props.location.query
    const packageType = type
    let program

    switch (programParam) {
      case 'mommy':
        program = '#МАМА МОЖЕТ'
        break
      case 'extremeways':
        program = '#ЭКСТРИМАЛЬНАЯ СУШКА'
        break
      case 'tommorowman':
        program = '#Я ЗАВТРА'
        break
      default:
        program = '#Я ГЕРОЙ'
    }

    const { signup } = this.props
    signup(program, amount, packageType)
  }

  statusChangeCallback(response) {
    console.log('statusChangeCallback')
    console.log(response)
    if (response.status === 'connected') {
      console.log('connect')
    } else if (response.status === 'not_authorized') {
      document.getElementById('status').innerHTML = 'Please log ' +
        'into this app.'
    } else {
      document.getElementById('status').innerHTML = 'Please log ' +
        'into Facebook.'
    }
  }

  checkLoginState() {
    FB.getLoginStatus(function(response) {
      this.statusChangeCallback(response)
    })
  }

  render() {
    const programParam = this.props.params.program
    const { amount, type } = this.props.location.query
    const packageType = type

    const { error, handleSubmit, pristine, reset, setToken, submitting } = this.props
    let program

    switch (programParam) {
      case 'mommy':
        program = '#МАМА МОЖЕТ'
        break
      case 'extremeways':
        program = '#ЭКСТРИМАЛЬНАЯ СУШКА'
        break
      case 'tommorowman':
        program = '#Я ЗАВТРА'
        break
      default:
        program = '#Я ГЕРОЙ'
    }

    const loginVk = () => {
      VK.Auth.login(response => {
        console.log(response)
        const { first_name, last_name } = response.session.user
      }, VK.access.EMAIL);
    }

    const loginFb = () => {
      const self = this
      console.log(self)
      FB.login(response => {
        if (response.status === 'connected') {
          const userID = response.userID
          FB.api(`/me?fields=first_name,last_name,email`,
            response => {
              const { email, first_name, last_name } = response
              const { setToken } = self.props
              const programParam = self.props.params.program
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

              FB.api(`/me/picture?type=small`,
                response => {
                  const photo = response.data.url
                  const payload = { program, email, first_name, last_name, photo }

                  return fetch('http://sport.muhanov.net/api/user/user-create', {
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
                      throw new SubmissionError({ passwordAa: '', _error: 'Что-то пошло не так, возможно такой email уже существует' })
                    }
                  })
                }
              )
            }
          )
        } else if (response.status === 'not_authorized') {
          console.log('there')
          // The person is logged into Facebook, but not your app.
        } else {
          console.log('anywhere')
          // The person is not logged into Facebook, so we're not sure if
          // they are logged into this app or not.
        }
      }, { scope: 'email' })
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
              <a href="#" className="header__link js-popup-ya-geroy">{program}</a>
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
                <div className="entry-info__title">{program}</div>
                <p className="entry-info__sub-title">Оформление на участие в проекте</p>

                <ul className="packet-info">
                  <li className="packet-info__item">
                    <span className="packet-info__name-title">Пакет</span>
                    <span className="packet-info__name">{packageType}</span>
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

                <div className="grid grid--middle">
                  <SignupValidationForm onSubmit={(data) => {
                    const { email, password } = data
                    switch(program) {
                      case '#МАМА МОЖЕТ':
                        program = 2
                        break
                      case '#ЭКСТРИМАЛЬНАЯ СУШКА':
                        program = 3
                        break
                      case '#Я ЗАВТРА':
                        program = 4
                        break
                      default:
                        program = 1
                    }

                    const payload = { program, email, password }

                    return fetch('http://sport.muhanov.net/api/user/user-create', {
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
                          throw new SubmissionError({ passwordAa: '', _error: 'Что-то пошло не так, возможно такой email уже существует' })
                        }
                      })
                  }}/>
                  <div className="1/2--desk grid__cell entry-form__social">
                    <p className="entry-form__social-title">Войти через социальные сети</p>
                    <ul className="social-signin">
                      <li className="social-signin__item social-signin__item--vk" onClick={loginVk}>
                        <svg className="svg-icon ico-vk">
                          <use xlinkHref="#vk"></use>
                        </svg>
                      </li>
                      <li className="social-signin__item social-signin__item--odnoklassniki">
                        <svg className="svg-icon ico-odnoklassniki">
                          <use xlinkHref="#odnoklassniki"></use>
                        </svg>
                      </li>
                      <li className="social-signin__item social-signin__item--fb" onClick={loginFb}>
                        <svg className="svg-icon ico-fb">
                          <use xlinkHref="#fb"></use>
                        </svg>
                      </li>
                    </ul>
                  </div>
                </div>

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
