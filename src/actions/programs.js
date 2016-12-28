import cookie from 'react-cookie'
import { api } from '../config.js'

export const RECEIVE_PROGRAMS = 'RECEIVE_PROGRAMS'
export const SELECT_PROGRAMS = 'SELECT_PROGRAMS'

export const selectPrograms = profileData => ({
  type: SELECT_PROGRAMS,
  profileData
})

export const receivePrograms = (programs, json) => {
  return ({
    type: RECEIVE_PROGRAMS,
    programs,
    json
  })
}

const fetchPrograms = partialState => dispatch => {
  const { programs } = partialState

  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }

  const method = 'POST'

  return fetch(`${api}/day/program-get`, {
      headers,
      method,
      body: '{}'
    })
  .then(response => response.json())
  .then(json => {
    dispatch(receivePrograms(programs, json))
  })
}

const shouldFetchPrograms = (state, programs) => {
  const progrs = state.programs

  if (!progrs || !progrs[0])
    return true

  return progrs.didInvalidate
}

export const fetchProgramsIfNeeded = programs => (dispatch, getState) => {
  if (shouldFetchPrograms(getState(), programs)) {
    return dispatch(fetchPrograms({ token: getState().userToken.token, programs}))
  }
}
