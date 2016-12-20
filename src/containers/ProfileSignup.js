import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../actions'
import { browserHistory } from 'react-router'
import { SubmissionError } from 'redux-form'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import cookie from 'react-cookie'
import SignupValidationForm from '../components/profile/SignupValidationForm'
import { api } from '../config.js'
import Modal from 'boron/DropModal'
import CustomInput from '../components/componentKit/CustomInput'
import InputProfile from '../components/componentKit/InputProfile'
import SelectProgram from '../components/componentKit/SelectProgram'

let contentStyle = {
  borderRadius: '18px',
  padding: '30px'
}

let email
let password

class ProfileSignup extends Component {
  componentWillMount() {
    const fbScript = document.createElement("script")
    fbScript.text = "fbq('track', 'RegistrationStarts')"
    document.body.appendChild(fbScript)

    if (window.mobilecheck()) {
      contentStyle.width = '300px'
    }

    const programParam = this.props.params.program
    const { amount, type, promo, emailFriend, phoneFriend, nameFriend, share } = this.props.location.query
    const packageType = type
    let program

    cookie.save('share', share, { path: '/' })

    switch (programParam) {
      case 'hero':
        program = '1'
        break
      case 'mommy':
        program = '2'
        break
      case 'extremeways':
        program = '3'
        break
      case 'tomorrowman':
        program = '4'
        break
      default:
        break
    }

    cookie.save('program', program, { path: '/' })

    const { signup } = this.props
    signup(program, amount, packageType, promo, emailFriend, share, phoneFriend, nameFriend)
  }

  statusChangeCallback(response) {
    if (response.status === 'connected') {
    } else if (response.status === 'not_authorized') {
      document.getElementById('status').innerHTML = 'Please log ' +
        'into this app.'
    } else {
      document.getElementById('status').innerHTML = 'Please log ' +
        'into Facebook.'
    }
  }

  render() {
    let { amount, packageType, promo, emailFriend, program, share, phoneFriend, nameFriend } = this.props
    const { setToken, signup } = this.props
    let programName
    let packageName
    amount = !!amount ? amount : 0

    switch (program + '') {
      case '1':
        programName = '#Я ГЕРОЙ'
        break
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
        programName = 'ЯСЕГОДНЯ'
    }

    if (program + '' === '4') {
      packageName = 'Подарок другу'
      amount = 3000
    } else {
      switch (packageType + '') {
        case '1':
          packageName = '1  человек'
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
    }

    const userCreate = payload => {
      program = !!program ? program : '1'
      packageType = !!packageType ? packageType : '1'
      cookie.save('program', program + '', { path: '/' })
      signup(program, undefined, packageType, promo, emailFriend, share, phoneFriend, nameFriend)
      this.refs.loadingModal.show()
      return fetch(`${api}/user/user-create`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(payload)
      })
      .then(response => response.json())
      .then(json => {
        this.refs.loadingModal.hide()
        if (json.data && json.data.authToken) {
          cookie.save('token', json.data.authToken, { path: '/' })
          setToken(json.data.authToken)
          browserHistory.push('/signup/pay')
        } else if (json.errorCode = 129) {
          this.refs.errorEmailModal.show()
        } else {
          this.refs.errorModal.show()
          throw new SubmissionError({ password: '', _error: 'Что-то пошло не так, возможно такой email уже существует' })
        }
      })
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

                <h2 className="h2">Зарегистрируйтесь или Войдите</h2>

                <hr/>

                <SignupValidationForm email={this.props.location.query.email} onSubmit={data => {
                  email = data.email
                  password = data.password

                  if (!program || !packageType) {
                    this.refs.accModal.show()
                    return
                  }

                  let payload = { program, email, emailFriend, password, package: packageType }
                  const name = this.props.location.query.name

                  if (name) {
                    payload.firstName = name
                  }

                  return userCreate(payload)
                }}/>

                <p className="entry-form__note">Выполнив этот шаг вы автоматически перейдете к следующему</p>

              </div>

            </div>
          </div>

        </div>


        <Modal ref='accModal' modalStyle={contentStyle}>
          <h2>Выберите программу</h2>
          <br/>
          {!this.props.params.program &&
            <Field name="programValue" id="programValue" options={[
              { name: '#Я ГЕРОЙ', value: '1'},
              { name: '#МАМА МОЖЕТ', value: '2' },
              { name: '#ЭКСТРЕМАЛЬНАЯ СУШКА', value: '3' },
              { name: '#Я ЗАВТРА', value: '4' }
            ]} component={SelectProgram} />
          }
          {program !== '4' &&
            <Field name="packageTypeValue" id="packageTypeValue" options={[
              { name: '1 человек', value: '1'},
              { name: '2 человека', value: '2' },
              { name: '3 человека', value: '3' }
            ]} component={SelectProgram} />
          }
          {program === '4' &&
            <div>
              <Field name='emailFriendValue' id='emailFriendValue' placeholder='Email друга' component={InputProfile} />
              <Field name='phoneFriendValue' id='phoneFriendValue' placeholder='Телефон друга' component={InputProfile} />
              <Field name='nameFriendValue' id='nameFriendValue' placeholder='Имя друга' component={InputProfile} />
            </div>
          }
          <Field name='promoValue' id='promoValue' placeholder='Промокод, если есть' component={InputProfile} />
          <button className="btn btn--action" onClick={() => {
            program = !!program ? program : 1
            packageType = !!packageType ? packageType : 1

            signup(program, undefined, packageType, promo, emailFriend, share, phoneFriend, nameFriend)
            let payload = {
              program,
              email: email ? email.replace(/ /g,'') : email,
              password, package:
              packageType }

            const name = this.props.location.query.name

            if (name) {
              payload.firstName = name
            }

            return userCreate(payload)
          }}>
            Продолжить
          </button>
        </Modal>
        <Modal ref='loadingModal' modalStyle={contentStyle}>
          <h2>Подождите...</h2>
        </Modal>
        <Modal ref='errorModal' modalStyle={contentStyle}>
          <h2>Что-то пошло не так, попробуйте снова</h2>
        </Modal>
        <Modal ref='errorEmailModal' modalStyle={contentStyle}>
          <h2>Введенный вами email уже существует</h2>
        </Modal>
      </div>
    )
  }
}

ProfileSignup = reduxForm({
  form: 'signupValidation'
})(ProfileSignup)

const selector = formValueSelector('signupValidation')
const mapStateToProps = state => {
  let { program, packageType, promo, amount, share } = state.profile

  if (!program) {
    program = selector(state, 'programValue')
  }

  if (!packageType) {
    packageType = selector(state, 'packageTypeValue')
  }

  const emailFriend = selector(state, 'emailFriendValue')
  const phoneFriend = selector(state, 'phoneFriendValue')
  const nameFriend  = selector(state, 'nameFriendValue')
  promo = selector(state, 'promoValue')

  return {
    program,
    packageType,
    promo,
    amount,
    emailFriend,
    phoneFriend,
    nameFriend,
    share
  }
}

const mapDispatchToProps = dispatch => ({
  signup: bindActionCreators(actions.signup, dispatch),
  setToken: bindActionCreators(actions.setToken, dispatch)
})

ProfileSignup = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileSignup)

export default ProfileSignup
