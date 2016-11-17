import React from 'react'
import { Field, reduxForm } from 'redux-form'

import CustomInput from '../componentKit/CustomInput';

const SignupValidationForm = props => {
  const { error, handleSubmit, pristine, reset, submitting, signup, onSubmit } = props
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="1/2--desk grid__cell entry-form__email">
      <div className="input input--line">
        <Field name='email' id='login[1]' title='Ваш e-mail' component={CustomInput} />
        <Field name='password' id='login[2]' title='Ваш пароль' type='password' component={CustomInput} />
      </div>
      <button type='submit' className="btn btn--action">
        Войти/Зарегистрироваться
      </button>
      <a href="#">Забыли пароль?</a>
    </form>
  );
}

const validate = data => {
  const errors = {};

  if (!data.email)
    errors.email = 'Email должен быть заполнен';

  if (!data.password)
    errors.password = 'Поле пароля должно быть заполнено';

  return errors;
}

export default reduxForm({
  form: 'signupValidation',
  validate
})(SignupValidationForm)
