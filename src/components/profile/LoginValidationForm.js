import React from 'react'
import { Grid } from 'react-bootstrap';
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router'

import CustomInput from '../componentKit/CustomInput';

const LoginValidationForm = props => {
  const { error, handleSubmit, pristine, reset, submitting } = props;
  return (
    <form onSubmit={handleSubmit(props.onSubmit)}>
      <br/>
      <Grid>
        <Field name='phone' title='Ваш email' component={CustomInput} />
        <Field name='password' title='Ваш пароль' component={CustomInput} type='password' />
        {error && <strong>{error}</strong>}

        <br/>
        <button type='submit'>
          ВОЙТИ
        </button>

        <br/>
        <Link to="/profile/create">Зарегистрироваться</Link>

      </Grid>
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
