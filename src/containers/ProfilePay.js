import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../actions'
import LoginValidationForm from '../components/profile/LoginValidationForm'
import { SubmissionError } from 'redux-form'
import cookie from 'react-cookie'

class ProfilePay extends Component {
  componentWillMount() {
    const frameScript = document.createElement("script")
    frameScript.type  = "text/javascript"

    const data = JSON.stringify({
        parent_id: "iframe_parent",
        api_key: "57d156d0-dacf-464d-bcd3-c7f01b0c1a35",
        tx_id: "125",
        description: "Тестовый платеж",
        amount: 1000,
        signature: "",
        success_redirect: "http://localhost:3000/signup/pay/success",
        fail_redirect: "http://localhost:3000/signup/pay/error",
        rebill: {},
        extra: {},
        version: "2.0.0"
    })

    frameScript.text  = 'PaymoFrame.set(' + data + ')'

    document.body.appendChild(frameScript)
  }

  render() {
    console.log('11========|')
    console.log(this.props)
    const { program, email, password } = this.props
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
        <br/>
        <div className="entry entry--sign-up">
          <div className="entry__inner mb60">
            <div className="entry-info">
              <div className="entry-info__inner">
                <div className="entry-info__mob-title">
                  <p>Информация о пакете</p>
                  <hr/>
                </div>
                <div className="entry-info__title">#Я ГЕРОЙ</div>
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
                <div id="iframe_parent"/>
              </div>
            </div>
          </div>
        </div>
      </div>
  )}
}

const mapStateToProps = state => ({
  program: state.profile,
  email: state.profile,
  password: state.profile,
 })

ProfilePay = connect(
  mapStateToProps
)(ProfilePay)

export default ProfilePay
