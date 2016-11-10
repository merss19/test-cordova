import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../actions'
import LoginValidationForm from '../components/profile/LoginValidationForm'
import { browserHistory } from 'react-router'
import { SubmissionError } from 'redux-form'

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

let ProfileLogin = ({ profile, showError, setToken }) => {
  return (
    <div>
      <LoginValidationForm onSubmit={ data => {
        fetch('http://sport.muhanov.net/api/user/authenticate', {
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
              setToken(json.data.authToken)
              browserHistory.push('/task')
            } else {
              showError('Неправильный логин или пароль, попробуйте снова.')
              throw new SubmissionError({ password: '', _error: 'Login failed!' })
            }
          })
      }}/>
      <div>{profile.text}</div>
    </div>
  )
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
