import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../actions'
import LoginPartnerValidationForm from '../components/profile/LoginPartnerValidationForm'
import { browserHistory } from 'react-router'
import { SubmissionError } from 'redux-form'
import cookie from 'react-cookie'
import { api } from '../config.js'

let PartnerLogin = setToken => {
  return (
    <LoginPartnerValidationForm onSubmit={ data => {
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
          if (json.data && json.data.authToken && json.data.role === 1) {
            cookie.save('token', json.data.authToken, { path: '/' })
            setToken(json.data.authToken)
            browserHistory.push('/partner/show')
          } else {
            throw new SubmissionError({
              password: '',
              _error: 'Неправильное имя или пароль!'
            })
          }
        })
    }}/>
  )
}

const mapDispatchToProps = dispatch => ({
  setToken: bindActionCreators(actions.setToken, dispatch)
})

PartnerLogin = connect(
  mapDispatchToProps
)(PartnerLogin)

export default PartnerLogin
