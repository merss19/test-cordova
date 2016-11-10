import {
  SELECT_TASKDAY, INVALIDATE_TASKDAY,
  REQUEST_TASKDAY, RECEIVE_TASKDAY
} from '../actions'

export const selectedTaskDay = (state = 'reactjs', action) => {
  switch (action.type) {
    case SELECT_TASKDAY:
      return action.taskDay
    default:
      return state
  }
}

const taskDay = (state = {
  isFetching: false,
  didInvalidate: false,
  taskDay: {}
}, action) => {
  switch (action.type) {
    case INVALIDATE_TASKDAY:
      return {
        ...state,
        didInvalidate: true
      }
    case REQUEST_TASKDAY:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case RECEIVE_TASKDAY:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        taskDay: action.json,
        lastUpdated: action.receivedAt
      }
    default:
      return state
  }
}

export const recivedTaskDay = (state = { }, action) => {
  switch (action.type) {
    case INVALIDATE_TASKDAY:
    case RECEIVE_TASKDAY:
    case REQUEST_TASKDAY:
      return {
        ...state,
        [action.taskDay]: taskDay(state[action.taskDay], action)
      }
    default:
      return state
  }
}