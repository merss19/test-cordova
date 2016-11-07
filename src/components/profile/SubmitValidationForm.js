import React from 'react'
import { Grid } from 'react-bootstrap';
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router'

import CustomInput from '../componentKit/CustomInput';

const SubmitValidationForm = props => {
  const { error, handleSubmit, pristine, reset, submitting } = props;
  return (
    <form onSubmit={handleSubmit(props.onSubmit)}>
      <br/>
      <Grid>
        <Field name='firstName' title='Имя' component={CustomInput} />
        <Field name='lastName' title='Фамилия' component={CustomInput} />
        <Field name='gender' title='Пол' component={CustomInput} />
        <Field name='country' title='Страна' component={CustomInput} />
        <Field name='city' title='Город' component={CustomInput} />
        <Field name='phone' title='Номер телефона' component={CustomInput} />
        <Field name='email' title='Email' component={CustomInput} />
        <Field name='password' title='Пароль' component={CustomInput} type='password' />
        <Field name='birthday' title='День Рождения' component={CustomInput} />
        <Field name='height' title='Рост' component={CustomInput} />
        <Field name='weight' title='Вес' component={CustomInput} />
        <Field name='squatsCount' title='Количество приседаний за минуту' component={CustomInput} />
        {error && <strong>{error}</strong>}

        <br/>
        <button type='submit'>
          Сохранить
        </button>

        <Link to="/task">Кабинет</Link>

      </Grid>
    </form>
  );
}

const validate = data => {
  const errors = {};

  if (!data.firstName) {
    errors.firstName = 'Имя должно быть заполнено';
  }

  if (!data.lastName) {
    errors.lastName = 'Фамилия должна быть заполнена';
  }

  if (!data.gender) {
    errors.gender = 'Пол должен быть заполнен';
  }

  if (!data.country) {
    errors.country = 'Поле страны должно быть заполнено';
  }

  if (!data.city) {
    errors.city = 'Город должнен быть заполнен';
  }

  if (!data.phone) {
    errors.phone = 'Поле телефона должно быть заполнено';
  }

  if (!data.email) {
    errors.email = 'Email должен быть заполнен';
  }

  if (!data.password) {
    errors.password = 'Поле пароля должно быть заполнено';
  }

  if (!data.birthday) {
    errors.birthday = 'День Рождения должен быть заполнен';
  }

  if (!data.height) {
    errors.height = 'Рост должен быть заполнен';
  }

  if (!data.weight) {
    errors.weight = 'Вес должен быть заполнен';
  }

  if (!data.squatsCount) {
    errors.squatsCount = 'Количество приседаний должно быть заполнено';
  }

  return errors;
}

export default reduxForm({
  form: 'submitValidation',
  validate
})(SubmitValidationForm)
