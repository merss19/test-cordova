import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import * as actions from '../../actions'
import { browserHistory } from 'react-router'
import { SubmissionError } from 'redux-form'
import Modal from 'boron/DropModal'
import cookie from 'react-cookie'
import { api, host } from '../../config.js'

import CustomInput from '../componentKit/CustomInput'
import SelectProgram from '../componentKit/SelectProgram'

let contentStyle = {
  borderRadius: '18px',
  padding: '30px'
}

let packageTypeInitial
let programInitial
let promoInitial
let code
let socialNetType
let socialName
let shareInitial

class LoginSocial extends Component {
  componentWillMount() {
    if (window.mobilecheck()) {
      contentStyle.width = '300px'
    }
    
    const { setToken } = this.props
    code = this.props.location.query.code
    const socialTypeString = this.props.params.type
    socialNetType = 1
    socialName = 'Vk'

    const payload = { socialNetType, code }

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
        console.log(json)
        if (this.props.location.query && this.props.location.query.type) {
          const query = this.props.location.query.type.split(',')
          packageTypeInitial = query[0]
          programInitial = query[1]
          promoInitial = query[2]
          shareInitial = query[3]
        }

        if (packageTypeInitial && packageTypeInitial) {
          this.refs.emailModal.show()
        } else {
          this.refs.accModal.show()
        }
        // if (json.errorCode === 1 && json.data && json.data.authToken) {
        //   cookie.save('token', json.data.authToken, { path: '/' })
        //   setToken(json.data.authToken)
        //   browserHistory.push('/signup/pay')
        // } else {
        //   if (this.props.location.query && this.props.location.query.type) {
        //     window.location = `https://oauth.vk.com/authorize?client_id=5750682&scope=offline&redirect_uri=${host}/social/vk/second?type=${this.props.location.query.type}&display=page&response_type=code`
        //   } else {
        //     window.location = `https://oauth.vk.com/authorize?client_id=5750682&scope=offline&redirect_uri=${host}/social/vk/second&display=page&response_type=code`
        //   }
        // }
      })
  }

  render() {

    const { packageType, program, promo, setToken, signup, email, emailFriend, share } = this.props

    const signupWith = (email, program, packageType, promo, emailFriend) => {
      signup(program, undefined, packageType, promo, emailFriend, share)
      const payload = {
        email: email ? email.replace(/ /g,'') : email,
        emailFriend: emailFriend ? emailFriend.replace(/ /g,'') : emailFriend,
        program,
        package: packageType
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
                code
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
      signupWith(email, program, packageType, promo, emailFriend)
    }

    const loginVkInitial = () => {
      signupWith(email, programInitial, packageTypeInitial, promoInitial, emailFriend)
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
                  { name: '#ЭКСТРЕМАЛЬНАЯ СУШКА', value: 3 },
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

LoginSocial = reduxForm({
  form: 'loginSocial'
})(LoginSocial)

const selector = formValueSelector('loginSocial')
const mapStateToProps = state => {
  let { program, packageType, promo, share } = state.profile

  if (!program) {
    program = selector(state, 'programValue')
  }

  if (!packageType) {
    packageType = selector(state, 'packageTypeValue')
  }

  if (!programInitial && !packageTypeInitial) {
    program = 1
  }

  if (!programInitial && !packageType) {
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
    emailFriend,
    share: share ? share : shareInitial
  }
}

const mapDispatchToProps = dispatch => ({
  signup: bindActionCreators(actions.signup, dispatch),
  setToken: bindActionCreators(actions.setToken, dispatch)
})

LoginSocial = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginSocial)

export default LoginSocial
