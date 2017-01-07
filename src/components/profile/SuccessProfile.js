import React, { Component } from 'react'
import LoadingView from '../componentKit/LoadingView'
import cookie from 'react-cookie'
import * as actions from '../../actions'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import moment from 'moment'

class SuccessProfile extends Component {
  componentWillMount() {
    const fbScript = document.createElement("script")
    fbScript.text = "fbq('track', 'PageView'); fbq('track', 'Purchase')"
    document.body.appendChild(fbScript)
    const { dispatch, selectedPayment } = this.props
    dispatch(actions.fetchPaymentIfNeeded(selectedPayment))
  }

  render() {
    const { payment, isFetching } = this.props
    const isEmpty = !payment || !payment.data
    let isLate = false
    if (!isEmpty) {
      var eventdate = moment("2017-01-09")
      var todaysdate = moment(payment.data.date)
      const days = eventdate.diff(todaysdate, 'days')
      isLate = days < 2
    }

    return (
      <div className='entry__inner'>
        {isEmpty
          ? (isFetching ? <LoadingView title="Загружается..."/> : <LoadingView title="Ничего не найдено"/>)
          : <div>
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
                      {isLate
                        ? <div>
                          <h2>А сейчас самое время подготовиться к старту!</h2>
                          <br/>
                          <h4>ВАЖНО!! Бегом заполнять анкету в Личном кабинете, загружать фотографию до и читать правила проекта в разделе ЧАВО. Внимательно ознакомься с этой информацией.</h4>
                          <br/>
                          <p>ВАЖНО!! Личный кабинет станет доступен сегодня! Мы пришлем письмо с доступностью анкеты, и её надо будет заполнить в течение 24 часов</p>
                          <br/>
                          <p style={{textAlign: 'left'}}>Остались вопросы? Ждем их по телефону: 8 800 707 02 53 и на почту: you@todayme.ru, или пиши в чат! Времени осталось совсем мало!</p>
                        </div>
                        : <div>
                          <h2>Подтверждение об оплате скоро придет на ваш email.</h2>
                          <br/>
                          <h4>Пока до старта еще есть время – посмотри, что тебя ждет! Загляни на сайт www.todayme.ru, познакомься с нашей командой и партнерами, полюбуйся на призы.</h4>
                          <br/>
                          <p>ВАЖНО!! Сам личный кабинет с анкетой станет доступен за 3 дня до старта программы, мы сообщим об этом дополнительно, отдельным письмом.</p>
                          <br/>
                          <p style={{textAlign: 'left'}}>Остались вопросы? Ждем их по телефону: 8 800 707 02 53 и на почту: you@todayme.ru.</p>
                        </div>
                      }

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
          }
        </div>
      )
  }
}

const mapStateToProps = state => {
  const { selectedPayment, recivedPayment } = state

  const {
    isFetching,
    payment
  } = recivedPayment[selectedPayment] || {
    isFetching: true,
    payment: {}
  }

  return {
    selectedPayment,
    isFetching,
    payment
  }
}

SuccessProfile = connect(
  mapStateToProps,
)(SuccessProfile)

export default SuccessProfile
