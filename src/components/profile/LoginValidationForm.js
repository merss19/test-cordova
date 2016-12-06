import React, { Component } from 'react'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { browserHistory } from 'react-router'
import { SubmissionError } from 'redux-form'
import * as actions from '../../actions'
import Modal from 'boron/DropModal'
import cookie from 'react-cookie'
import CustomInput from '../componentKit/CustomInput'
import SelectProgram from '../componentKit/SelectProgram'
import { api, host } from '../../config.js'

const contentStyle = {
  borderRadius: '18px',
  padding: '30px'
}

const FB = window.FB
let fbPayload = {}
let fbUserId

class LoginValidationForm extends Component {
  render() {
    const { error, handleSubmit, packageType, program, promo, email, setToken, signup } = this.props

    const loginVk = () => {
      if (program && packageType) {
        window.location = `https://oauth.vk.com/authorize?client_id=5750682&scope=offline&redirect_uri=${host}/social/vk?type=${packageType},${program},${promo}&display=page&response_type=token`
      } else {
        this.refs.accModal.show()
      }
    }

    const loginOk = () => {
      if (program && packageType) {
        window.location(`https://connect.ok.ru/oauth/authorize?client_id=1248995328&scope=VALUABLE_ACCESS&response_type=token&redirect_uri=${host}/social/ok&state=${packageType},${program},${promo}`)
      } else {
        this.refs.accModal.show()
      }
    }

    const goToPayment = () => {
      fbPayload.program = program
      fbPayload.package = packageType
      fbPayload.promo   = promo

      if (!fbPayload.email)
        fbPayload.email   = email

      if (!fbPayload.program || !fbPayload.package || !fbPayload.email) {
        this.refs.accModalFB.show()
        return
      }

      const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }

      return fetch(`${api}/user/user-create`, {
        headers,
        method: 'POST',
        body: JSON.stringify(fbPayload)
      })
      .then(response => response.json())
      .then(json => {
        if (json.errorCode === 1 && json.data && json.data.authToken) {
          cookie.save('token', json.data.authToken, { path: '/' })
          setToken(json.data.authToken)

          const payload = {
            authToken: json.data.authToken,
            data: {
              socialNetType: 3,
              userId: fbUserId
            }
          }

          return fetch(`${api}/user/socialNetUser-create`, {
              headers,
              method: 'POST',
              body: JSON.stringify(payload)
            })
            .then(response => response.json())
            .then(json => {
              if (json && json.data) {
                signup(program, undefined, packageType, promo)
                browserHistory.push('/signup/pay')
              } else {
                throw new SubmissionError({ password: '', _error: 'Что-то пошло не так, попробуйте снова' })
              }
            })
        } else {
          throw new SubmissionError({ password: '', _error: 'Что-то пошло не так, попробуйте снова' })
        }
      })
    }

    const signupFb = () => {
      FB.login(response => {
        fbUserId = response.authResponse.userID
        if (response.status === 'connected') {
          FB.api(`/me?fields=first_name,last_name,email`,
            response => {
              const firstName = response.first_name
              const lastName  = response.last_name
              fbPayload = { program, package: packageType, email: email ? email : response.email, firstName, lastName, promo }

              FB.api(`/me/picture?type=normal`,
                response => {
                  let photo
                  if (response && response.data && response.data.url) {
                    photo = response.data.url
                  }

                  if (photo)
                    fbPayload.photo = photo

                  goToPayment()
                }
              )
            }
          )
        } else if (response.status === 'not_authorized') {
          // The person is logged into Facebook, but not your app.
        } else {
          // The person is not logged into Facebook, so we're not sure if
          // they are logged into this app or not.
        }
      }, { scope: 'email' })
    }

    const loginFb = () => {
      const self = this
      FB.login(response => {
        if (response.status === 'connected') {
          const token = response.authResponse.accessToken
          const userId = response.authResponse.userID
          const payload = { userId, token }
          return fetch(`${api}/user/authenticate-social`, {
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              method: 'POST',
              body: JSON.stringify(payload)
            })
            .then(response => response.json())
            .then(json => {
              if (json.errorCode === 1 && json.data && json.data.authToken) {
                cookie.save('token', json.data.authToken, { path: '/' })
                self.props.setToken(json.data.authToken)
                browserHistory.push('/profile/create')
              } else {
                signupFb()
              }
            })
        } else if (response.status === 'not_authorized') {
        } else {
        }
      }, { scope: 'email' })
    }

