import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router'

import CustomInput from '../componentKit/CustomInput';

const PasswordForgetValidationForm = props => {
  const { error, handleSubmit, pristine, reset, submitting, signup, onSubmit } = props
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="1/2--desk grid__cell entry-form__email">
      <div className="input input--line">
        <Field name='email' id='login[1]' title='Ваш e-mail' component={CustomInput} />
      </div>
      <br/>
      <br/>
      <br/>
      {error && <strong>{error}</strong>}
      <button type='submit' className="btn btn--action">
        Изменить пароль
      </button>
      <Link to="/profile">Войти</Link>
      <br/>
      <Link to="/signup">Регистрация</Link>
    </form>
  );
}

const validate = data => {
  const errors = {};

  switch (true) {
    case !data.email:
      errors.email = 'Email должен быть заполнен'
      break
    case !/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i.test(data.email):
      errors.email = 'Email заполнен неправильно, проверьте его еще раз'
      break
  }

  switch (true) {
    case !data.password:
      errors.password = 'Поле пароля должно быть заполнено'
      break
    case data.password.length < 6:
      errors.password = 'Поле пароля должно быть длиннее 6 символов'
      break
    case data.password.length > 20:
      errors.password = 'Поле пароля должно быть короче 20 символов'
      break
    case !/^[A-Za-z0-9!@#$%^&*()_]{6,20}$/.test(data.password):
      errors.password = 'Поле пароля может содержать только буквы английского алфавита, цифры и какой-нибудь из знаков !@#$%^&*()_'
      break
  }

  if (data.password !== data.passwordAgain)
    errors.passwordAgain = 'Пароли должны совпадать'

  return errors;
}

export default reduxForm({
  form: 'signupValidation',
  validate
})(PasswordForgetValidationForm)
