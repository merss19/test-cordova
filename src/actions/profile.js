import cookie from 'react-cookie'

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
  console.log('^================0')
  console.log(json)
  return ({
    type: RECEIVE_PROFILE,
    profileData,
    json,
    receivedAt: Date.now()
  })
}

const fetchProfile = partialState => dispatch => {
  const { token, profileData } = partialState
  dispatch(requestProfile(profileData))
  const payload = {
    authToken: token ? token : cookie.load('token'),
    data: {}
  }

  console.log(payload)

  let data = new FormData()
  data.append("json", JSON.stringify(payload))

  return fetch('http://sport.muhanov.net/api/user/user-get', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
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
