import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../actions'
import RestoreValidationForm from '../components/profile/RestoreValidationForm'
import { browserHistory } from 'react-router'
import { SubmissionError } from 'redux-form'
import cookie from 'react-cookie'

let ProfilePasswordRestore = props => {
  const { token } = props.location.query
  const { setToken } = props
  return (
    <RestoreValidationForm onSubmit={ data => {
      const payload = {
        token,
        passowrd: data.password
      }
      return fetch('http://sport.muhanov.net/api/user/user-approveRestorePassword', {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: 'POST',
          body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(json => {
          console.lof(json)
          if (json.data && json.data.authToken) {
            // cookie.save('token', json.data.authToken, { path: '/' })
            // console.log('token')
            // console.log(cookie.load('token'))
            // setToken(json.data.authToken)
            // browserHistory.push('/task')
          } else {
            throw new SubmissionError({
              password: '',
              _error: 'Что-то пошло не так, попробуйте снова'
            })
          }
        })
    }}/>
  )
}

const mapDispatchToProps = dispatch => ({
    showError: bindActionCreators(actions.createProfile, dispatch),
    setToken: bindActionCreators(actions.setToken, dispatch)
})

ProfilePasswordRestore = connect(
  mapDispatchToProps
)(ProfilePasswordRestore)

export default ProfilePasswordRestore
