import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import Header from '../../stories/Header'

import RadioProfile from '../componentKit/RadioProfile'
import RadioCustom from '../componentKit/RadioCustom'
import Timer from '../componentKit/Timer'
import CustomInput from '../componentKit/CustomInput'
import InputProfile from '../componentKit/InputProfile'
import InputProfilePhone from '../componentKit/InputProfilePhone'
import CheckboxProfile from '../componentKit/CheckboxProfile'
import SelectProfile from '../componentKit/SelectProfile'
import InputProfileBirthday from '../componentKit/InputProfileBirthday'
import InputProfileDate from '../componentKit/InputProfileDate'
import ErrorField from '../componentKit/ErrorField'
import InsuranceValidationForm from '../profile/InsuranceValidationForm'
import { SubmissionError } from 'redux-form'
import cookie from 'react-cookie'
import moment from 'moment'
import Modal from 'boron/DropModal'

let injuries = []
let diseases = []
let bodyParameters = []

const contentStyle = {
  borderRadius: '18px',
  padding: '30px'
}

const FB = window.FB
const VK = window.VK
const FAPI = window.FAPI

class SubmitValidationForm extends Component {
  updatePhoto(photoPayload) {
    return fetch('http://sport.muhanov.net/api/user/user-update', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(photoPayload)
    })
    .then(response => response.json())
    .then(json => {})
  }

  componentWillMount() {
    const { bodyMeasure, dispatch } = this.props
    const script = document.createElement("script")

    script.type  = "text/javascript"
    script.text = 'http://api.ok.ru/js/fapi5.js'
    document.body.appendChild(script)

    if (bodyMeasure) {
      dispatch({
        type: 'SAVE_BODY_PARAMS',
        bodyMeasure
      })
    }
  }

  render() {
    const { error, handleSubmit, pristine, reset, bodyParams,
      dispatch, submitting, onSubmit, initialValues } = this.props

    bodyParameters = bodyParams
    const sports = [
      'Сложно',
      'Нормально',
      'Хорошо',
      'Отлично'
    ]

    const sportsPast = [
      { text: 'Да', val: true },
      { text: 'Нет', val: false }
    ]

    const injuriesExist = [
      { text: 'Есть', val: true },
      { text: 'Нет', val: false }
    ]

    const injuriesList = [
      'Шея/Плечи',
      'Руки',
      'Спина/Поясница',
      'Колени',
      'Другое'
    ]

    const diseasesList = [
      'Диабет',
      'Сердце',
      'Почки',
      'Поджелудочная',
      'Другое'
    ]

    const pressure = [
      'Пониженное',
      'Нормальное',
      'Повышенное'
    ]

    return (
      <form onSubmit={handleSubmit(onSubmit)} className="layout">

        <Header burger={false} />

        <div className="layout__inner layout__inner--profile">
          <div className="stage-box stage-box--small-padding">

            <h1 className="h1">Профиль</h1>

            <hr/>

            <div className="grid">
              <div className="1/2--desk grid__cell mb30">
                <h3 className="h3">Личные данные</h3>

                <div className="text-center">
                  <div className="avatar avatar--profile">
                    <label className="upload-file avatar--upload" htmlFor="ava[1]">
                      <input id="ava[1]" type="file" accept="image/*" className="upload-file__input" onChange={input => {
                        const { target } = input
                        if (target.files && target.files[0]) {
                          var reader = new FileReader()

                          reader.onload = e => {
                            this.refs.avatar.src = e.target.result

                            const payload = {
                              authToken: cookie.load('token'),
                              data: {
                                name: target.files[0].name,
                                content: reader.result.replace(/data:image\/\w+;base64,/, '')
                              }
                            }

                            return fetch('http://sport.muhanov.net/api/data/file-upload', {
                              headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                              },
                              method: 'POST',
                              body: JSON.stringify(payload)
                            })
                            .then(response => response.json())
                            .then(json => {
                              console.log(json)
                              if (json.errorCode === 1 && json.data) {
                                const photoPayload = {
                                  authToken: cookie.load('token'),
                                  data: {
                                    photo: `http://sport.muhanov.net/api/files/${json.data.uid}.${json.data.extension}`,
                                  }
                                }

                                return this.updatePhoto(photoPayload)
                              }
                            })
                          }

                          reader.readAsDataURL(target.files[0])
                        }
                      }}/>
                    </label>
                    <div className="avatar__img-wrap">
                      <img ref="avatar" className="avatar__img" src={initialValues.photo ? initialValues.photo : "/assets/img/png/ava-ph-big.png"} alt=""/>
                    </div>
                  </div>
                </div>
              </div>
              <div className="1/2--desk grid__cell">
                <h3 className="h3">Привязка к социальным сетям</h3>
                <ul className="btn-social btn-social--profile">
                  <li className="btn-social__item btn-social__item--vk" onClick={() => {
                    const self = this
                    VK.Auth.login(response => {
                      VK.Api.call('users.get', {fields: 'photo_200'}, function(r) {
                        if(r.response && r.response[0] && r.response[0].photo_200) {
                          const photo = r.response[0].photo_200
                          self.refs.avatar.src = photo
                          const photoPayload = {
                            authToken: cookie.load('token'),
                            data: { photo }
                          }

                          return this.updatePhoto(photoPayload)
                        }
                      })
                    })
                  }}>
                    <svg className="svg-icon ico-vk">
                      <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#vk"></use>
                    </svg>
                    <span className="btn-social__title">Вконтакте</span>
                  </li>
                  <li className="btn-social__item btn-social__item--odnoklassniki" onClick={() => {
                    const FAPI = window.FAPI
                    var rParams = window.FAPI.Util.getRequestParameters()
                    console.log(rParams)
                    FAPI.init(rParams["api_server"], rParams["apiconnection"], () => {
                        console.log('here')
                        FAPI.Client.call({
                          method: "users.getInfo",
                          fields: "pic190x190"
                        }, r => {
                          console.log(r)
                        }, () => { console.log(error) })
                      }
                    )
                  }}>
                    <svg className="svg-icon ico-odnoklassniki">
                      <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#odnoklassniki"></use>
                    </svg>
                    <span className="btn-social__title">Одноклассники</span>
                  </li>
                  <li className="btn-social__item btn-social__item--fb" onClick={() => {
                    FB.login(response => {
                      if (response.status === 'connected') {
                        FB.api(`/me/picture?type=normal`,
                          response => {
                            if (response.data && response.data.url) {
                              const photo = response.data.url
                              this.refs.avatar.src = photo
                              const photoPayload = {
                                authToken: cookie.load('token'),
                                data: { photo }
                              }

                              return this.updatePhoto(photoPayload)
                            }
                          }
                        )
                      }
                    })
                  }}>
                    <svg className="svg-icon ico-fb">
                      <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#fb"></use>
                    </svg>
                    <span className="btn-social__title">facebook</span>
                  </li>
                </ul>
              </div>
            </div>

            <hr/>

            <div className="gender">
              <p className="gender__title">Пол</p>
              <Field name="gender" value="male" type='radio' title="Мужчина" id="gender[1]" component={RadioProfile} />
              <Field name="gender" value="female" type='radio' title="Женщина" id="gender[2]" component={RadioProfile} />
            </div>

            <hr/>

            <div className="grid">
              <div className="1/2--desk 1/1--pocket grid__cell">
                <Field name="firstName" placeholder="Имя" component={InputProfile} />
              </div>
              <div className="1/2--desk 1/1--pocket grid__cell">
                <Field name="lastName" placeholder="Фамилия" component={InputProfile} />
              </div>
            </div>

            <div className="grid">
              <div className="1/2--desk 1/1--pocket grid__cell">
                <p className="base-parag">Дата рождения</p>
                <Field name="birthday" placeholder="д/М/гггг" component={InputProfileBirthday} />
              </div>
              <div className="1/2--desk 1/1--pocket grid__cell">
                <p className="base-parag">Ссылка на Instagram</p>
                <Field name="instagram" placeholder="https://www.instagram.com/test/" component={InputProfile} />
              </div>
            </div>

            {/* <h3 className="h3">Сменить пароль</h3>

            <Field name="passwordOld" placeholder="Старый пароль" type='password' component={InputProfile} />
            <Field name='passwordNew' placeholder="Новый пароль"  type='password' component={InputProfile} />
            <Field name='passwordNewAgain' placeholder="Новый пароль еще раз" type='password' component={InputProfile} /> */}

            <h3 className="h3">Контактные данные</h3>

            <div className="grid">
              <div className="1/2--desk 1/1--pocket grid__cell">
                <Field name="country" options={['Россия', 'Украина']} component={SelectProfile} />
              </div>
              <div className="1/2--desk 1/1--pocket grid__cell">
                <Field name="city" options={['Москва', 'Одесса']} component={SelectProfile} />
              </div>
            </div>

            <div className="grid">
              <div className="1/2--desk 1/1--pocket grid__cell">
                <Field name="phone" type="tel" placeholder="ХХХХХХХХХХ" component={InputProfilePhone} />
              </div>
              <div className="1/2--desk 1/1--pocket grid__cell">
                <Field disabled name="email" type="tel" placeholder="Почта" defaultValue="anna@gmail.com" component={InputProfile} />
              </div>
            </div>

            <Field name="timezone" options={['Часовой пояс Минкс+1', 'Часовой пояс Москва+3']} component={SelectProfile} />

            <hr/>

            <h3 className="h3">Ваши параметры</h3>

            <div className="base-table-scroll">
              <table className="base-table">
                <tr>
                  <th>Дата</th>
                  <th>Вес, кг</th>
                  <th>Грудь, см</th>
                  <th>Талия, см</th>
                  <th>Бедра, см</th>
                  <th>Обхват бедра, см</th>
                </tr>
                {bodyParams.map((param, index) => (
                  <tr key={index}>
                    <td>{param.date}</td>
                    <td>{param.weight}</td>
                    <td>{param.chest}</td>
                    <td>{param.waist}</td>
                    <td>{param.hips}</td>
                    <td>{param.thigh}</td>
                  </tr>
                ))}
                <tr>
                  <td></td>
                  <td><input ref="weight" type="text" className="base-table__input"/></td>
                  <td><input ref="chest" type="text" className="base-table__input"/></td>
                  <td><input ref="waist" type="text" className="base-table__input"/></td>
                  <td><input ref="hips" type="text" className="base-table__input"/></td>
                  <td><input ref="thigh" type="text" className="base-table__input"/></td>
                </tr>
              </table>
              <div className="text-center">
                <button onClick={() => {
                  const data = {
                    date: moment().format('YYYY-DD-MM, HH:mm:ss'),
                    weight: this.refs.weight.value,
                    chest: this.refs.chest.value,
                    waist: this.refs.waist.value,
                    hips: this.refs.hips.value,
                    thigh: this.refs.thigh.value
                  }

                  const payload = {
                    authToken: cookie.load('token'),
                    data
                  }

                  return fetch('http://sport.muhanov.net/api/user/bodymeasure-create', {
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
                        dispatch({ ...data, type: 'ADD_BODY_PARAM' })
                        this.refs.successModal.show()
                      } else {
                        this.refs.failModal.show()
                      }
                    })
                }} className="btn btn--primary">
                  Добавить
                </button>
                <Modal ref='failModal' modalStyle={contentStyle}>
                  <h2>Что-то пошло не так, поробуйте чуть позже</h2>
                </Modal>
                <Modal ref='successModal' modalStyle={contentStyle}>
                  <h2>Данные добавлены!</h2>
                </Modal>
              </div>
            </div>

            <hr/>

            {initialValues.program === 2 &&
              <div>
                <h3 className="h3">Для программы "Мама может"</h3>
                <div className="grid mb30">
                  <div className="1/2--desk 1/1-pocket grid__cell">
                    <p className="base-parag">Дата рождения последнего ребёнка</p>
                    <Field name="babyBirthday" placeholder="д/М/гггг" component={InputProfile} />
                  </div>
                  <div className="1/2--desk 1/1-pocket grid__cell">
                    <p className="base-parag">Месяц когда перестали кормить грудью</p>
                    <Field name="lastBabyFeedMonth" placeholder="д/М/гггг" component={InputProfile} />
                  </div>
                </div>
              </div>
            }

            <InsuranceValidationForm />

            <p className="sub-title">Для того, чтобы добиться быстрых и качественных результатов тренеру важно знать некоторые особенности твоего организма. Это поможет ему правильно распределить нагрузку на мышцы и организовать последовательность тренировок, не навредив твоему организму</p>

            <hr/>

            <h3 className="h3">Осталось решить всего 1 вопрос и бонусы будут у тебя в копилочке!</h3>
            <p className="sub-title">Посчитай сколько раз ты приседаешь за 1 минуту и запиши цифру</p>
            <Field name="squatsCount" placeholder="Впиши свой результат сюда" component={InputProfile} />
            <p className="base-rapag text-center">Вот тебе таймер обратного отсчета. Запускай и начинай приседать</p>

            <Timer timer={{
              minutes: 1,
              seconds: 20
            }}/>

            <hr/>

            {/* <p className="base-parag text-center">Как у тебя со спортом? Выбери свой уровень</p>

            <ul className="options options--white mtb30">
              {sports.map((val, index) => (
                <label key={index}>
                  <li name="sports" className="options__item" id={`sports[${index}]`} onClick={e => {
                    document.getElementById(`sports[${index}]`).className += ' is-active'
                    sports.map((v, i) => {
                      if (index !== i)
                        document.getElementById(`sports[${i}]`).className = "options__item"
                    })
                  }}>
                    <Field component='input' type='radio' name="sports" style={{visibility: 'hidden', margin: -5}} value={val}/>
                    {val}
                  </li>
                  <span/>
                </label>
              ))}
            </ul> */}

            <p className="base-parag text-center">Занимался спортом раньше?</p>

            <ul className="options options--white mtb30">
              {sportsPast.map((val, index) => (
                <label key={index}>
                  <li name="sports" className="options__item" id={`sportsPast[${index}]`} onClick={e => {
                    document.getElementById(`sportsPast[${index}]`).className += ' is-active'
                    sportsPast.map((v, i) => {
                      if (index !== i)
                        document.getElementById(`sportsPast[${i}]`).className = "options__item"
                    })
                  }}>
                    <Field component='input' type='radio' name="didSports" style={{visibility: 'hidden', margin: -5}} value={val.val}/>
                    {val.text}
                  </li>
                  <span/>
                </label>
              ))}
            </ul>
            <Field name="didSports" component={ErrorField} />

            {/* <div className="text-center">
              <Field name='insurance' val='Я любитель' title='Я любитель' id="insurance[1]" component={RadioProfile} />
              <Field name='insurance' val='Я профи' title='Я профи' id="insurance[2]" component={RadioProfile} />
            </div> */}

            <hr/>

            <p className="base-parag text-center">Есть травмы или проблемные зоны?</p>

            <ul className="options options--white mtb30">
              {injuriesExist.map((val, index) => (
                <label key={index}>
                  <li name="sports" className={ initialValues && initialValues.injuriesExist === val.val ? "options__item is-active" : "options__item"} id={`injuriesExist[${index}]`} onClick={e => {
                    document.getElementById(`injuriesExist[${index}]`).className += ' is-active'
                    injuriesExist.map((v, i) => {
                      if (index !== i)
                        document.getElementById(`injuriesExist[${i}]`).className = "options__item"
                    })
                  }}>
                    {/* <Field component={RadioCustom} name="injuriesExist" val={val.val}/> */}
                    <Field component='input' type='radio' name="injuriesExist" style={{visibility: 'hidden', margin: -5}} value={val.val}/>
                    {val.text}
                  </li>
                  <span/>
                </label>
              ))}
            </ul>
            <Field name="injuriesExist" component={ErrorField} />

            <ul className="checkboxes">
              {injuriesList.map((val, index) => (
                <Field key={index} name={`injuries[${index}]`} title={val} id={`injuries[${index}]`} component={CheckboxProfile} onChange={e =>
                  e.target.checked ? injuries.push(val) : injuries.splice(injuries.indexOf(val), 1)
                }/>
              ))}
            </ul>

            <Field name="injuriesAnother" placeholder="Другое" component={InputProfile} />

            <hr/>

            {/* <p className="base-parag text-center">А хронические заболевания?</p>

            <ul className="options options--white mtb30">
              {injuriesExist.map((val, index) => (
                <label key={index}>
                  <li name="sports" className="options__item" id={`diseasesExist[${index}]`} onClick={e => {
                    document.getElementById(`diseasesExist[${index}]`).className += ' is-active'
                    injuriesExist.map((v, i) => {
                      if (index !== i)
                        document.getElementById(`diseasesExist[${i}]`).className = "options__item"
                    })
                  }}>
                    <Field component='input' type='radio' name="diseasesExist" style={{visibility: 'hidden', margin: -5}} value={val.val}/>
                    {val.text}
                  </li>
                  <span/>
                </label>
              ))}
            </ul>

            <ul className="checkboxes mb20">
              {diseasesList.map((val, index) => (
                <Field key={index} name={`diseases[${index}]`} title={val} id={`diseases[${index}]`} component={CheckboxProfile} onChange={e =>
                  e.target.checked ? diseases.push(val) : diseases.splice(diseases.indexOf(val), 1)
                }/>
              ))}
            </ul>

            <Field name="diseasesAnother" placeholder="Другое" component={InputProfile} />

            <hr/> */}

            {/* <p className="base-parag text-center">Какое у тебя давление?</p>

            <ul className="options options--white mtb30">
              {pressure.map((val, index) => (
                <label key={index}>
                  <li name="pressure" className="options__item" id={`pressure[${index}]`} onClick={e => {
                    document.getElementById(`pressure[${index}]`).className += ' is-active'
                    pressure.map((v, i) => {
                      if (index !== i)
                        document.getElementById(`pressure[${i}]`).className = "options__item"
                    })
                  }}>
                    <Field component='input' type='radio' name="pressure" style={{visibility: 'hidden', margin: -5}} value={val}/>
                    {val}
                  </li>
                  <span/>
                </label>
              ))}
            </ul>

            <p className="base-parag text-center">Что со вредными привычками?</p>

            <ul className="options options--white mtb30">
              {injuriesExist.map((val, index) => (
                <label key={index}>
                  <li name="sports" className="options__item" id={`badHabbitsExist[${index}]`} onClick={e => {
                    document.getElementById(`badHabbitsExist[${index}]`).className += ' is-active'
                    injuriesExist.map((v, i) => {
                      if (index !== i)
                        document.getElementById(`badHabbitsExist[${i}]`).className = "options__item"
                    })
                  }}>
                    <Field component='input' type='radio' name="badHabbitsExist" style={{visibility: 'hidden', margin: -5}} value={val.val}/>
                    {val.text}
                  </li>
                  <span/>
                </label>
              ))}
            </ul>

            <hr/> */}

            <div className="text-center">
              <button type='submit' className="btn btn--primary">
                Отправить анкету
              </button>
              {error && <strong>{error}</strong>}
            </div>

          </div>
        </div>
      </form>
    )
  }
}

