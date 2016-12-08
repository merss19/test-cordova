import React, { Component } from 'react'
import { Field } from 'redux-form'
import { connect } from 'react-redux'

import InputProfile from '../componentKit/InputProfile'
import InputProfileBirthday from '../componentKit/InputProfileBirthday'
import cookie from 'react-cookie'
import Modal from 'boron/DropModal'
import { api } from '../../config.js'

const contentStyle = {
  borderRadius: '18px',
  padding: '30px'
}

let insuranceFiles = []

class InsuranceValidationForm extends Component {
  componentWillMount() {
    const { dispatch, docs } = this.props
    dispatch({
      type: 'SAVE_INSURANCE_DOCS',
      docs
    })
  }

  render() {
    const { dispatch, insuranceDocs } = this.props
    const docsNames = insuranceDocs.map(doc => doc.name)
    const docsString = docsNames.join()

    return (
      <div>
        <h3 className="h3">Страховка</h3>
        <p className="sub-title">Обеспечь свою безопасность. Это займет всего 2 минуты</p>

        <div className="grid">
          <div className="2/3--desk 1/1--pocket grid__cell">
            <p className="label">ФИО</p>
            <Field ref="fullName" name="fullName" placeholder="" component={InputProfile} />
          </div>
          <div className="1/3--desk 1/1--pocket grid__cell">
            <p className="label">Дата рождения</p>
            <Field ref="birthday" name="birthday" placeholder="д/М/гггг" component={InputProfileBirthday} />
            {/* <Field val={insurance.birthday} name="insuranceBirthday" placeholder="д/М/гггг" component={InputProfile} /> */}
          </div>
        </div>

        <p className="label">Профессия/Должность</p>
        <Field ref="profession" name="profession" placeholder="" component={InputProfile} />

        <p className="label">Паспортные данные</p>
        <Field ref="passport" name="passport" placeholder="" component={InputProfile} />

        <p className="label">Адрес Регистрации</p>
        <Field ref="address" name="address" placeholder="" component={InputProfile} />

        <p className="label">Индивидуальная страховая сумма по рискам, указанным в п.п. ___. - ___. Договора руб.</p>
        <div className="input input--box">
          <input disabled type="text" className="input__field" placeholder="" value="100 000"/>
        </div>

        <hr/>

        <h3 className="h3">Дополнительные документы</h3>

        <div className="grid grid--center">
          <div className="1/3--desk grid__cell">
            <ul className="upload-list mb20">
              {insuranceDocs.map((doc, index) => (
                <li key={index} className="upload-list__item">
                  <span className="upload-list__title">{doc.name}</span>
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
              <span className="input__text">{docsString}</span>
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
          <div className="btn btn--primary" onClick={data => {
            const payload = {
              authToken: cookie.load('token'),
              data: {
                fullName: this.refs.fullName.value,
                birthday: this.refs.birthday.value,
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
                if (json.errorCode === 1 && json.data) {
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
                      })
                  })
                  this.refs.successModal.show()
                } else {
                  this.refs.failModal.show()
                }
              })
          }}>
            Активировать
          </div>
        </div>

        <hr/>

        <Modal ref='failModal' modalStyle={contentStyle}>
          <h2>Что-то пошло не так, поробуйте чуть позже</h2>
        </Modal>
        <Modal ref='successModal' modalStyle={contentStyle}>
          <h2>Данные отправлены!</h2>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return { insuranceDocs: state.insuranceDocs }
}

InsuranceValidationForm = connect(
  mapStateToProps
)(InsuranceValidationForm)

export default InsuranceValidationForm
