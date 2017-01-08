import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import * as actions from '../actions'
import { api, host } from '../config.js'
import LoadingView from '../components/componentKit/LoadingView'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import cookie from 'react-cookie'
import Header from '../stories/Header'
import Modal from 'boron/FadeModal'
import { promoVisit } from '../actions/promo/promoWatch'
import InputProfile from '../components/componentKit/InputProfile'
import InputProfilePhone from '../components/componentKit/InputProfilePhone'
import SelectProgram from '../components/componentKit/SelectProgram'

let contentStyle = {
  borderRadius: '18px',
  padding: '30px'
}

class ProfilePay extends Component {
  componentWillMount() {
    if (window.mobilecheck()) {
      contentStyle.width = '300px'
    }

    const fbScript = document.createElement("script")
    fbScript.text = "fbq('track', 'PageView'); fbq('track', 'Lead')"
    document.body.appendChild(fbScript)

    const { dispatch, selectedPayment } = this.props
    dispatch(actions.fetchPaymentIfNeeded(selectedPayment))
  }

  componentDidMount() {
    let { dispatch, program, packageType, emailFriend, promo, share, receivePayment, phoneFriend, nameFriend } = this.props

    if (this.props.location.query && this.props.location.query.fail) {
      let payload = {
        authToken: cookie.load('token'),
        data: {
          program: program ? program : '1',
          package: packageType ? packageType : '1',
          isShare: share ? share : false
        }
      }

      if (!!promo) {
        payload.data.promoName = promo
      }

      if (!!promoVisit.getPromoSessionId()) {
        payload.data.promoSession = promoVisit.getPromoSessionId()
      }

      if (!!emailFriend) {
        payload.data.tomorrowManEmail = emailFriend
      }

      if (!!phoneFriend) {
        payload.data.tomorrowManPhone = phoneFriend
      }

      if (!!nameFriend) {
        payload.data.tomorrowManName = nameFriend
      }

      let data = new FormData()
      data.append("json", JSON.stringify(payload))

      return fetch(`${api}/payment/payment-create`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(payload)
      })
      .then(response => response.json())
      .then(json => {
        if (json.errorCode === 1 && json.data) {
          dispatch(receivePayment('reactjs', json))
          browserHistory.push('/signup/pay')
        }
      })
    }
  }

  componentDidUpdate() {
    const { change, emailFriend, phoneFriend, nameFriend } = this.props
    change('emailFriend', emailFriend)
    change('phoneFriend', phoneFriend)
    change('nameFriend', nameFriend)
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
    let { dispatch, program, packageType, amount, emailFriend, promo, share, receivePayment, phoneFriend, nameFriend } = this.props

    const isEmpty = payment === undefined || payment.data === undefined

    if (!isEmpty && payment.data && payment.data.txId) {
      amount = payment.data.amount
      if (!cookie.load('general'))
        program = payment.data.program + ''

      switch (payment.data.program + '') {
        case '2':
          programName = '#МАМА МОЖЕТ'
          break
        case '3':
          programName = '#ЭКСТРЕМАЛЬНАЯ СУШКА'
          break
        case '4':
          programName = '#Я ЗАВТРА'
          break
        default:
          programName = '#Я ГЕРОЙ'
          break
      }

      switch (payment.data.package + '') {
        case '1':
          packageName = payment.data.program + '' === '4'? 'Подарок другу' : '1  человек'
          break
        case '2':
          packageName = '2  человек'
          break
        case '3':
          packageName = '3  человек'
          break
        default:
          packageName = 'Не выбран'
      }
      if (amount > 0) {
        const frameScript = document.createElement("script")
        frameScript.type  = "text/javascript"
        const data = JSON.stringify({
          parent_id: "iframe_parent",
          api_key: "57d156d0-dacf-464d-bcd3-c7f01b0c1a35",
          tx_id: payment.data.txId,
          description: `Платеж по программе ${programName}`,
          amount: payment.data.amount * 100,
          signature: "",
          success_redirect: payment.data.program + '' === '4' ? `${host}/signup/pay/success/friend` : `${host}/signup/pay/success`,
          fail_redirect: `${host}/signup/pay?fail=true`,
          rebill: {},
          extra: {},
          version: "2.0.0"
        })

        frameScript.text = 'PaymoFrame.set(' + data + ');'
        document.body.appendChild(frameScript)
      }
    }

    const paymentCreate = () => {
      this.refs.accModal.hide()
      this.refs.loadingModal.show()

      let payload = {
        authToken: cookie.load('token'),
        data: {
          program: program ? program : '1',
          package: packageType ? packageType : '1',
          isShare: share ? share : false
        }
      }

      if (!!promo) {
        payload.data.promoName = promo
      }

      if (!!promoVisit.getPromoSessionId()) {
        payload.data.promoSession = promoVisit.getPromoSessionId()
      }

      if (!!emailFriend) {
        payload.data.tomorrowManEmail = emailFriend
      }

      if (!!phoneFriend) {
        payload.data.tomorrowManPhone = phoneFriend
      }

      if (!!nameFriend) {
        payload.data.tomorrowManName = nameFriend
      }

      let data = new FormData()
      data.append("json", JSON.stringify(payload))

      return fetch(`${api}/payment/payment-create`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(payload)
      })
      .then(response => response.json())
      .then(json => {
        if (json.errorCode === 1 && json.data) {
          dispatch(receivePayment('reactjs', json))
        }
        this.refs.loadingModal.hide()
        this.refs.successModal.show()
      })
    }

    return (
      <div className="layout layout--registration">
        {isEmpty
          ? (isFetching ? <LoadingView title="Загружается..."/> : <LoadingView title="Ничего не найдено"/>)
          : <div style={{ opacity: isFetching ? 0.5 : 1 }}>
              <Header burger={false} />
              <br/>
              <div id="payment-entry" className="entry entry--sign-up">
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
                          <span className="packet-info__name">{amount ? amount : '0' } руб</span>
                        </li>
                      </ul>

                      <p>Оплата занимает какое-то время. СМС придёт в течении нескольких минут.</p>
                      <br/>
                      <button className="btn btn--primary" onClick={() => {
                        this.refs.accModal.show()
                      }}>
                        { cookie.load('general') ? 'Изменить программу'
                          : program === '4' ? 'Изменить данные друга' : 'Изменить пакет' }
                      </button>
                    </div>
                  </div>

                  {amount === 0
                    ? <div className="entry__box">
                      <button id="pay-free" className="btn btn--action" onClick={() => {
                        if (payment.data.program + '' === '4') {
                          browserHistory.push('/signup/pay/success/friend')
                        } else {
                          browserHistory.push('/signup/pay/success')
                        }
                      }}>
                        Продолжить
                      </button>
                    </div>
                    : <div className="entry__box">
                        <div className="entry-form">
                          <div id="iframe_parent"/>
                        </div>
                    </div>
                  }

                  <Modal ref='accModal' contentStyle={contentStyle}>
                    <h2>{ program === '4' ? 'Введите новые данные о друге' : 'Выберите количество человек' }</h2>
                    <br/>
                    {cookie.load('general') &&
                      <Field name="program" id="programValue" options={[
                        { name: '#Я ГЕРОЙ', value: '1'},
                        { name: '#МАМА МОЖЕТ', value: '2' },
                        { name: '#ЭКСТРЕМАЛЬНАЯ СУШКА', value: '3' },
                        { name: '#Я ЗАВТРА', value: '4' }
                      ]} component={SelectProgram} />
                    }
                    {program !== '4' &&
                      <Field name="packageType" id="packageTypeValue" options={[
                        { name: '1 человек', value: '1'},
                        { name: '2 человека', value: '2' },
                        { name: '3 человека', value: '3' }
                      ]} component={SelectProgram} />
                    }
                    {program === '4' &&
                      <div>
                        <Field name='emailFriend' id='emailFriend' placeholder='Email друга' component={InputProfile} />
                        <Field name='phoneFriend' id='phoneFriend' type='tel' placeholder='Телефон друга' component={InputProfilePhone} />
                        <Field name='nameFriend' id='nameFriend' placeholder='Имя друга' component={InputProfile} />
                      </div>
                    }
                    <Field name='promo' id='promoValue' placeholder='Промокод, если есть' component={InputProfile} />
                    <button className="btn btn--action" onClick={() => {
                      return fetch(`${api}/day/package-get`, {
                        headers: {
                          'Accept': 'application/json',
                          'Content-Type': 'application/json'
                        },
                        method: 'POST',
                        body: JSON.stringify({ promoName: promo })
                      })
                      .then(response => response.json())
                      .then(json => {
                        if (json.errorCode === 1) {
                          paymentCreate()
                        } else {
                          this.refs.errorPromoModal.show()
                        }
                      })
                    }}>
                      Обновить
                    </button>
                  </Modal>
                  <Modal ref='loadingModal' contentStyle={contentStyle} backdrop={false}>
                    <h2>Подождите...</h2>
                  </Modal>
                  <Modal ref='successModal' contentStyle={contentStyle}>
                    <h2>Изменения сохранены</h2>
                    <br/>
                    <button className="btn btn--action" onClick={() => this.refs.successModal.hide()}>
                      Продолжить
                    </button>
                  </Modal>
                  <Modal ref='errorPromoModal' contentStyle={contentStyle}>
                    <h2>Промокод недействителен</h2>
                    <br/>
                    <button className="btn btn--action" onClick={() => this.refs.errorPromoModal.hide()}>
                      Продолжить
                    </button>
                  </Modal>
                </div>
              </div>
            </div>
        }
      </div>
  )}
}

