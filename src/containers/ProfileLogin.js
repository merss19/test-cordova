import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { createProfile } from '../actions'
import LoginValidationForm from '../components/profile/LoginValidationForm';
import { browserHistory } from 'react-router'
import { SubmissionError } from 'redux-form'
import $ from 'jquery';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

let ProfileLogin = ({ profile, showError }) => {
  return (
    <div>
      <LoginValidationForm onSubmit={ data => {
        console.log(data);
        $.ajax({
          url: 'http://sport.muhanov.net/api/user/authenticate',
          type: 'POST',
          dataType: 'json',
          data: data,
          success: res => {
            console.log('<=========|===0')
            console.log(res)
            if (res.data && res.data.authToken) {
              browserHistory.push('/task')
            } else {
              showError('Неправильный логин или пароль, попробуйте снова.')
            }
          }
        })
      }}/>
      <div>{profile.text}</div>
    </div>
  )
}

function mapStateToProps(state) {
  return { profile: state.profile }
}

const mapDispatchToProps = dispatch => ({
    showError: bindActionCreators(createProfile, dispatch)
})

ProfileLogin = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileLogin)

export default ProfileLogin
