import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import { host } from '../config.js'
import LoadingView from '../components/componentKit/LoadingView'
import Header from '../stories/Header'

class ProfilePay extends Component {
  componentWillMount() {
    const { dispatch, selectedPayment } = this.props
    dispatch(actions.fetchPaymentIfNeeded(selectedPayment))
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedPayment !== this.props.selectedPayment) {
      const { dispatch, selectedPayment } = nextProps
      dispatch(actions.fetchPaymentIfNeeded(selectedPayment))
    }
  }

  render() {
    const { payment, isFetching } = this.props
    let programName
    let packageName
    let { program, packageType, amount } = this.props

    const isEmpty = payment === undefined || payment.data === undefined

    if (!isEmpty && payment.data && payment.data.txId) {
      program = payment.data.program
      amount = payment.data.amount
      packageType = payment.data.package

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

      switch (packageType) {
        case 1:
          packageName = '1  человек'
          break
        case 2:
          packageName = '2  человек'
          break
        case 3:
          packageName = '3  человек'
          break
        default:
          packageName = 'Не определено'
      }

      const frameScript = document.createElement("script")
      frameScript.type  = "text/javascript"
      const data = JSON.stringify({
        parent_id: "iframe_parent",
        api_key: "57d156d0-dacf-464d-bcd3-c7f01b0c1a35",
        tx_id: payment.data.txId,
        description: `Платеж по программе ${programName}`,
        amount: payment.data.amount * 100,
        signature: "",
        success_redirect: `${host}/signup/pay/success`,
        fail_redirect: `${host}/signup/pay`,
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
          ? (isFetching ? <LoadingView title="Загружается..."/> : <LoadingView title="Ничего не найдено"/>)
          : <div style={{ opacity: isFetching ? 0.5 : 1 }}>
              <Header burger={false} />
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
                          <span className="packet-info__name">{packageName}</span>
                        </li>
                        <li className="packet-info__item">
                          <span className="packet-info__name-title">Цена</span>
                          <span className="packet-info__name">{amount ? amount : '0' }</span>
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
  const { program, amount, packageType, promo } = profile

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
    promo,
    token: userToken.token
  })
}

ProfilePay = connect(
  mapStateToProps
)(ProfilePay)

export default ProfilePay