ProfilePay = reduxForm({
  form: 'payCreateValidation'
})(ProfilePay)

let selector = formValueSelector('payCreateValidation')

const mapStateToProps = state => {
  const { selectedPayment, recivedPayment, userToken, profile } = state
  let { program, amount, packageType, promo, emailFriend, phoneFriend, nameFriend, share } = profile
  const initialPhoneFriend = phoneFriend
  const initialEmailFriend = emailFriend
  const initialNameFriend = nameFriend

  const {
    isFetching,
    lastUpdated,
    payment
  } = recivedPayment[selectedPayment] || {
    isFetching: true,
    payment: {}
  }

  if (selector(state, 'program'))
    program = selector(state, 'program')

  if (selector(state, 'packageType'))
    packageType = program === '4' ? 1 : selector(state, 'packageType')

  if ((!cookie.load('general') && payment && payment.data && payment.data.program + '' === '4')
    || (cookie.load('general') && program + '' === '4')) {
    const friend = payment && payment.data
      && payment.data.tomorrowManEmails && payment.data.tomorrowManEmails[0]
      ? payment.data.tomorrowManEmails[0] : {}

    emailFriend = selector(state, 'emailFriend') || friend.email
    phoneFriend = selector(state, 'phoneFriend') || friend.phone
    nameFriend  = selector(state, 'nameFriend') || friend.name
  }

  if (selector(state, 'promo'))
    promo = selector(state, 'promo')

  return({
    selectedPayment,
    isFetching,
    lastUpdated,
    payment,
    program,
    amount,
    packageType,
    emailFriend: emailFriend || initialEmailFriend,
    phoneFriend: phoneFriend || initialPhoneFriend,
    nameFriend: nameFriend || initialNameFriend,
    promo,
    share,
    token: userToken.token
  })
}

const mapDispatchToProps = dispatch => ({
  signup: bindActionCreators(actions.signup, dispatch),
  receivePayment: bindActionCreators(actions.receivePayment, dispatch)
})

ProfilePay = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfilePay)

export default ProfilePay
