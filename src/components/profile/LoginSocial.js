import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import { browserHistory } from 'react-router'
import { SubmissionError } from 'redux-form'
import cookie from 'react-cookie'

class LoginSocial extends Component {
  componentWillMount() {
    console.log(this.props)
    const queryHash = this.props.location.hash
    const query = this.props.location.query.type.split(',')
    const token = queryHash.match(/#access_token=(.*)&exp.*/)[1]
    const userId = queryHash.match(/.*user_id=(.*)/)[1]
    const packageType = query[0]
    const program = query[1]
    const amount = query[2]
    const email = query[3]

    const { signup, setToken } = this.props
    signup(program, amount, packageType)

    const payload = { email, program, package: packageType }
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }

    return fetch('http://sport.muhanov.net/api/user/user-create', {
        headers,
        method: 'POST',
        body: JSON.stringify(payload)
      })
      .then(response => response.json())
      .then(json => {
        console.log(json)
        if (json.data && json.data.authToken) {
          cookie.save('token', json.data.authToken, { path: '/' })
          setToken(json.data.authToken)

          const socialType = this.props.params.type
          let socialNetType
          switch (socialType) {
            case 'vk':
              socialNetType = '1'
              break
            case 'ok':
              socialNetType = '2'
              break
            case 'fb':
              socialNetType = '3'
              break
            default:
              break
          }

          const payload = {
            authToken: json.data.authToken,
            data: {
              socialNetType,
              userId
            }
          }

          return fetch('http://sport.muhanov.net/api/user/socialNetUser-create', {
              headers,
              method: 'POST',
              body: JSON.stringify(payload)
            })
            .then(response => response.json())
            .then(json => {
              console.log(json)
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

    // const payload = { userId, token }
    // return fetch('http://sport.muhanov.net/api/user/authenticate-social', {
    //     headers: {
    //       'Accept': 'application/json',
    //       'Content-Type': 'application/json'
    //     },
    //     method: 'POST',
    //     body: JSON.stringify(payload)
    //   })
    //   .then(response => response.json())
    //   .then(json => {
    //     console.log(json)
    //     if (json.data && json.data.authToken) {
    //       cookie.save('token', json.data.authToken, { path: '/' })
    //       setToken(json.data.authToken)
    //       browserHistory.push('/signup/pay')
    //     } else {
    //       throw new SubmissionError({ password: '', _error: 'Что-то пошло не так, попробуйте снова' })
    //     }
    //   })
  }

  render() {
    let socialName
    const socialType = this.props.params.type

    switch (socialType) {
      case 'vk':
        socialName = 'Vk'
        break
      case 'fb':
        socialName = 'Facebook'
        break
      case 'ok':
        socialName = 'Одноклассники'
        break
      default:
        socialName = 'Соцсеть'
        break
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
            </div>
          </div>

        </div>

      </div>
    )
  }
}

const mapStateToProps = state => ({
  program: state.program,
  packageType: state.packageType,
  amount: state.amount
})

const mapDispatchToProps = dispatch => ({
  signup: bindActionCreators(actions.signup, dispatch),
  setToken: bindActionCreators(actions.setToken, dispatch)
})

LoginSocial = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginSocial)

export default LoginSocial
