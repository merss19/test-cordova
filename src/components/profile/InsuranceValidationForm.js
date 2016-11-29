import React, { Component } from 'react'
import { Field } from 'redux-form'
import { Link } from 'react-router'
import { connect } from 'react-redux'

import CustomInput from '../componentKit/CustomInput'
import InputProfileWithVal from '../componentKit/InputProfileWithVal'
import InputProfileBirthday from '../componentKit/InputProfileBirthday'
import InputProfileDate from '../componentKit/InputProfileDate'
import { SubmissionError } from 'redux-form'
import cookie from 'react-cookie'
import Modal from 'boron/DropModal'

const contentStyle = {
  borderRadius: '18px',
  padding: '30px'
}

class InsuranceValidationForm extends Component {
  render() {
    let { insurance } = this.props
    insurance = insurance[0]
    return (
      <div>
        <h3 className="h3">Страховка</h3>
        <p className="sub-title">Обеспечь свою безопасность. Это займет всего 2 минуты</p>

        <div className="grid">
          <div className="2/3--desk 1/1--pocket grid__cell">
            <p className="label">ФИО</p>
            <Field val={insurance.fullName} name="insuranceName" placeholder="" component={InputProfileWithVal} />
          </div>
          <div className="1/3--desk 1/1--pocket grid__cell">
            <p className="label">Дата рождения</p>
            <Field val={insurance.birthday} name="insuranceBirthday" placeholder="д/М/гггг" component={InputProfileWithVal} />
          </div>
        </div>

        <p className="label">Профессия/Должность</p>
        <Field val={insurance.profession} name="insuranceJob" placeholder="" component={InputProfileWithVal} />

        <p className="label">Паспортные данные</p>
        <Field val={insurance.passport} name="insurancePasport" placeholder="" component={InputProfileWithVal} />

        <p className="label">Адрес Регистрации</p>
        <Field val={insurance.address} name="insuranceAddress" placeholder="" component={InputProfileWithVal} />

        <p className="label mb10">Срок страхования</p>
        <div className="grid">
          <div className="1/2 grid__cell">
            <p className="label">Дата начала</p>
            <Field disabled={true} name="insuranceStartDate" placeholder="д/М/гггг" val="12/10/2016" component={InputProfileDate} />
          </div>
          <div className="1/2 grid__cell">
            <p className="label">Дата окончания</p>
            <Field disabled={true} name="insuranceEndDate" placeholder="д/М/гггг" val="12/10/2016" component={InputProfileDate} />
          </div>
        </div>

        <p className="label">Индивидуальная страховая сумма по рискам, указанным в п.п. ___. - ___. Договора руб.</p>
        <div className="input input--box">
          <input disabled type="text" className="input__field" placeholder="" value="100 000"/>
        </div>

        <div className="text-center mb30">
          <button className="btn btn--secondary" onClick={data => {
            const payload = {
              authToken: cookie.load('token'),
              data: {
                fullName: 'string',
                birthday: "2010-11-29",
                profession: "profession",
                passport: "passport",
                address: "address",
                dateStart: "2016-05-29",
                dateEnd: "2016-11-29",
                amount: 100,
                isActive: false
              }
            }
            return fetch('http://sport.muhanov.net/api/user/insurance-create', {
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
                  this.refs.successModal.show()
                } else {
                  this.refs.failModal.show()
                }
              })
          }}>
            Активировать страховку
          </button>
        </div>
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

export default InsuranceValidationForm
