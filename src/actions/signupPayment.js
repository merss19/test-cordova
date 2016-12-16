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
  const { program, packageType, promo, emailFriend, share } = profile
  dispatch(requestPayment(payment))

  return fetch(`${api}/payment/payment-get`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({
      authToken: token ? token : cookie.load('token'),
      data: { take: 1 },
    })
  })
  .then(response => response.json())
  .then(json => {
    if (!json || !json.data || !json.data[0] || !json.data[0].txId) {
      let payload = {
        authToken: token ? token : cookie.load('token'),
        data: {
          program,
          package: packageType,
          isShare: share ? share : false
        }
      }

      if (!!promo) {
        payload.data.promoName = promo
      }

      if (!!promoVisit.getPromoSessionId()) {
        payload.data.promoSession = promoVisit.getPromoSessionId()
      }

      if (!!emailFriend) {
        payload.data.tomorrowManEmail = emailFriend
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
        return dispatch(receivePayment(payment, json))
      })
    } else {
      return dispatch(receivePayment(payment, { data: json.data[0] }))
    }
  })
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
