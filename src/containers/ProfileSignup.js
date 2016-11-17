import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../actions'
import LoginValidationForm from '../components/profile/LoginValidationForm'
import { browserHistory } from 'react-router'
import { SubmissionError } from 'redux-form'
import cookie from 'react-cookie';

let ProfileSignup = props => {
  const program = props.params.program
  let programInfo

  switch (program) {
    case 'mommy':
      programInfo = <div className="entry-info__title">#МАМА МОЖЕТ</div>
      break
    case 'extremeways':
      programInfo = <div className="entry-info__title">#ЭКСТРИМАЛЬНАЯ СУШКА</div>
      break
    case 'tommorowman':
      programInfo = <div className="entry-info__title">#Я ЗАВТРА</div>
      break
    default:
      programInfo = <div className="entry-info__title">#Я ГЕРОЙ</div>
  }

  return (
    <div className="layout layout--registration">

      <div className="header">
        <div className="grid header__inner">
          <h1 className="1/2--portable 1/1--desk grid__cell header__logo">
            Ясегодня
            <img src="assets/img/ys_logo.svg" alt="Ясегодня"/>
          </h1>
          <div className="1/2--portable grid__cell header__right-side">
            <a href="#" className="header__link js-popup-ya-geroy">#Я герой</a>
          </div>
        </div>
      </div>

      <div className="entry-bc__wrap entry-bc__wrap--step-1">
        <ul className="entry-bc">
          <li className="entry-bc__item entry-bc__item--active">
            <span className="entry-bc__num">1</span>
            <span className="entry-bc__title">Регистрация/Вход</span>
          </li>
          <li className="entry-bc__item">
            <span className="entry-bc__num">2</span>
            <span className="entry-bc__title">Способ оплаты</span>
          </li>
          <li className="entry-bc__item">
            <span className="entry-bc__num">3</span>
            <span className="entry-bc__title">Оплата</span>
          </li>
          <li className="entry-bc__item">
            <span className="entry-bc__num">4</span>
            <span className="entry-bc__title">Подтверждение</span>
          </li>
        </ul>
      </div>

      <div className="entry entry--sign-up">

        <div className="entry__inner">
          <div className="entry-info">
            <div className="entry-info__inner">
              <div className="entry-info__mob-title">
                <p>Информация о пакете</p>
                <hr/>
              </div>
              {programInfo}
              <p className="entry-info__sub-title">Оформление на участие в проекте</p>

              <ul className="packet-info">
                <li className="packet-info__item">
                  <span className="packet-info__name-title">Пакет</span>
                  <span className="packet-info__name">Бонус +</span>
                </li>
                <li className="packet-info__item">
                  <span className="packet-info__name-title">Цена</span>
                  <span className="packet-info__name">3 000 руб.</span>
                </li>
              </ul>

              <p>Учавствуешь в проекте и борешься за ценные призы</p>
            </div>
          </div>

          <div className="entry__box">

            <div className="entry-form">

              <h2 className="h2">Зарегистрируйтесь или Войдите</h2>

              <hr/>

              <div className="grid grid--middle">
                <div className="1/2--desk grid__cell entry-form__email">
                  <div className="input input--line">
                    <input id="login[1]" type="text" className="input__field"/>
                    <label className="input__label" htmlFor="login[1]">Ваш e-mail</label>
                  </div>
                  <div className="input input--line">
                    <input id="login[2]" type="password" className="input__field"/>
                    <label className="input__label" htmlFor="login[2]">Ваш пароль</label>
                  </div>
                  <div className="btn btn--action js-pay-pupup">Войти/Зарегистрироваться</div>
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

              <p className="entry-form__note">Выполнив этот шаг вы автоматически перейдете к следующему</p>

            </div>

          </div>
        </div>

      </div>

      <div id="pay-success">
        <div className="base-popup__msg">
          <h3 className="h1">Оплата прошла успешно!</h3>
          <hr/>
          <div className="base-popup__msg-content">
            <p className="base-parag">Вам придет подтверждение об оплате с кодом на ваш Email<br/> alex@gmail.com</p>
          </div>
          <div className="btn btn--primary">Отлично!</div>
        </div>
      </div>

    </div>
  )
}

export default ProfileSignup
