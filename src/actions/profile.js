import cookie from 'react-cookie'
import { api } from '../config.js'

export const REQUEST_PROFILE = 'REQUEST_PROFILE'
export const RECEIVE_PROFILE = 'RECEIVE_PROFILE'
export const SELECT_PROFILE = 'SELECT_PROFILE'
export const INVALIDATE_PROFILE = 'INVALIDATE_PROFILE'

export const selectProfile = profileData => ({
  type: SELECT_PROFILE,
  profileData
})

export const invalidateProfile = profileData => ({
  type: INVALIDATE_PROFILE,
  profileData
})

export const requestProfile = profileData => ({
  type: REQUEST_PROFILE,
  profileData
})

export const receiveProfile = (profileData, json) => {
  return ({
    type: RECEIVE_PROFILE,
    profileData,
    json
  })
}

const fetchProfile = partialState => dispatch => {
  const { token, profileData } = partialState
  dispatch(requestProfile(profileData))
  const payload = {
    authToken: token ? token : cookie.load('token'),
    data: {}
  }

  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }

  const method = 'POST'

  return fetch(`${api}/user/user-get`, {
    headers,
    method,
    body: JSON.stringify(payload)
  })
  .then(response => response.json())
  .then(json => dispatch(receiveProfile(profileData, json)))
}

const shouldFetchProfile = (state, profileData) => {
  const prof = state.profileData

  if (!prof)
    return true

  if (prof.isFetching)
    return false

  return prof.didInvalidate
}

export const fetchProfileIfNeeded = profileData => (dispatch, getState) => {
  if (shouldFetchProfile(getState(), profileData)) {
    return dispatch(fetchProfile({ token: getState().userToken.token, profileData}))
  }
}
