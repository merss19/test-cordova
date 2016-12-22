import React, { Component } from 'react'
import LoadingView from '../componentKit/LoadingView'

class SuccessTomorrowProfile extends Component {
  componentWillMount() {
    const fbScript = document.createElement("script")
    fbScript.text = "fbq('track', 'Purchase')"
    document.body.appendChild(fbScript)
  }

  render() {
    return (
      <LoadingView
        title="Оплата прошла успешно! Вашему другу придет подтверждение об оплате с кодом на ваш email"
        logout={true}
      />
    )
  }
}

export default SuccessTomorrowProfile
