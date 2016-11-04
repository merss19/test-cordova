import React from 'react'
import { connect } from 'react-redux'
import { createProfile } from '../actions'
import { SubmissionError } from 'redux-form'
import $ from 'jquery';
import SubmitValidationForm from '../components/SubmitValidationForm';

let CreateProfile = (dispatch) => {
  return (
    <SubmitValidationForm onSubmit={(data) => {
      console.log(data);
      return data => new Promise(data => {
        $.ajax({
          url: 'http://sport.muhanov.net/api/user/user-create',
          type: 'POST',
          dataType: 'json',
          data: data,
          success: (user) => {
            console.log('<=========|===0')
            console.log(user)
            return user;
          }
        })
      })
      .then((user) => {
        console.log(user)
        if (!user.data || !user.data.authToken) {
          console.log('err')
          throw new SubmissionError({ _error: 'Что-то пошло не так, попробуйте снова.' })
        } else {
          dispatch(createProfile(user.data.authToken))
        }
      });
    }}/>
  )
}

CreateProfile = connect()(CreateProfile)

export default CreateProfile
