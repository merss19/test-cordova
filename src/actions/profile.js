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
  let profile = {
    profileData,
    receivedAt: Date.now()
  }

  json.map(j => {
    console.log(j)
    if (j && j.data && j.data.length > 0) {
      switch (true) {
        case !!j.data[0].email:
          profile = { ...profile, profile: j.data[0] }
          break
        case !!j.data[0].chest:
          profile = { ...profile, bodyParams: j.data }
          break
        case !!j.data[0].passport:
          profile = { ...profile, insurance: j.data }
          break
      }
    }
  })

  return ({
    type: RECEIVE_PROFILE,
    ...profile
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
  const urls = [
    'http://sport.muhanov.net/api/user/user-get',
    'http://sport.muhanov.net/api/user/bodyMeasure-get',
    'http://sport.muhanov.net/api/user/insurance-get'
  ]

  return Promise.all(urls.map(url =>
    fetch(url, {
      headers,
      method,
      body: JSON.stringify(payload)
    }).then(response => response.json())
  )).then(json => dispatch(receiveProfile(profileData, json)))
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
