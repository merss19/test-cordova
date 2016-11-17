import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../actions'
import LoginValidationForm from '../components/profile/LoginValidationForm'
import { browserHistory } from 'react-router'
import { SubmissionError } from 'redux-form'
import cookie from 'react-cookie'

class ProfilePay extends Component {
  componentWillMount() {
    const frameScript = document.createElement("script")
    frameScript.type  = "text/javascript"

    const data = JSON.stringify({
        parent_id: "iframe_parent",
        api_key: "1e9a7de1-f177-48ff-9967-112d946e3e99",
        tx_id: "123",
        description: "Тестовый платеж",
        amount: 1000,
        signature: "",
        success_redirect: "http://localhost:3000/",
        fail_redirect: "http://localhost:3000/error",
        rebill: {},
        extra: {},
        version: "2.0.0"
    })

    frameScript.text  = 'PaymoFrame.set(' + data + ')'

    document.body.appendChild(frameScript)
  }

  render() {
    return (
      <div>
        <div id="iframe_parent"/>
      </div>
  )}
}

export default ProfilePay
