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
let code
let socialNetType
let socialName
let shareInitial

class SignupSocial extends Component {
  componentDidMount() {
    const { setToken } = this.props
    code = this.props.location.query.code
    const socialTypeString = this.props.params.type
    socialNetType = 1
    socialName = 'Vk'

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
  }

  render() {

    const { packageType, program, promo, setToken, signup, email, emailFriend, share } = this.props

    const signupWith = (email, program, packageType, promo, emailFriend) => {
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
                  { name: '#ЭКСТРИМАЛЬНАЯ СУШКА', value: 3 },
                  { name: '#Я ЗАВТРА', value: 4 }
                ]} component={SelectProgram} />
                <Field name="packageTypeValue" id="packageTypeValue" options={[
                  { name: '1 человек', value: 1},
                  { name: '2 человека', value: 2 },
                  { name: '3 человека', value: 3 },
                ]} component={SelectProgram} />
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

SignupSocial = reduxForm({
  form: 'loginSocial'
})(SignupSocial)

const selector = formValueSelector('loginSocial')
const mapStateToProps = state => {
  let { program, packageType, promo, share } = state.profile

  if (!program || !packageType) {
    program = selector(state, 'programValue')
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

SignupSocial = connect(
  mapStateToProps,
  mapDispatchToProps
)(SignupSocial)

export default SignupSocial
