import {
  SELECT_FOOD, INVALIDATE_FOOD,
  REQUEST_FOOD, RECEIVE_FOOD
} from '../actions'

import moment from 'moment'

export const foodProgram = (state = '', action) => {
  switch (action.type) {
    case 'FOOD_PROGRAM':
      return action.program
    default:
      return state
  }
}

export const foodDescription = (state = '', action) => {
  switch (action.type) {
    case 'FOOD_DESCRIPTION':
      return action.description
    default:
      return state
  }
}

export const selectedFood = (state = 'reactjs', action) => {
  switch (action.type) {
    case SELECT_FOOD:
      return action.json
    default:
      return state
  }
}

const food = (state = {
  isFetching: false,
  didInvalidate: false,
  food: []
}, action) => {
  switch (action.type) {
    case INVALIDATE_FOOD:
      return {
        ...state,
        didInvalidate: true
      }
    case REQUEST_FOOD:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case RECEIVE_FOOD:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        food: action.json.data
      }
    default:
      return state
  }
}

export const recivedFood = (state = {}, action) => {
  switch (action.type) {
    case INVALIDATE_FOOD:
    case RECEIVE_FOOD:
    case REQUEST_FOOD:
      return {
        ...state,
        [action.food]: food(state[action.food], action)
      }
    default:
      return state
  }
}
