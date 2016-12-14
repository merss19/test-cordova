import cookie from 'react-cookie'
import { api } from '../config.js'

export const REQUEST_DAYS = 'REQUEST_DAYS'
export const RECEIVE_DAYS = 'RECEIVE_DAYS'
export const SELECT_DAYS = 'SELECT_DAYS'
export const INVALIDATE_DAYS = 'INVALIDATE_DAYS'

export const selectDays = days => ({
  type: SELECT_DAYS,
  days
})

export const invalidateDays = days => ({
  type: INVALIDATE_DAYS,
  days
})

export const requestDays = days => ({
  type: REQUEST_DAYS,
  days
})

export const receiveDays = (days, json) => {
  json = [{
      id: '1',
      number: '1',
      customIcon: 'some-icon',
      customName: 'GoodDay',
      icon: 'ico-done',
      status: 'done',
      date: '12/12/17',
      admin: 'Миньон',
      completeText: 'Зачет принят',
      day: 'Пн',
      tasks: [
        {
          name: "Good",
          description: "Good zer good",
          exercises: [
            {
              count: 10,
              description: "No",
              video: "http://youtube.com"
            }
          ]
        }
      ],
    }, {
      id: '2',
      number: '2',
      customIcon: '',
      customName: '',
      status: 'waiting',
      date: '12/12/17',
      admin: 'Миньон',
      completeText: 'Зачет принимается',
      day: 'Вт'
    }, {
      id: '3',
      number: '3',
      customIcon: '',
      customName: '',
      icon: 'ico-cross',
      status: 'missed',
      date: '12/12/17',
      admin: 'Миньон',
      completeText: 'Зачет не сдан',
      day: 'Ср'
  }]
  return ({
    type: RECEIVE_DAYS,
    days,
    json
  })
}

const fetchDays = partialState => dispatch => {
  const { token, days } = partialState
  dispatch(requestDays(days))
  const payload = {
    authToken: token ? token : cookie.load('token'),
    data: {}
  }

  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }

  const method = 'POST'

  return fetch(`${api}/day/days-get`, {
    headers,
    method,
    body: JSON.stringify(payload)
  })
  .then(response => response.json())
  .then(json => {
    return dispatch(receiveDays(days, json))
  })
}

const shouldFetchDays = (state, days) => {
  const d = state.days

  if (!d)
    return true

  if (d.isFetching)
    return false

  return d.didInvalidate
}

export const fetchDaysIfNeeded = days => (dispatch, getState) => {
  if (shouldFetchDays(getState(), days)) {
    return dispatch(fetchDays({ token: getState().userToken.token, days}))
  }
}
