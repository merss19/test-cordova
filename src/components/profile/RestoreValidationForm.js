import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router'

import CustomInput from '../componentKit/CustomInput'

const RestoreValidationForm = props => {
  const { error, handleSubmit, onSubmit } = props
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="layout layout--login">

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

            <div className="entry-form">
              <div className="entry-form__header">
                <Link to="/signup">Регистрация</Link>
              </div>

              <hr/>

              {error && <strong>{error}</strong>}

              <h2 className="h2">Восстановление пароля</h2>

              <div className="grid grid--middle">
                <div className="1/2--desk grid__cell">
                  <Field name='password' id='login[2]' title='Новый пароль' type='password' component={CustomInput} />
                  <Field name='passwordAgain' id='login[3]' title='Новый пароль повторно' type='password' component={CustomInput} />
                  <button type='submit' className="btn btn--primary">
                    Восстановить
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

    </form>
  )
}

const validate = data => {
  const errors = {}

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
    case /["]/g.test(data.password):
      errors.password = 'Поле пароля не должно содержать знак "'
      break
    default:
      break
  }

  if (data.password !== data.passwordAgain)
    errors.passwordAgain = 'Пароли должны совпадать'

  return errors
}

export default reduxForm({
  form: 'loginValidation',
  validate
})(RestoreValidationForm)
