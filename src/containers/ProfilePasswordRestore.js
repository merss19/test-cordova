import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import * as actions from '../actions'
import RestoreValidationForm from '../components/profile/RestoreValidationForm'
import { SubmissionError } from 'redux-form'
import { api } from '../config.js'
import Modal from 'boron/FadeModal'

let contentStyle = {
  borderRadius: '18px',
  padding: '30px'
}

class ProfilePasswordRestore extends Component {
  componentWillMount() {
    if (window.mobilecheck()) {
      contentStyle.width = '300px'
    }
  }
  
  render() {
    const { token } = this.props.location.query
    return (
      <div className="layout layout--login">
        <RestoreValidationForm onSubmit={ data => {
          const payload = {
            token,
            password: data.password
          }

          this.refs.loadingModal.show()
          return fetch(`${api}/user/user-approveRestorePassword`, {
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
            if (json.errorCode === 1 && json.data) {
              if (json.data.resultCode === 1) {
                this.refs.successModal.show()
              } else {
                this.refs.failModal.show()
              }
            } else {
              throw new SubmissionError({
                password: '',
                _error: 'Что-то пошло не так, попробуйте снова'
              })
            }
          })
        }}/>

        <Modal ref='successModal' contentStyle={contentStyle}>
          <h2>Ваш пароль изменен!</h2>
          <Link to='/'>Войти</Link>
        </Modal>

        <Modal ref='loadingModal' contentStyle={contentStyle} backdrop={false}>
          <h2>Подождите...</h2>
        </Modal>

        <Modal ref='failModal' contentStyle={contentStyle}>
          <h2>Такой пароль уже есть, либо, что-то пошло не так. Попробуйте еще раз</h2>
        </Modal>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
    showError: bindActionCreators(actions.createProfile, dispatch),
    setToken: bindActionCreators(actions.setToken, dispatch)
})

ProfilePasswordRestore = connect(
  mapDispatchToProps
)(ProfilePasswordRestore)

export default ProfilePasswordRestore
