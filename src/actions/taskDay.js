import cookie from 'react-cookie'
import { api } from '../config.js'

export const REQUEST_TASKDAY = 'REQUEST_TASKDAY'
export const RECEIVE_TASKDAY = 'RECEIVE_TASKDAY'
export const SELECT_TASKDAY = 'SELECT_TASKDAY'
export const INVALIDATE_TASKDAY = 'INVALIDATE_TASKDAY'

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
  return ({
    type: RECEIVE_TASKDAY,
    taskDay,
    json,
    receivedAt: Date.now()
  })
}

const fetchTaskDay = partialState => dispatch => {
  const { token, taskDay } = partialState
  dispatch(requestTaskDay(taskDay))
  const payload = { authToken: token ? token : cookie.load('token') }

  let data = new FormData()
  data.append("json", JSON.stringify(payload))

  return fetch(`${api}/data/day-get-info`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(payload)
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
