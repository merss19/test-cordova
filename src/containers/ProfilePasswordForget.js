import React, { Component } from 'react'
import { connect } from 'react-redux'
import { SubmissionError } from 'redux-form'
import PasswordForgetValidationForm from '../components/profile/PasswordForgetValidationForm'
import Modal from 'boron/FadeModal'
import { api, host } from '../config.js'

let contentStyle = {
  borderRadius: '18px',
  padding: '30px'
}

class ProfilePasswordForget extends Component {
  componentWillMount() {
    if (window.mobilecheck()) {
      contentStyle.width = '300px'
    }
  }
  
  render() {
    let { amount, packageType, program } = this.props

    let programName
    let packageName
    amount = !!amount ? amount : 0

    switch (program) {
      case 1:
        programName = '#Я ГЕРОЙ'
        break
      case 2:
        programName = '#МАМА МОЖЕТ'
        break
      case 3:
        programName = '#ЭКСТРЕМАЛЬНАЯ СУШКА'
        break
      case 4:
        programName = '#Я ЗАВТРА'
        break
      default:
        programName = 'ЯСЕГОДНЯ'
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
        packageName = 'Не выбран'
    }

    return (
      <div className="layout layout--registration">

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

        <ul className="entry-bc entry-bc--step-1">
          <li className="entry-bc__item entry-bc__item--done">
            <span className="entry-bc__step">
              <span className="entry-bc__step-num">1</span>
              <svg className="svg-icon ico-done">
                <use xlinkHref="#ico-done"></use>
              </svg>
            </span>
            <span className="entry-bc__title">План</span>
          </li>
          <li className="entry-bc__item entry-bc__item--active">
            <span className="entry-bc__step">
              <span className="entry-bc__step-num">2</span>
              <svg className="svg-icon ico-done">
                <use xlinkHref="#ico-done"></use>
              </svg>
            </span>
            <span className="entry-bc__title">Регистрация/Вход</span>
          </li>
          <li className="entry-bc__item">
            <span className="entry-bc__step">
              <span className="entry-bc__step-num">3</span>
              <svg className="svg-icon ico-done">
                <use xlinkHref="#ico-done"></use>
              </svg>
            </span>
            <span className="entry-bc__title">Оплата</span>
          </li>
          <li className="entry-bc__item">
            <span className="entry-bc__step">
              <span className="entry-bc__step-num">4</span>
              <svg className="svg-icon ico-done">
                <use xlinkHref="#ico-done"></use>
              </svg>
            </span>
            <span className="entry-bc__title">Успех</span>
          </li>
        </ul>

        <div className="entry entry--sign-up">

          <div className="entry__inner">
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
                    <span className="packet-info__name">{amount} руб.</span>
                  </li>
                </ul>

                <p>Учавствуешь в проекте и борешься за ценные призы</p>
              </div>
            </div>

            <div className="entry__box">

              <div className="entry-form">

                <h2 className="h2">Введите ваш email, если вы забыли пароль</h2>

                <hr/>

                <Modal ref='successModal' contentStyle={contentStyle}>
                  <h2>Письмо с инструкциями отправлено на указанный вами email</h2>
                </Modal>

                <Modal ref='failModal' contentStyle={contentStyle}>
                  <h2>Пользователь с таким email, не найден</h2>
                </Modal>

                <div className="grid grid--middle">
                  <PasswordForgetValidationForm onSubmit={ data => {
                    data.url = `${host}/restore/create`
                    return fetch(`${api}/user/user-sendRestorePassword`, {
                        headers: {
                          'Accept': 'application/json',
                          'Content-Type': 'application/json'
                        },
                        method: 'POST',
                        body: JSON.stringify(data)
                      })
                      .then(response => response.json())
                      .then(json => {
                        if (json.errorCode === 1 && json.data) {
                          if (json.data.resultCode === 2) {
                            this.refs.failModal.show()
                          } else {
                            this.refs.successModal.show()
                          }
                        } else {
                          throw new SubmissionError({
                            password: '',
                            _error: 'Что-то пошло не так, попробуйте снова'
                          })
                        }
                      })
                  }}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  program: state.profile.program,
  amount: state.profile.amount,
  packageType: state.profile.packageType,
})

ProfilePasswordForget = connect(
  mapStateToProps,
)(ProfilePasswordForget)

export default ProfilePasswordForget
