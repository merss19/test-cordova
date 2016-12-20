import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router'

import CustomInput from '../componentKit/CustomInput'

const PasswordForgetValidationForm = props => {
  const { error, handleSubmit, onSubmit } = props
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="1/2--desk grid__cell">
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
  )
}

const validate = data => {
  const errors = {}

  if (data.email)
    data.email = data.email.replace(/ /g,'')

  switch (true) {
    case !data.email:
      errors.email = 'Email должен быть заполнен'
      break
    case !/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i.test(data.email):
      errors.email = 'Email заполнен неправильно, проверьте его еще раз'
      break
    default:
      break
  }

  return errors
}

export default reduxForm({
  form: 'signupValidation',
  validate
})(PasswordForgetValidationForm)
