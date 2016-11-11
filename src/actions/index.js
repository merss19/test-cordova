import cookie from 'react-cookie';

export const REQUEST_TASKDAY = 'REQUEST_TASKDAY'
export const RECEIVE_TASKDAY = 'RECEIVE_TASKDAY'
export const SELECT_TASKDAY = 'SELECT_TASKDAY'
export const INVALIDATE_TASKDAY = 'INVALIDATE_TASKDAY'
export const CREATE_PROFILE     = 'CREATE_PROFILE'
export const SET_TOKEN          = 'SET_TOKEN'

export const createProfile = text => ({
  type: 'CREATE_PROFILE',
  text
})

export const setToken = token => ({
  type: 'SET_TOKEN',
  token
})

export const selectTaskDay = taskDay => ({
  type: SELECT_TASKDAY,
  taskDay
})

export const invalidateTaskDay = taskDay => ({
  type: INVALIDATE_TASKDAY,
  taskDay
})

export const requestTaskDay = taskDay => ({
  type: REQUEST_TASKDAY,
  taskDay
})

export const receiveTaskDay = (taskDay, json) => {
  console.log('^================0')
  console.log(json)
  return ({
    type: RECEIVE_TASKDAY,
    taskDay,
    json,
    receivedAt: Date.now()
  })
}

const fetchTaskDay = partialState => dispatch => {
  dispatch(requestTaskDay(taskDay))
  const { token, taskDay } = partialState;
  const payload = { authToken: token ? token : cookie.load('token') }

  let data = new FormData()
  data.append( "json", JSON.stringify( payload ) )

  return fetch('http://sport.muhanov.net/api/data/day-get-info', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify( payload )
    })
    .then(response => response.json())
    .then(json => dispatch(receiveTaskDay(taskDay, json)))
}

const shouldFetchTaskDay = (state, taskDay) => {
  const td = state.taskDay

  if (!td)
    return true

  if (td.isFetching)
    return false

  return td.didInvalidate
}

export const fetchTaskDayIfNeeded = taskDay => (dispatch, getState) => {
  if (shouldFetchTaskDay(getState(), taskDay)) {
    return dispatch(fetchTaskDay({ token: getState().userToken.token, taskDay}))
  }
}
