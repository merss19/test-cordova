import React from 'react'
import LoadingView from '../componentKit/LoadingView'

const SuccessProfile = () => (
  <LoadingView
    title="Оплата прошла успешно! Вам придет подтверждение об оплате с кодом на ваш Email"
    logout={true}
  />
)

export default SuccessProfile
