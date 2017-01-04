import cookie from 'react-cookie'
import { api } from '../config.js'
import moment from 'moment'

export const REQUEST_FOOD = 'REQUEST_FOOD'
export const RECEIVE_FOOD = 'RECEIVE_FOOD'
export const SELECT_FOOD = 'SELECT_FOOD'
export const INVALIDATE_FOOD = 'INVALIDATE_FOOD'

export const selectFood = food => ({
  type: SELECT_FOOD,
  food
})

export const invalidateFood = food => ({
  type: INVALIDATE_FOOD,
  food
})

export const requestFood = food => ({
  type: REQUEST_FOOD,
  food
})

export const receiveFood = (food, json) => {
  return ({
    type: RECEIVE_FOOD,
    food,
    json
  })
}

const fetchFood = partialState => dispatch => {
  const { token, food, date, program } = partialState
  dispatch(requestFood(food))
  let payload = {
    authToken: token ? token : cookie.load('token'),
  }

  if (program)
    payload.data = { program }

  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }

  const method = 'POST'
  return fetch(`${api}/day/food-get`, {
    headers,
    method,
    body: JSON.stringify(payload)
  })
  .then(response => response.json())
  .then(json => {
    console.log('<======>===0')
    console.log(json)
    return dispatch(receiveFood(food, json))
  })
}

const shouldFetchFood = (state, food) => {
  const f = state.food

  if (!f)
    return true

  if (f.isFetching)
    return false

  return f.didInvalidate
}

export const fetchFoodIfNeeded = food => (dispatch, getState) => {
  if (shouldFetchFood(getState(), food)) {
    return dispatch(fetchFood({
      token: getState().userToken.token,
      food
    }))
  }
}

export const fetchFoodProgramIfNeeded = food => (dispatch, getState) => {
  if (shouldFetchFood(getState(), food)) {
    return dispatch(fetchFood({
      token: getState().userToken.token,
      food,
      program: 1
    }))
  }
}
