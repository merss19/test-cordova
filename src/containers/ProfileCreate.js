import React from 'react'
import { connect } from 'react-redux'
import { createProfile } from '../actions'
import { SubmissionError } from 'redux-form'
// import $ from 'jquery';
import SubmitValidationForm from '../components/profile/SubmitValidationForm';

let ProfileCreate = dispatch => {
  return (
    <SubmitValidationForm onSubmit={data => {
      console.log(data);
      return fetch('http://sport.muhanov.net/api/user/user-create', {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: 'POST',
          body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(user => {
          if (!user.data || !user.data.authToken) {
            console.log('err')
            throw new SubmissionError({ _error: 'Что-то пошло не так, попробуйте снова.' })
          } else {
            dispatch(createProfile(user.data.authToken))
          }
        })
    }}/>
  )
}

ProfileCreate = connect()(ProfileCreate)

export default ProfileCreate
