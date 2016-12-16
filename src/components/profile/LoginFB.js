import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import * as actions from '../../actions'
import { browserHistory } from 'react-router'
import { SubmissionError } from 'redux-form'
import Modal from 'boron/DropModal'
import cookie from 'react-cookie'
import { api } from '../../config.js'

import CustomInput from '../componentKit/CustomInput'
import SelectProgram from '../componentKit/SelectProgram'

const contentStyle = {
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

class LoginFB extends Component {
  componentWillMount() {
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

            if (packageTypeInitial && packageTypeInitial) {
              this.refs.emailModal.show()
            } else {
              this.refs.accModal.show()
            }
          }
        })
    })
  }

  render() {

    const { packageType, program, promo, setToken, signup, email, emailFriend, share } = this.props

    const signupWith = (email, program, packageType, promo, emailFriend, share) => {
      signup(program, undefined, packageType, promo, emailFriend, share)
      const payload = { email, emailFriend, program, package: packageType }
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
                if (json && json.data) {
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

    const loginVk = () => {
      signupWith(email, program, packageType, promo, shareInitial, share)
    }

    const loginVkInitial = () => {
      signupWith(email, programInitial, packageTypeInitial, promoInitial, shareInitial. share)
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

              <div className="entry-form">

                <hr/>

                <h2 className="h2">Вход через {socialName}</h2>

                <div className="grid grid--middle">
                  <div className="1/2--desk grid__cell">
                    <h4>Выполняется вход</h4>
                  </div>
                </div>

              </div>

              <Modal ref='emailModal' modalStyle={contentStyle}>
                <h2>Введите ваш email</h2>
                <br/>
                <Field name='emailValue' id='emailValue' title='Email' component={CustomInput} />
                {program === '4' &&
                  <Field name='emailFriendValue' id='emailFriendValue' title='Email друга' component={CustomInput} />
                }
                <button className="btn btn--action" onClick={loginVkInitial}>
                  Продолжить
                </button>
              </Modal>

              <Modal ref='accModal' modalStyle={contentStyle}>
                <h2>Выберите программу</h2>
                <br/>
                <Field name="programValue" id="programValue" options={[
                  { name: '#Я ГЕРОЙ', value: 1},
                  { name: '#МАМА МОЖЕТ', value: 2 },
                  { name: '#ЭКСТРИМАЛЬНАЯ СУШКА', value: 3 },
                  { name: '#Я ЗАВТРА', value: 4 }
                ]} component={SelectProgram} />
                {program !== '4' &&
                  <Field name="packageTypeValue" id="packageTypeValue" options={[
                    { name: '1 человек', value: 1},
                    { name: '2 человека', value: 2 },
                    { name: '3 человека', value: 3 }
                  ]} component={SelectProgram} />
                }
                <Field name='emailValue' id='emailValue' title='Email' component={CustomInput} />
                {program === '4' &&
                  <Field name='emailFriendValue' id='emailFriendValue' title='Email друга' component={CustomInput} />
                }
                <Field name='promoValue' id='promoValue' title='Промокод, если есть' component={CustomInput} />
                <button className="btn btn--action" onClick={loginVk}>
                  Продолжить
                </button>
              </Modal>
            </div>
          </div>

        </div>

      </div>
    )
  }
}

LoginFB = reduxForm({
  form: 'loginSocial'
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

  return {
    program: programInitial ? programInitial : program,
    packageType: packageTypeInitial ? packageTypeInitial : packageType,
    promo,
    email,
    emailFriend
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
