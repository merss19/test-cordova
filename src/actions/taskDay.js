import cookie from 'react-cookie'
import { api } from '../config.js'
import moment from 'moment'
import { browserHistory } from 'react-router'

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
  console.log('<<<')
  console.log(json)
  return ({
    type: RECEIVE_TASKDAY,
    taskDay,
    json,
    receivedAt: Date.now()
  })
}

export const fetchTaskDay = partialState => dispatch => {
  const { token, taskDay, profile, selectedDayDate, selectedDayId } = partialState
  dispatch(requestTaskDay(taskDay))
  const authToken = token ? token : cookie.load('token')
  if (authToken) {
    let payload = {
      authToken,
      data: {
        program: cookie.load('userProgram') ? cookie.load('userProgram') : 1,
      }
    }

    if (selectedDayId) {
      payload.data.id = selectedDayId
    } else {
      payload.data.date = selectedDayDate ? selectedDayDate : moment().format('YYYY-MM-DD')
    }



    let data = new FormData()
    data.append("json", JSON.stringify(payload))
    return fetch(`${api}/data/userday-get-info`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(payload)
    })
    .then(response => response.json())
    .then(json => {
	    console.log('json')
	    console.log(json)
	    dispatch(receiveTaskDay(taskDay, json))

    })
  } else {
    cookie.remove('token', { path: '/' })
    cookie.remove('txId', { path: '/' })
    cookie.remove('role', { path: '/' })
    cookie.remove('program', { path: '/' })
    cookie.remove('packageType', { path: '/' })
    cookie.remove('promoName', { path: '/' })
    cookie.remove('share', { path: '/' })
    cookie.remove('general', { path: '/' })
    browserHistory.push('/')
  }
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
	console.log('taskDay-action')
	console.log(taskDay)
  if (shouldFetchTaskDay(getState(), taskDay)) {
    return dispatch(fetchTaskDay({
      token: getState().userToken.token,
      taskDay,
      selectedDayDate: getState().selectedDayDate,
      selectedDayId: getState().selectedDayId
    }))
  }
}

export function taskDone(payload) {

  return (dispatch) => {
	fetch(`${api}/user/userTask-setState`, {
		  headers: {
			  'Accept': 'application/json',
			  'Content-Type': 'application/json'
		  },
		  method: 'POST',
		  body: JSON.stringify(payload)
	  })
			  .then(response => response.json())
			  .then(json => {

			  })


  }

}


