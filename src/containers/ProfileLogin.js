import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../actions'
import LoginValidationForm from '../components/profile/LoginValidationForm'
import { browserHistory } from 'react-router'
import { SubmissionError } from 'redux-form'
import cookie from 'react-cookie'
import { api } from '../config.js'


class ProfileLogin extends Component{
  componentWillMount() {
    const fbScript = document.createElement("script")
    fbScript.text = "fbq('track', 'PageView');"
    document.body.appendChild(fbScript)
  }

  render () {
    const { setToken } = this.props

    return (
      <LoginValidationForm onSubmit={ data => {
        return fetch(`${api}/user/authenticate`, {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(data)
          })
          .then(response => response.json())
          .then(json => {
            if (json.data && json.data.authToken) {
              cookie.save('token', json.data.authToken, { path: '/', maxAge: 60 * 60 * 24 * 365 * 10 })
              setToken(json.data.authToken)
              browserHistory.push('/signup/pay')
            } else {
              throw new SubmissionError({
                password: 'Неправильное имя или пароль!',
                _error: ''
              })
            }
          })
      }}/>
    )
  }
}

const mapStateToProps = state => ({ profile: state.profile })

const mapDispatchToProps = dispatch => ({
  showError: bindActionCreators(actions.createProfile, dispatch),
  setToken: bindActionCreators(actions.setToken, dispatch)
})

ProfileLogin = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileLogin)

export default ProfileLogin
