import cookie from 'react-cookie'
import { api } from '../config.js'
import moment from 'moment'

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

const exampleJson = [{
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
    day: 'Вт',
    tasks: []
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
    day: 'Ср',
    tasks: [{
      name: "Bad",
      description: "Good zer good",
      exercises: []
    }]
}]

export const receiveDay = (days, id) => {
  return ({
    type: 'EDIT_DAY',
    days,
    json: {
      tasks: exampleJson[id].tasks,
      customName: exampleJson[id].customName,
      customIcon: exampleJson[id].customIcon,
    }
  }
)}

export const load = data => ({ type: 'LOAD', data })

export const receiveDays = (days, json) => {
  return ({
    type: RECEIVE_DAYS,
    days,
    json
  })
}

const fetchDays = partialState => dispatch => {
  const { token, days, date } = partialState
  dispatch(requestDays(days))
  const payload = {
    authToken: token ? token : cookie.load('token'),
    data: {
      date: date ? moment(date).format('YYYY-MM-DD') : moment().format('YYYY-MM-DD')
    }
  }

  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }

  const method = 'POST'
  return fetch(`${api}/data/adminday-get-info`, {
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
    return dispatch(fetchDays({
      token: getState().userToken.token,
      days,
      date: getState().dayDate}))
  }
}
