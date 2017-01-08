import cookie from 'react-cookie'
import {api} from '../config.js'
import moment from 'moment'

moment.locale('ru')

export const REQUEST_PENDING_INSURANCE_PROFILE = 'REQUEST_PENDING_INSURANCE_PROFILE'
export const RECEIVE_PENDING_INSURANCE_PROFILE = 'RECEIVE_PENDING_INSURANCE_PROFILE'
export const REQUEST_PENDING_INSURANCE_PROFILES = 'REQUEST_PENDING_INSURANCE_PROFILES'
export const RECEIVE_PENDING_INSURANCE_PROFILES = 'RECEIVE_PENDING_INSURANCE_PROFILES'

export const requestPendingInsuranceProfiles = () => ({
  type: REQUEST_PENDING_INSURANCE_PROFILES
})

export const receivePendingInsuranceProfiles = payload => ({
  type: RECEIVE_PENDING_INSURANCE_PROFILES,
  payload
})

export const fetchPendingInsuranceProfiles = () => (dispatch, getState) => {
  dispatch(requestPendingInsuranceProfiles())

  const {token} = getState().userToken

  return fetch(`${api}/user/insurance-get-notVerified`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({
      authToken: token ? token : cookie.load('token')
    })
  })
    .then(response => response.json())
    .then(json => {
      const list = (json.data || [])
        .map(item => {
          const date = moment(item.updateTs)
          const link = `/userReports/pendingInsurance/${item.user}/${item.id}`
          const waitingStatus = item.isVerified === false ? ' / Жду ответа' : null

          return {
            ...item,
            link,
            waitingStatus,
            updateTs: date.valueOf(),
            timePassed: date.fromNow()
          }
        })
        .sort((a, b) => a.updateTs > b.updateTs)

      dispatch(receivePendingInsuranceProfiles(list))
    })
    .catch(console.error)

}

export const requestPendingInsuranceProfile = () => ({
  type: REQUEST_PENDING_INSURANCE_PROFILE
})

export const receivePendingInsuranceProfile = payload => ({
  type: RECEIVE_PENDING_INSURANCE_PROFILE,
  payload
})

const formatProfileFields = (fields) => {
  if (!fields)
    return null

  // Чтобы отрезать всякий мусор, приходящий от бека
  // TODO: Проследить, чтобы он таки не приходил вообще
  const whiteList = [
    // Main
    'firstName', 'lastName', 'gender', 'birthday', 'photo',
    // Contact
    'phone', 'email',
    // Location
    'country', 'city', 'timezone',
    // Hero program
    'babyBirthday', 'lastBabyFeedMonth',
    // Body params
    'height', 'weight', 'injuries', 'diseases', 'squatsCount', 'squatsVideo'
  ]
  const datesKeysList = ['birthday', 'babyBirthday']

  return whiteList.reduce((filteredFields, key) => {
    const value = fields[key]
    const isDate = ~datesKeysList.indexOf(key)

    filteredFields[key] = isDate ? moment(value).format('YYYY-MM-DD') : value

    return filteredFields
  }, {})
}

export const fetchPendingInsuranceProfile = (userId) => (dispatch, getState) => {
  dispatch(requestPendingInsuranceProfile())

  const {token} = getState().userToken

  return fetch(`${api}/user/user-get-infologs`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({
      authToken: token ? token : cookie.load('token'),
      data: {userId}
    })
  })
    .then(response => response.json())
    .then(json => {
      let [current, previous] = json.data

      dispatch(receivePendingInsuranceProfile({
        current: formatProfileFields(current),
        previous: formatProfileFields(previous)
      }))
    })
    .catch(console.error)
}

const switchProfileInsuranceVerification = isVerified => id => (dispatch, getState) => {
  const {token} = getState().userToken

  return fetch(`${api}/user/insurance-set-verified`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({
      authToken: token ? token : cookie.load('token'),
      data: {id, isVerified}
    })
  })
    .then(response => response.json())
    .catch(console.error)
}

export const rejectInsuranceProfile = switchProfileInsuranceVerification(false)
export const approveInsuranceProfile = switchProfileInsuranceVerification(true)
