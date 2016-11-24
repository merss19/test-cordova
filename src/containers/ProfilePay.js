import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../actions'
import LoginValidationForm from '../components/profile/LoginValidationForm'
import { SubmissionError } from 'redux-form'
import cookie from 'react-cookie'

class ProfilePay extends Component {
  componentWillMount() {
    const { dispatch, selectedPayment, payment, program, amount, packageType } = this.props
    dispatch(actions.fetchPaymentIfNeeded(selectedPayment))
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedPayment !== this.props.selectedPayment) {
      const { dispatch, selectedPayment } = nextProps
      dispatch(actions.fetchPaymentIfNeeded(selectedPayment))
    }
  }

  render() {
    const { program, selectedPayment, payment,
      token, isFetching, lastUpdated, amount, packageType } = this.props
    let programName

    console.log('<=======)==0')
    console.log(payment)
    console.log(program)
    console.log(amount)

    switch (program) {
      case 2:
        programName = '#МАМА МОЖЕТ'
        break
      case 3:
        programName = '#ЭКСТРИМАЛЬНАЯ СУШКА'
        break
      case 4:
        programName = '#Я ЗАВТРА'
        break
      default:
        programName = '#Я ГЕРОЙ'
        break
    }

    const isEmpty = payment === undefined || payment.data === undefined

    if (!isEmpty && payment.data.txId) {
      console.log('true')
      const frameScript = document.createElement("script")
      frameScript.type  = "text/javascript"
      const data = JSON.stringify({
        parent_id: "iframe_parent",
        api_key: "57d156d0-dacf-464d-bcd3-c7f01b0c1a35",
        tx_id: payment.data.txId,
        description: `Платеж по программе ${programName}`,
        amount: payment.data.amount * 100,
        signature: "",
        success_redirect: "http://localhost:3000/profile/create",
        fail_redirect: "http://localhost:3000/signup/pay/error",
        rebill: {},
        extra: {},
        version: "2.0.0"
      })

      frameScript.text = 'PaymoFrame.set(' + data + ')'

      document.body.appendChild(frameScript)
    }

    return (
      <div className="layout layout--registration">
        {isEmpty
          ? (isFetching ? <h2>Загружается...</h2> : <h2>Ничего не найдено</h2>)
          : <div style={{ opacity: isFetching ? 0.5 : 1 }}>
              <div className="header">
                <div className="grid header__inner">
                  <h1 className="1/2--portable 1/1--desk grid__cell header__logo">
                    Ясегодня
                    <img src="/assets/img/ys_logo.svg" alt="Ясегодня"/>
                  </h1>
                  <div className="1/2--portable grid__cell header__right-side">
                    <a href="#" className="header__link js-popup-ya-geroy">{programName}</a>
                  </div>
                </div>
              </div>
              <br/>
              <div className="entry entry--sign-up">
                <div className="entry__inner mb60">
                  <div className="entry-info">
                    <div className="entry-info__inner">
                      <div className="entry-info__mob-title">
                        <p>Информация о пакете</p>
                        <hr/>
                      </div>
                      <div className="entry-info__title">{programName}</div>
                      <p className="entry-info__sub-title">Оформление на участие в проекте</p>

                      <ul className="packet-info">
                        <li className="packet-info__item">
                          <span className="packet-info__name-title">Пакет</span>
                          <span className="packet-info__name">{packageType}</span>
                        </li>
                        <li className="packet-info__item">
                          <span className="packet-info__name-title">Цена</span>
                          <span className="packet-info__name">{payment.data.amount}</span>
                        </li>
                      </ul>

                      <p>Учавствуешь в проекте и борешься за ценные призы</p>
                    </div>
                  </div>

                  <div className="entry__box">
                    <div className="entry-form">
                      <div id="iframe_parent"/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        }
      </div>
  )}
}

const mapStateToProps = state => {
  const { selectedPayment, recivedPayment, userToken, profile } = state
  const { program, amount, packageType } = profile

  console.log(state)

  const {
    isFetching,
    lastUpdated,
    payment
  } = recivedPayment[selectedPayment] || {
    isFetching: true,
    taskDay: {}
  }

  return({
    selectedPayment,
    isFetching,
    lastUpdated,
    payment,
    program,
    amount,
    packageType,
    token: userToken.token
  })
}

ProfilePay = connect(
  mapStateToProps
)(ProfilePay)

export default ProfilePay
