import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import * as actions from '../../actions'
import { browserHistory } from 'react-router'
import { SubmissionError } from 'redux-form'
import Modal from 'boron/FadeModal'
import cookie from 'react-cookie'
import { api } from '../../config.js'

import CheckboxOfert from '../componentKit/CheckboxOfert'
import CustomInput from '../componentKit/CustomInput'
import InputProfile from '../componentKit/InputProfile'
import InputProfilePhone from '../componentKit/InputProfilePhone'
import SelectProgram from '../componentKit/SelectProgram'

let contentStyle = {
  borderRadius: '18px',
  padding: '30px'
}

let packageTypeInitial
let programInitial
let promoInitial
let token
let userId
let socialNetType
let socialName
let shareInitial
let isFetching

class LoginFB extends Component {
  componentDidMount() {
    this.refs.loadingModal.show()
    if (window.mobilecheck()) {
      contentStyle.width = '300px'
    }

    const { setToken } = this.props
    const queryHash = this.props.location.hash
    token = queryHash.match(/#access_token=(.*)&exp.*/)[1]

    socialNetType = 3
    socialName = 'Facebook'

    return fetch(`https://graph.facebook.com/me?access_token=${token}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'GET'
    })
    .then(response => response.json())
    .then(json => {
      userId = json.id
      const payload = { socialNetType, token, userId }

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
          this.refs.loadingModal.hide()
          if (json.errorCode === 1 && json.data && json.data.authToken) {
            cookie.save('token', json.data.authToken, { path: '/' })
            setToken(json.data.authToken)
            browserHistory.push('/signup/pay')
          } else {
            if (this.props.location.query && this.props.location.query.type) {
              const query = this.props.location.query.type.split(',')
              packageTypeInitial = query[0]
              programInitial = query[1]
              promoInitial = query[2]
            }

            if (!programInitial || !packageTypeInitial || programInitial + '' === '4') {
              this.refs.accModal.show()
            } else {
              this.refs.emailModal.show()
            }
          }
        })
    })
  }

  render() {
    const { packageType, handleSubmit, program, promo, setToken, signup, share, phoneFriend, nameFriend } = this.props
    let { email, emailFriend } = this.props

    const signupWith = (email, program, packageType, promo, share) => {
      if (!isFetching) {
        isFetching = true
        if (email)
          email = email.replace(/ /g,'')
        if (emailFriend)
          emailFriend = emailFriend.replace(/ /g,'')

        this.refs.loadingModal.show()
        const pack = program === '4' || !packageType ? '1' : packageType
        signup(program, undefined, pack, promo, emailFriend, share, phoneFriend, nameFriend)

        const payload = {
          email: email ? email.replace(/ /g,'') : email,
          program: program ? program : '1',
          package: pack
        }

        const headers = {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }

        return fetch(`${api}/user/user-create`, {
            headers,
            method: 'POST',
            body: JSON.stringify(payload)
          })
          .then(response => response.json())
          .then(json => {
            if (json.data && json.data.authToken) {
              cookie.save('token', json.data.authToken, { path: '/' })
              setToken(json.data.authToken)

              const payload = {
                authToken: json.data.authToken,
                data: {
                  socialNetType,
                  token,
                  userId
                }
              }

              return fetch(`${api}/user/socialNetUser-create`, {
                  headers,
                  method: 'POST',
                  body: JSON.stringify(payload)
                })
                .then(response => response.json())
                .then(json => {
                  isFetching = false
                  if (json && json.data) {
                    this.refs.loadingModal.hide()
                    browserHistory.push('/signup/pay')
                  } else {
                    throw new SubmissionError({ password: '', _error: 'Что-то пошло не так, попробуйте снова' })
                  }
                })
            } else if (json.errorCode === 129) {
              isFetching = false
              this.refs.loadingModal.hide()
              this.refs.errorEmailModal.show()
            } else {
              isFetching = false
              this.refs.loadingModal.hide()
              this.refs.errorModal.show()
              throw new SubmissionError({ password: '', _error: 'Что-то пошло не так, попробуйте снова' })
            }
          })
        }
    }

    const loginFb = () => {
      if (!programInitial || !packageTypeInitial || programInitial + '' === '4') {
        signupWith(email, program, packageType, promo, share)
      } else {
        signupWith(email, programInitial, packageTypeInitial, promoInitial, shareInitial)
      }
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
            <form onSubmit={handleSubmit(loginFb)} className="entry__box">

              <div className="entry-form">
                <hr/>
                <h2 className="h2">Вход через {socialName}</h2>

                <div className="grid grid--middle">
                  <div className="1/2--desk grid__cell">
                    <h4>Выполняется вход</h4>
                  </div>
                </div>

              </div>

              <Modal ref='emailModal' contentStyle={contentStyle}>
                <h2>Введите ваш email</h2>
                <br/>
                <Field name='emailValue' id='emailValue' placeholder='Email' component={InputProfile} />
                {program === '4' &&
                  <div>
                    <Field name='emailFriendValue' id='emailFriendValue' placeholder='Email друга' component={InputProfile} />
                    <Field name='phoneFriendValue' id='phoneFriendValue' type='tel' placeholder='Телефон друга' component={InputProfilePhone} />
                    <Field name='nameFriendValue' id='nameFriendValue' placeholder='Имя друга' component={InputProfile} />
                  </div>
                }
                <Field name='accept' title='Принять условия ' id='accept' component={CheckboxOfert} />
                <button type="submit" className="btn btn--action">
                  Продолжить
                </button>
              </Modal>

              <Modal ref='accModal' contentStyle={contentStyle} backdrop={false}>
                <h2>Выберите программу</h2>
                <br/>
                {!programInitial &&
                  <Field name="programValue" id="programValue" options={[
                    { name: '#Я ГЕРОЙ', value: '1'},
                    { name: '#МАМА МОЖЕТ', value: '2' },
                    { name: '#ЭКСТРЕМАЛЬНАЯ СУШКА', value: '3' },
                    { name: '#Я ЗАВТРА', value: '4' }
                  ]} component={SelectProgram} />
                }
                {program !== '4' &&
                  <Field name="packageTypeValue" id="packageTypeValue" options={[
                    { name: '1 человек', value: '1'},
                    { name: '2 человека', value: '2' },
                    { name: '3 человека', value: '3' }
                  ]} component={SelectProgram} />
                }
                <Field name='emailValue' id='emailValue' placeholder='Email' component={InputProfile} />
                {program === '4' &&
                  <div>
                    <Field name='emailFriendValue' id='emailFriendValue' placeholder='Email друга' component={InputProfile} />
                    <Field name='phoneFriendValue' id='phoneFriendValue' type='tel' placeholder='Телефон друга' component={InputProfilePhone} />
                    <Field name='nameFriendValue' id='nameFriendValue' placeholder='Имя друга' component={InputProfile} />
                  </div>
                }
                <Field name='promoValue' id='promoValue' placeholder='Промокод, если есть' component={InputProfile} />
                <Field name='accept' title='Принять условия ' id='accept' component={CheckboxOfert} />
                <button type="submit" className="btn btn--action">
                  Продолжить
                </button>
              </Modal>
              <Modal ref='loadingModal' contentStyle={contentStyle} backdrop={false}>
                <h2>Подождите...</h2>
              </Modal>
              <Modal ref='errorModal' contentStyle={contentStyle}>
                <h2>Что-то пошло не так, попробуйте снова</h2>
                <br/>
                <button className="btn btn--action" onClick={() => this.refs.errorModal.hide()}>
                  Продолжить
                </button>
              </Modal>
              <Modal ref='errorEmailModal' contentStyle={contentStyle}>
                <h2>Введенный вами email уже существует</h2>
                <br/>
                <button className="btn btn--action" onClick={() => this.refs.errorEmailModal.hide()}>
                  Продолжить
                </button>
              </Modal>
            </form>
          </div>

        </div>

      </div>
    )
  }
}

const validate = data => {
  const errors = {}

  if (data.emailValue)
    data.emailValue = data.emailValue.replace(/ /g,'')
  if (data.emailFriendValue)
    data.emailFriendValue = data.emailFriendValue.replace(/ /g,'')

  switch (true) {
    case !data.emailValue:
      errors.emailValue = 'Email должен быть заполнен'
      break
    case !/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i.test(data.emailValue):
      errors.emailValue = 'Email заполнен неправильно, проверьте его еще раз'
      break
    default:
      break
  }

  if (data.program === '4') {
    switch (true) {
      case !data.emailFriendValue:
        errors.emailFriendValue = 'Email должен быть заполнен'
        break
      case !/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i.test(data.emailFriendValue):
        errors.emailFriendValue = 'Email заполнен неправильно, проверьте его еще раз'
        break
      default:
        break
    }

    if (!data.phoneFriendValue)
      errors.phoneFriendValue = 'Телефон друга должен быть заполнен'

    if (!data.nameFriendValue)
      errors.nameFriendValue = 'Имя друга должно быть заполнено'

    console.log(data.accept)

    if (!data.accept)
      errors.accept = 'Вы должны принять условия оферты'
  }

  return errors
}

const asyncValidate = values => {
  return fetch(`${api}/user/user-check`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({ email: values.emailValue })
  })
  .then(response => response.json())
  .then(json => {
    const emailExists = json.data
    return fetch(`${api}/day/package-get`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({ promoName: values.promoValue })
    })
    .then(response => response.json())
    .then(json => {
      let error = {}
      if (json.errorCode !== 1)
        error.promoValue = 'Промокод недействителен'
      if (emailExists)
        error.emailValue = 'Такой email уже существует'

      if (Object.keys(error).length > 0)
        throw error
    })
  })
}

LoginFB = reduxForm({
  form: 'loginSocial',
  validate,
  asyncValidate,
  asyncBlurFields: [ 'emailValue', 'promoValue' ]
})(LoginFB)

const selector = formValueSelector('loginSocial')
const mapStateToProps = state => {
  let { program, packageType, promo } = state.profile

  if (!program) {
    program = selector(state, 'programValue')
  }

  if (!packageType) {
    packageType = selector(state, 'packageTypeValue')
  }

  if (!programInitial && !program) {
    program = 1
  }

  if (!packageTypeInitial && !packageType) {
    packageType = 1
  }

  const email = selector(state, 'emailValue')
  promo = promoInitial ? promoInitial : selector(state, 'promoValue')
  const emailFriend = selector(state, 'emailFriendValue')
  const phoneFriend = selector(state, 'phoneFriendValue')
  const nameFriend  = selector(state, 'nameFriendValue')

  return {
    program: programInitial ? programInitial : program,
    packageType: packageTypeInitial ? packageTypeInitial : packageType,
    promo,
    email,
    emailFriend,
    phoneFriend,
    nameFriend
  }
}

const mapDispatchToProps = dispatch => ({
  signup: bindActionCreators(actions.signup, dispatch),
  setToken: bindActionCreators(actions.setToken, dispatch)
})

LoginFB = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginFB)

export default LoginFB