const validate = data => {
  const errors = {}

  data.injuries = injuries.join()
  data.diseases = diseases.join()
  // data.bodyParams = bodyParameters

  console.log('validation')
  console.log(data)

  switch (true) {
    case !data.firstName:
      errors.firstName = 'Имя должно быть заполнено'
      break
    case data.firstName.length < 3:
      errors.firstName = 'Имя должно быть длиннее 3 символов'
      break
    case data.firstName.length > 20:
      errors.firstName = 'Имя должно быть короче 20 символов'
      break
    case !/^[A-Za-z0-9А-Яа-я]{3,20}$/.test(data.firstName):
      errors.firstName = 'Имя может содержать только буквы английского/русского алфавитов и цифры'
      break
  }

  switch (true) {
    case !data.lastName:
      errors.lastName = 'Фамилия должна быть заполнена'
      break
    case data.lastName.length < 3:
      errors.lastName = 'Фамилия должна быть длиннее 3 символов'
      break
    case data.lastName.length > 20:
      errors.lastName = 'Фамилия должна быть короче 20 символов'
      break
    case !/^[A-Za-z0-9А-Яа-я]{3,20}$/.test(data.lastName):
      errors.lastName = 'Фамилия может содержать только буквы английского/русского алфавитов и цифры'
      break
  }

  if (!data.gender) {
    errors.gender = ' (Пол должен быть заполнен)'
  }

  if (!data.country) {
    errors.country = 'Поле страны должно быть заполнено'
  }

  if (!data.city) {
    errors.city = 'Город должнен быть заполнен'
  }

  switch (true) {
    case !data.phone:
      errors.phone = 'Поле телефона должно быть заполнено'
      break
    case data.phone.length < 6:
      errors.phone = 'Поле телефона должно быть длиннее 3 символов'
      break
    case data.phone.length > 20:
      errors.phone = 'Поле телефона должно быть короче 20 символов'
      break
    case !/^[0-9]{3,20}$/.test(data.phone):
      errors.phone = 'Поле телефона может содержать только цифры'
      break
  }

  switch (true) {
    case !data.email:
      errors.email = 'Email должен быть заполнен'
      break
    case !/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i.test(data.email):
      errors.email = 'Email заполнен неправильно, проверьте его еще раз'
      break
  }

  switch (true) {
    case !data.birthday:
      errors.birthday = 'День Рождения должен быть заполнен'
      break
    case !/^[0-9][0-9]\/[0-9][0-9]\/[0-9][0-9][0-9][0-9]$/.test(data.birthday):
      errors.birthday = 'Поле День Рождения не соответствует формату 02/01/2017'
      break
  }

  if (!data.squatsCount) {
    errors.squatsCount = 'Количество приседаний должно быть заполнено'
  }

  if (!data.didSports) {
    errors.didSports = 'Поле спорт должно быть отмечено'
  }

  console.log(data.injuriesExist)

  if (data.injuriesExist === undefined) {
    errors.injuriesExist = 'Поле травмы должно быть отмечено'
  } else if (data.injuriesExist === 'true' && data.injuries.length === 0 && !data.injuriesAnother) {
    errors.injuriesAnother = 'Выберите травмы'
  }

  // if (!data.diseasesExist) {
  //   errors.diseasesExist = 'Поле хронические заболевания должно быть отмечено'
  // } else if (data.diseasesExist && data.diseases.length === 0 && !data.diseasesAnother) {
  //   errors.diseases = 'Выберите хронические заболевания'
  // }

  // if (!data.pressure) {
  //   errors.pressure = 'Поле давление должно быть отмечено'
  // }
  //
  // if (!data.badHabbitsExist) {
  //   errors.badHabbitsExist = 'Поле вредные привычки должно быть отмечено'
  // }

  return errors
}

SubmitValidationForm = reduxForm({
  form: 'submitValidation',
  validate
})(SubmitValidationForm)

const mapStateToProps = state => {
  return { bodyParams: state.bodyParams }
}

SubmitValidationForm = connect(
  mapStateToProps
)(SubmitValidationForm)

export default SubmitValidationForm
