import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import cookie from 'react-cookie'
import Modal from 'boron/FadeModal'
import { api } from '../../config.js'
import {
  fetchTaskDayIfNeeded
} from '../../actions'

const otherName = 'другое'

let contentStyle = {
  borderRadius: '18px',
  padding: '30px',
  color: '#1F447B'
}

class Poll extends Component {
  componentWillMount() {
    if (window.mobilecheck()) {
      contentStyle.margin = '100px'
      contentStyle.width = '300px'
    }
  }

  componentDidUpdate() {
    const { poll: {fields}, selectField } = this.props
    if (fields[selectField] && fields[selectField].name !== otherName) {
      this.refs.answer.value = fields[selectField].name
    } else {
      this.refs.answer.value = ''
    }
  }

  render() {
    const { poll, selectField, dispatch, selectedTaskDay, id } = this.props
    let { fields, description } = poll

    return (
      <div className="question-form">
        <h4 className="h1 question-form__title">{description}</h4>
        <ul className="options options--black mb60">
          {fields.map((field, index) => (
            <li key={index}
              className={selectField === index ? "options__item is-active" : "options__item"}
              onClick={() => {
                dispatch({ type: 'SELECT_FIELD', selectField: index })
              }
            }>
              {field.name}
            </li>
          ))}
        </ul>
        <div className="question-form__own-version">
          <div className="input input--box input--btn">
            <input ref='answer' type="text" className="input__field"/>
            <div className="btn btn--secondary" onClick={() => {
              this.refs.loadingModal.show()

              let data = { poll: fields[selectField].id }

              if (fields[selectField] && fields[selectField].name === otherName) {
                data.text = this.refs.answer.value
              }

              return fetch(`${api}/poll/pollFieldUser-create`, {
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify({
                  authToken: cookie.load('token'),
                  data
                })
              })
              .then(response => response.json())
              .then(json => {
                this.refs.loadingModal.hide()
                if (json.isSuccess) {
                  this.refs.successModal.show()
                } else {
                  this.refs.errorModal.show()
                }
              })
            }}>
              Отправить
            </div>

            <Modal ref='loadingModal' contentStyle={contentStyle} backdrop={false}>
              <h2>Подождите...</h2>
            </Modal>
            <Modal ref='errorModal' contentStyle={contentStyle}>
              <h2>Что-то пошло не так, попробуйте снова</h2>
              <br/>
              <button className="btn btn--action" onClick={() => this.refs.errorModal.hide()}>
                Продолжить
              </button>
            </Modal>
            <Modal ref='successModal' contentStyle={contentStyle}>
              <h2>Ваш ответ отправлен!</h2>
              <br/>
              <button className="btn btn--action" onClick={() => {
                this.refs.successModal.hide()
                dispatch({ type: 'POLL_WAS_SEND', pollWasSend: id })
              }}>
                Продолжить
              </button>
            </Modal>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return { selectField: state.selectField, selectedTaskDay: state.selectedTaskDay }
}

Poll= connect(
  mapStateToProps
)(Poll)

export default Poll
