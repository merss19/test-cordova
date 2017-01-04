import React, { Component } from 'react'
import LoadingView from '../componentKit/LoadingView'
import cookie from 'react-cookie'
import { browserHistory } from 'react-router'

class SuccessProfile extends Component {
  componentWillMount() {
    const fbScript = document.createElement("script")
    fbScript.text = "fbq('track', 'PageView'); fbq('track', 'Purchase')"
    document.body.appendChild(fbScript)
  }

  render() {
    return (
      <div>
        <div className="header">
          <div className="grid header__inner">
            <h1 className="grid__cell header__logo">
              Ясегодня
              <img src="/assets/img/ys_logo.svg" alt="Ясегодня"/>
            </h1>
          </div>
        </div>
        <ul className="entry-bc entry-bc--step-1">
          <li className="entry-bc__item entry-bc__item--done">
            <span className="entry-bc__step">
              <span className="entry-bc__step-num">1</span>
              <svg className="svg-icon ico-done">
                <use xlinkHref="#ico-done"></use>
              </svg>
            </span>
            {cookie.load('packageType')
              ? <span className="entry-bc__title">План</span>
              : <span className="entry-bc__title">Регистрация/Вход</span>
            }
          </li>
          <li className="entry-bc__item entry-bc__item--done">
            <span className="entry-bc__step">
              <span className="entry-bc__step-num">2</span>
              <svg className="svg-icon ico-done">
                <use xlinkHref="#ico-done"></use>
              </svg>
            </span>
            {cookie.load('packageType')
              ? <span className="entry-bc__title">Регистрация/Вход</span>
              : <span className="entry-bc__title">План</span>
            }
          </li>
          <li className="entry-bc__item entry-bc__item--done">
            <span className="entry-bc__step">
              <span className="entry-bc__step-num">3</span>
              <svg className="svg-icon ico-done">
                <use xlinkHref="#ico-done"></use>
              </svg>
            </span>
            <span className="entry-bc__title">Оплата</span>
          </li>
          <li className="entry-bc__item entry-bc__item--done">
            <span className="entry-bc__step">
              <span className="entry-bc__step-num">4</span>
              <svg className="svg-icon ico-done">
                <use xlinkHref="#ico-done"></use>
              </svg>
            </span>
            <span className="entry-bc__title">Успех</span>
          </li>
        </ul>
        <br/>
        <br/>
        <br/>
        <div className="layout layout--login">
          <div className="entry entry--sign-in">
            <div className="entry__inner">
              <div className="entry__box">
                <h4>Пока до старта еще есть время – посмотри, что тебя ждет! Загляни на сайт www.todayme.ru, познакомься с нашей командой и партнерами, полюбуйся на призы.</h4>
                <span>ВАЖНО!! Сам личный кабинет с анкетой станет доступен за 3 дня до старта программы, мы сообщим об этом дополнительно, отдельным письмом.</span>
                <span>Остались вопросы? Ждем их по телефону: 8 800 707 02 53 и на почту:  rc@todayme.ru."</span>
                <div>
                  <br/>
                  <button className="btn btn--action" onClick={e => {
                    e.preventDefault()
                    cookie.remove('token', { path: '/' })
                    cookie.remove('txId', { path: '/' })
                    cookie.remove('role', { path: '/' })
                    cookie.remove('program', { path: '/' })
                    cookie.remove('packageType', { path: '/' })
                    cookie.remove('promoName', { path: '/' })
                    cookie.remove('share', { path: '/' })
                    cookie.remove('general', { path: '/' })
                    browserHistory.push('/')
                  }}>
                    Продолжить
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default SuccessProfile
