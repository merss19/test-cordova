import React, { Component } from 'react'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import { Link } from 'react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import cookie from 'react-cookie'
import Modal from 'boron/DropModal'
import { browserHistory } from 'react-router'
import { SubmissionError } from 'redux-form'
import * as actions from '../../actions'
import InputProfile from '../componentKit/InputProfile'
import SelectProgram from '../componentKit/SelectProgram'
import { api, host } from '../../config.js'

let contentStyle = {
  borderRadius: '18px',
  padding: '30px'
}

const FB = window.FB
let fbPayload = {}
let fbUserId

class SignupValidationForm extends Component {
  componentWillMount() {
    if (window.mobilecheck()) {
      contentStyle.width = '300px'
    }
  }

  componentDidMount() {
    const { change, email } = this.props

    if (email) {
      change('email', email)
    }
  }

  render() {
    const { error, handleSubmit, packageType, program, onSubmit, promo, setToken } = this.props

    const loginVk = () => {
      if (packageType)
        cookie.save('packageType', packageType, { path: '/' })
      if (program)
        cookie.save('program', program, { path: '/' })
      if (promo)
        cookie.save('promo', promo, { path: '/' })

      window.location = `https://oauth.vk.com/authorize?client_id=5750682&scope=offline&redirect_uri=${host}/social/vk&display=page&response_type=code`
    }

    const redirectFb = () => {
      let uri

      if (program) {
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
              cookie.save('token', json.data.authToken, { path: '/' })
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
      <div className="grid grid--middle">
        <form onSubmit={handleSubmit(onSubmit)} className="1/2--desk grid__cell entry-form__email">
          <div className="input input--line">
            <Field name='email' id='login[1]' placeholder='Ваш e-mail' component={InputProfile} />
            <Field name='password' id='login[2]' placeholder='Ваш пароль' type='password' component={InputProfile} />
            <Field name='passwordAgain' id='login[3]' placeholder='Пароль повторно' type='password' component={InputProfile} />
          </div>
          {error && <strong>{error}</strong>}
          <button type='submit' className="btn btn--action">
            Зарегистрироваться
          </button>
          <Link to="/">Войти</Link>
          <br/>
          <Link to="/restore">Забыли пароль?</Link>
        </form>
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
    )
  }
}

const validate = data => {
  const errors = {}

  if (data.email)
    data.email = data.email.replace(/ /g,'')

  switch (true) {
    case !data.email:
      errors.email = 'Email должен быть заполнен'
      break
    case !/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i.test(data.email):
      errors.email = 'Email заполнен неправильно, проверьте его еще раз'
      break
    default:
      break
  }

  switch (true) {
    case !data.password:
      errors.password = 'Поле пароля должно быть заполнено'
      break
    case data.password.length < 6:
      errors.password = 'Поле пароля должно быть длиннее 6 символов'
      break
    case data.password.length > 20:
      errors.password = 'Поле пароля должно быть короче 20 символов'
      break
    case /["]/g.test(data.password):
      errors.password = 'Поле пароля не должно содержать знак "'
      break
    default:
      break
  }

  if (data.password !== data.passwordAgain)
    errors.passwordAgain = 'Пароли должны совпадать'

  return errors
}

const asyncValidate = values => {
  return fetch(`${api}/user/user-check`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({ email: values.email })
  })
  .then(response => response.json())
  .then(json => {
    console.log(json)
    if (json.data) {
      throw { email: 'Такой email уже существует' }
    }
  })
}

SignupValidationForm = reduxForm({
  form: 'signupFormValidation',
  validate,
  asyncValidate,
  asyncBlurFields: [ 'email' ]
})(SignupValidationForm)

const selector = formValueSelector('signupFormValidation')
const mapStateToProps = state => {
  let { program, packageType, promo } = state.profile

  return {
    program,
    packageType,
    promo,
  }
}

const mapDispatchToProps = dispatch => ({
  setToken: bindActionCreators(actions.setToken, dispatch)
})

SignupValidationForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(SignupValidationForm)

export default SignupValidationForm