    return (
      <div className="layout layout--login">

        <div className="header">
          <div className="grid header__inner">
            <h1 className="grid__cell header__logo">
              Ясегодня
              <img src="/assets/img/ys_logo.svg" alt="Ясегодня"/>
            </h1>
          </div>
        </div>

        <div className="entry entry--sign-in">

          <div className="entry__inner">
            <div className="entry__box">

              <form onSubmit={handleSubmit(this.props.onSubmit)} className="entry-form">
                <div className="entry-form__header">
                  <Link to="/signup">Регистрация</Link>
                </div>

                <hr/>

                {error && <strong>{error}</strong>}

                <h2 className="h2">Вход в Личный кабинет </h2>

                <div className="grid grid--middle">
                  <div className="1/2--desk grid__cell entry-form__email">
                    <Field name='email' id='login[1]' title='Ваш e-mail' component={CustomInput} />
                    <Field name='password' id='login[2]' title='Ваш пароль' type='password' component={CustomInput} />
                    <button type='submit' className="btn btn--primary">
                      Войти
                    </button>
                    <Link to="/restore">Забыли пароль?</Link>
                  </div>
                  <div className="1/2--desk grid__cell entry-form__social">
                    <p className="entry-form__social-title">Войти через социальные сети</p>
                    <ul className="social-signin">
                      <li className="social-signin__item social-signin__item--vk" onClick={loginVk}>
                        <svg className="svg-icon ico-vk">
                          <use xlinkHref="#vk"></use>
                        </svg>
                      </li>
                      {/* <li className="social-signin__item social-signin__item--odnoklassniki">
                        <svg className="svg-icon ico-odnoklassniki">
                          <use xlinkHref="#odnoklassniki"></use>
                        </svg>
                      </li> */}
                      <li className="social-signin__item social-signin__item--fb" onClick={loginFb}>
                        <svg className="svg-icon ico-fb">
                          <use xlinkHref="#fb"></use>
                        </svg>
                      </li>
                    </ul>
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
                    { name: '3 человека', value: 3 },
                  ]} component={SelectProgram} />
                  <Field name='promoValue' id='promoValue' title='Промокод, если есть' component={CustomInput} />
                  <button className="btn btn--action" onClick={loginVk}>
                    Продолжить
                  </button>
                </Modal>

                <Modal ref='accModalFB' modalStyle={contentStyle}>
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
                    { name: '3 человека', value: 3 },
                  ]} component={SelectProgram} />
                  {!email &&
                    <Field name='emailValue' id='emailValue' title='Email' component={CustomInput} />
                  }
                  <Field name='promoValue' id='promoValue' title='Промокод, если есть' component={CustomInput} />
                  <button className="btn btn--action" onClick={goToPayment}>
                    Продолжить
                  </button>
                </Modal>

              </form>
            </div>
          </div>

        </div>

      </div>
    )
  }
}

const validate = data => {
  const errors = {}

  if (!data.email)
    errors.email = 'Email должен быть заполнен'

  if (!data.password)
    errors.password = 'Поле пароля должно быть заполнено'

  return errors
}

LoginValidationForm = reduxForm({
  form: 'loginValidation',
  validate
})(LoginValidationForm)

const selector = formValueSelector('loginValidation')
const mapStateToProps = state => {
  let { program, packageType, promo } = state

  if (!program || !packageType) {
    program = selector(state, 'programValue')
    packageType = selector(state, 'packageTypeValue')
  } else {
    program = 1
    packageType = 1
  }

  const email = fbPayload.email ? fbPayload.email : selector(state, 'emailValue')
  promo = selector(state, 'promoValue')

  return {
    program,
    packageType,
    promo,
    email
  }
}

const mapDispatchToProps = dispatch => ({
  signup: bindActionCreators(actions.signup, dispatch),
  setToken: bindActionCreators(actions.setToken, dispatch)
})

LoginValidationForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginValidationForm)

export default LoginValidationForm
