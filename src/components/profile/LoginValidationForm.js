import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { browserHistory } from 'react-router'
import * as actions from '../../actions'
import cookie from 'react-cookie'
import InputProfile from '../componentKit/InputProfile'
import { api, host } from '../../config.js'

let contentStyle = {
  borderRadius: '18px',
  padding: '30px'
}

const FB = window.FB

class LoginValidationForm extends Component {
  componentWillMount() {
    if (window.mobilecheck()) {
      contentStyle.width = '300px'
    }
  }

  componentDidMount() {
    document.addEventListener('DOMContentLoaded', function () {
      window.addEventListener('message', function (event) {
        if (event.data.name === 'okAuth') {
          browserHistory.push({ pathname: '/social/ok', query: { code: event.data.code } })
        }
      }, false)
    }, false)
  }

  render() {
    const { error, handleSubmit, packageType, program, promo } = this.props

    const loginVk = () => {
      if (packageType)
        cookie.save('packageType', packageType, { path: '/', maxAge: 60 * 60 * 24 * 365 * 10 })
      if (program)
        cookie.save('program', program, { path: '/', maxAge: 60 * 60 * 24 * 365 * 10 })
      if (promo)
        cookie.save('promoName', promo, { path: '/', maxAge: 60 * 60 * 24 * 365 * 10 })

      window.location = `https://oauth.vk.com/authorize?client_id=5750682&scope=offline&redirect_uri=${host}/social/vk&display=page&response_type=code`
    }

    const loginOk = () => {
      if (packageType)
        cookie.save('packageType', packageType, { path: '/', maxAge: 60 * 60 * 24 * 365 * 10 })
      if (program)
        cookie.save('program', program, { path: '/', maxAge: 60 * 60 * 24 * 365 * 10 })
      if (promo)
        cookie.save('promoName', promo, { path: '/', maxAge: 60 * 60 * 24 * 365 * 10 })

      const url = `https://connect.ok.ru/oauth/authorize?client_id=1248995328&scope=VALUABLE_ACCESS,LONG_ACCESS_TOKEN,PHOTO_CONTENT,GET_EMAIL&response_type=code&redirect_uri=${host}/social/ok`
      window.open(url, "Odnoklassniki", "width=700,height=400")
    }

    const redirectFb = () => {
      let uri

      if (program && packageType) {
        uri = encodeURI(`${host}/social/fb?type=${packageType},${program},${promo}`)
      } else {
        uri = encodeURI(`${host}/social/fb`)
      }

      window.location = encodeURI("https://www.facebook.com/dialog/oauth?client_id=602675109923486&redirect_uri="+uri+"&response_type=token")
    }

    const loginFb = () => {
      const self = this
      FB.getLoginStatus(function(response) {
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
              cookie.save('token', json.data.authToken, { path: '/', maxAge: 60 * 60 * 24 * 365 * 10 })
              self.props.setToken(json.data.authToken)
              browserHistory.push('/signup/pay')
            } else {
              redirectFb()
            }
          })
        } else {
          redirectFb()
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
                    <div className="input input--line">
                      <Field name='email' id='login[1]' placeholder='Ваш e-mail' component={InputProfile} />
                      <Field name='password' id='login[2]' placeholder='Ваш пароль' type='password' component={InputProfile} />
                    </div>
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
                      <li className="social-signin__item social-signin__item--odnoklassniki" onClick={loginOk}>
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

const mapStateToProps = state => {
  let { program, packageType, promo } = state

  return {
    program,
    packageType,
    promo
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
