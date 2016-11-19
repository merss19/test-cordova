import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router'

import CustomInput from '../componentKit/CustomInput';

const LoginValidationForm = props => {
  const { error, handleSubmit, pristine, reset, submitting } = props;
  return (
    <form onSubmit={handleSubmit(props.onSubmit)}>
      <br/>
        <Field name='email' title='Ваш email' component={CustomInput} />
        <Field name='password' title='Ваш пароль' component={CustomInput} type='password' />
        {error && <strong>{error}</strong>}

        <br/>
        <button type='submit'>
          ВОЙТИ
        </button>

        <br/>
        <Link to="/profile/create">Зарегистрироваться</Link>

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
  form: 'loginValidation',
  validate
})(LoginValidationForm)
