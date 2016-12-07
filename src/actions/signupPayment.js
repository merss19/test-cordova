import cookie from 'react-cookie'
import { promoVisit } from './promo/promoWatch'
import { api } from '../config.js'

export const REQUEST_PAYMENT = 'REQUEST_PAYMENT'
export const RECEIVE_PAYMENT = 'RECEIVE_PAYMENT'
export const SELECT_PAYMENT = 'SELECT_PAYMENT'
export const INVALIDATE_PAYMENT = 'INVALIDATE_PAYMENT'

export const selectPayment = payment => ({
  type: SELECT_PAYMENT,
  payment
})

export const invalidatePayment = payment => ({
  type: INVALIDATE_PAYMENT,
  payment
})

export const requestPayment = payment => ({
  type: REQUEST_PAYMENT,
  payment
})

export const receivePayment = (payment, json) => {
  return ({
    type: RECEIVE_PAYMENT,
    payment,
    json,
    receivedAt: Date.now()
  })
}

const fetchPayment = partialState => dispatch => {
  const { token, profile, payment } = partialState
  const { program, packageType, promo } = profile
  dispatch(requestPayment(payment))
  const txId = cookie.load('txId')

  if (txId === undefined) {
    let payload = {
      authToken: token ? token : cookie.load('token'),
      data: {
        program,
        package: packageType
      }
    }

    if (!!promo) {
      payload.data.promoName = promo
    }

    if (!!promoVisit.getPromoSessionId()) {
      payload.data.promoSession = promoVisit.getPromoSessionId()
    }

    let data = new FormData()
    data.append("json", JSON.stringify(payload))

    return fetch(`${api}/payment/payment-create`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(payload)
    })
    .then(response => response.json())
    .then(json => {
      if (json && json.data && json.data.txId)
        cookie.save('txId', json.data.txId, { path: '/' })
      return dispatch(receivePayment(payment, json))
    })
  } else {
    const payload = {
      authToken: token ? token : cookie.load('token'),
      data: { txId }
    }

    let data = new FormData()
    data.append("json", JSON.stringify(payload))

    return fetch(`${api}/payment/payment-get`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(payload)
    })
    .then(response => response.json())
    .then(json => {
      if (json && json.data && json.data[0])
        return dispatch(receivePayment(payment, { data: json.data[0] }))
    })
  }
}

const shouldFetchPayment = (state, payment) => {
  const td = state.payment

  if (!td)
    return true

  if (td.isFetching)
    return false

  return td.didInvalidate
}

export const fetchPaymentIfNeeded = payment => (dispatch, getState) => {
  if (shouldFetchPayment(getState(), payment)) {
    return dispatch(fetchPayment({
      token: getState().userToken.token,
      profile: getState().profile,
      payment})
    )
  }
}
