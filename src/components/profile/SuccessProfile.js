import React, { Component } from 'react'
import LoadingView from '../componentKit/LoadingView'

class SuccessProfile extends Component {
  componentWillMount() {
    const fbScript = document.createElement("script")
    fbScript.text = "fbq('track', 'Purchase')"
    document.body.appendChild(fbScript)
  }

  render() {
    return (
      <LoadingView
        title="Оплата прошла успешно! Вам придет подтверждение об оплате с кодом на ваш Email"
        logout={true}
      />
    )
  }
}

export default SuccessProfile
