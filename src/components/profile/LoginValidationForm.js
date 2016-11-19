import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router'

import CustomInput from '../componentKit/CustomInput';

const LoginValidationForm = props => {
  const { error, handleSubmit, pristine, reset, submitting } = props
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
                <Link to="/profile/create">Регистрация</Link>
              </div>

              <hr/>

              {error && <strong>{error}</strong>}

              <h2 className="h2">Вход в Личный кабинет </h2>

              <div className="grid grid--middle">
                <div className="1/2--desk grid__cell entry-form__email">
                  <Field name='email' id='login[1]' title='Ваш e-mail' component={CustomInput} />
                  <Field name='password' id='login[2]' title='Ваш пароль' type='password' component={CustomInput} />
                  <button type='submit' className="btn btn--primary">
                    Войти
                  </button>
                  <a href="#">Забыли пароль?</a>
                </div>
                <div className="1/2--desk grid__cell entry-form__social">
                  <p className="entry-form__social-title">Войти через социальные сети</p>
                  <ul className="social-signin">
                    <li className="social-signin__item social-signin__item--vk">
                      <svg className="svg-icon ico-vk">
                        <use xlinkHref="#vk"></use>
                      </svg>
                    </li>
                    <li className="social-signin__item social-signin__item--odnoklassniki">
                      <svg className="svg-icon ico-odnoklassniki">
                        <use xlinkHref="#odnoklassniki"></use>
                      </svg>
                    </li>
                    <li className="social-signin__item social-signin__item--fb">
                      <svg className="svg-icon ico-fb">
                        <use xlinkHref="#fb"></use>
                      </svg>
                    </li>
                  </ul>
                </div>
              </div>

            </form>
          </div>
        </div>

      </div>

    </div>
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
