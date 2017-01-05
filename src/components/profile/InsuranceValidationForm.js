import React, { Component } from 'react'
import { Field } from 'redux-form'
import { connect } from 'react-redux'

import InputProfile from '../componentKit/InputProfile'
import InputProfileBirthday from '../componentKit/InputProfileBirthday'
import InputDayPicker from './InputDayPicker'
import cookie from 'react-cookie'
import Modal from 'boron/FadeModal'
import { api } from '../../config.js'

let contentStyle = {
  borderRadius: '18px',
  padding: '30px'
}

let insuranceFiles = []

class InsuranceValidationForm extends Component {
  componentWillMount() {
    if (window.mobilecheck()) {
      contentStyle.width = '300px'
    }

    const { dispatch, docs } = this.props
    dispatch({
      type: 'SAVE_INSURANCE_DOCS',
      docs
    })
  }

  render() {
    const { dispatch, insuranceDocs, birthday } = this.props
    const docsNames = insuranceDocs.map(doc => doc.name)
    const docsString = docsNames.join()

    console.log(insuranceDocs)

    return (
      <div>
        <h3 className="h3">Страховка</h3>
        <p className="sub-title">Обеспечь свою безопасность. Это займет всего 2 минуты</p>

        <div className="grid">
          <div className="2/3--desk 1/1--pocket grid__cell">
            <h3 className="h3">ФИО</h3>
            <Field ref="fullName" name="fullName" placeholder="" component={InputProfile} />
          </div>
          <div className="1/3--desk 1/1--pocket grid__cell">
            <h3 className="h3">Дата рождения</h3>
            {/* <div className="input input--box mb30">
              <input ref="birthday" name="birthday" value={birthday} placeholder="д/М/гггг" type='text' className="input__field input__field--date"/>
            </div> */}
            <Field ref="birthday" name="birthday" placeholder="д/М/гггг" component={InputDayPicker} />
            {/* <Field ref="birthday" name="birthday" placeholder="д/М/гггг" component={InputProfileBirthday} /> */}
            {/* <Field val={insurance.birthday} name="insuranceBirthday" placeholder="д/М/гггг" component={InputProfile} /> */}
          </div>
        </div>

        <h3 className="h3">Профессия/Должность</h3>
        <Field ref="profession" name="profession" placeholder="" component={InputProfile} />

        <h3 className="h3">Паспортные данные</h3>
        <Field ref="passport" name="passport" placeholder="" component={InputProfile} />

        <h3 className="h3">Адрес регистрации</h3>
        <Field ref="address" name="address" placeholder="" component={InputProfile} />

        <h3 className="h3">Индивидуальная страховая сумма по рискам, указанным в п.п. ___. - ___. Договора руб.</h3>
        <div className="input input--box">
          <input disabled type="text" className="input__field" placeholder="" value="100 000 руб."/>
        </div>

        <hr/>

        <h3 className="h3">Дополнительные документы</h3>

        <div className="grid grid--center">
          <div className="1/3--desk grid__cell">
            <ul className="upload-list mb20">
              {insuranceDocs.map((doc, index) => (
                <li key={index} className="upload-list__item">
                  <span className="upload-list__title">{doc.name.slice(0,20)}</span>
                  <span className="upload-list__btn-del">
                    <svg className="svg-icon ico-trash" onClick={e => {
                      e.preventDefault()
                      const payload = {
                        authToken: cookie.load('token'),
                        data: { uid: doc.uid }
                      }

                      const headers = {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                      }

                      dispatch({
                        type: 'REMOVE_INSURANCE_DOC',
                        doc
                      })

                      insuranceFiles.splice(insuranceFiles.indexOf(doc.uid), 1)

                      return fetch(`${api}/user/insuranceFile-delete`, {
                          headers,
                          method: 'POST',
                          body: JSON.stringify(payload)
                        })
                        .then(response => response.json())
                        .then(json => {
                        })
                    }}>
                      <use xlinkHref="#ico-trash"></use>
                    </svg>
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="2/3--desk grid__cell">
            <div className="input input--box input--btn">
              <span className="input__text" style={{ width: '100%' }}>{docsString}</span>
              <input multiple id="file-upload" type="file" className="input__field" placeholder="" onChange={input => {
                const { target } = input
                if (target.files && target.files[0]) {
                  var reader = new FileReader()

                  reader.onload = e => {
                    //this.refs.avatar.src = e.target.result

                    const payload = {
                      authToken: cookie.load('token'),
                      data: {
                        name: target.files[0].name,
                        content: reader.result.replace(/data:image\/\w+;base64,/, '')
                      }
                    }

                    const headers = {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json'
                    }

                    return fetch(`${api}/data/file-upload`, {
                        headers,
                        method: 'POST',
                        body: JSON.stringify(payload)
                      })
                      .then(response => response.json())
                      .then(json => {
                        if (json.errorCode === 1 && json.data) {
                          insuranceFiles.push(json.data.uid)

                          dispatch({
                            type: 'ADD_INSURANCE_DOC',
                            name: target.files[0].name,
                            uid: json.data.uid
                          })
                        }
                      })
                  }

                  reader.readAsDataURL(target.files[0])
                }
              }}/>
              <label htmlFor="file-upload" className="btn btn--secondary">Прикрепить файл</label>
            </div>
          </div>
        </div>

        <div className="text-center mb30">
          <div className="btn btn--primary" onClick={e => {
            const payload = {
              authToken: cookie.load('token'),
              data: {
                fullName: this.refs.fullName.value,
                birthday,
                profession: this.refs.profession.value,
                passport: this.refs.passport.value,
                address: this.refs.address.value,
                dateStart: "2016-05-29",
                dateEnd: "2016-11-29",
                amount: 100000,
                isActive: false
              }
            }

            return fetch(`${api}/user/insurance-create`, {
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(payload)
              })
              .then(response => response.json())
              .then(json => {
                if (json.errorCode === 1 && json.data && insuranceFiles[0]
                  && this.refs.fullName.value && this.refs.birthday.value
                  && this.refs.profession.value && this.refs.passport.value
                  && this.refs.address.value) {
                  insuranceFiles.map(uid => {
                    const payload = {
                      authToken: cookie.load('token'),
                      data: { uid, insurance: json.data.id }
                    }

                    const headers = {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json'
                    }

                    return fetch(`${api}/user/insuranceFile-create`, {
                        headers,
                        method: 'POST',
                        body: JSON.stringify(payload)
                      })
                      .then(response => response.json())
                      .then(json => {
                        console.log(json)
                        if (json.errorCode === 1) {
                          this.refs.successModal.show()
                        } else {
                          this.refs.failModal.show()
                        }
                      })
                  })
                } else {
                  this.refs.failModal.show()
                }
              })
          }}>
            Активировать
          </div>
        </div>

        <Modal ref='failModal' contentStyle={contentStyle}>
          <h2>Что-то пошло не так, возможно не все данные заполнены</h2>
          <br/>
          <div className="btn btn--action" onClick={() => this.refs.failModal.hide()}>
            Продолжить
          </div>
        </Modal>
        <Modal ref='successModal' contentStyle={contentStyle}>
          <h2>Данные отправлены! В течение суток на почту придет письмо с подтверждением одобрения страхования. Убедительно просим указывать реальные данные</h2>
          <br/>
          <div className="btn btn--action" onClick={e => this.refs.successModal.hide()}>
            Продолжить
          </div>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { insuranceDocs, birthday } = state
  return {
    insuranceDocs,
    birthday
   }
}

InsuranceValidationForm = connect(
  mapStateToProps
)(InsuranceValidationForm)

export default InsuranceValidationForm
