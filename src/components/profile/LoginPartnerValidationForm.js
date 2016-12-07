import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router'

import CustomInput from '../componentKit/CustomInput'

const LoginPartnerValidationForm = props => {
  const { error, handleSubmit } = props
  return (
    <div className="layout layout--login">

      <div className="header">
        <div className="grid header__inner">
          <h1 className="grid__cell header__logo">
            Ясегодня
            <img src="/assets/img/ys_logo.svg" alt="Ясегодня"/>
          </h1>
        </div>
      </div>

      <div className="entry entry--sign-in">

        <div className="entry__inner">
          <div className="entry__box">

            <form onSubmit={handleSubmit(props.onSubmit)} className="entry-form">
              <div className="entry-form__header">
                <Link to="/signup">Регистрация</Link>
              </div>

              <hr/>

              {error && <strong>{error}</strong>}

              <h2 className="h2">Вход в кабинет </h2>

              <div className="grid grid--middle">
                <div className="1/2--desk grid__cell">
                  <Field name='email' id='login[1]' title='Ваш e-mail' component={CustomInput} />
                  <Field name='password' id='login[2]' title='Ваш пароль' type='password' component={CustomInput} />
                  <button type='submit' className="btn btn--primary">
                    Войти
                  </button>
                  <Link to="/restore">Забыли пароль?</Link>
                </div>
              </div>

            </form>
          </div>
        </div>

      </div>

    </div>
  )
}

const validate = data => {
  const errors = {}

  if (!data.email)
    errors.email = 'Email должен быть заполнен'

  if (!data.password)
    errors.password = 'Поле пароля должно быть заполнено'

  return errors
}

export default reduxForm({
  form: 'loginValidation',
  validate
})(LoginPartnerValidationForm)
