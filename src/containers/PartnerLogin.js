import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../actions'
import LoginPartnerValidationForm from '../components/profile/LoginPartnerValidationForm'
import { browserHistory } from 'react-router'
import { SubmissionError } from 'redux-form'
import cookie from 'react-cookie'

let PartnerLogin = setToken => {
  return (
    <LoginPartnerValidationForm onSubmit={ data => {
      return fetch('http://sport.muhanov.net/api/user/authenticate', {
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
            console.log('token')
            console.log(cookie.load('token'))
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
