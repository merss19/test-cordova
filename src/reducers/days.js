import {
  SELECT_DAYS, INVALIDATE_DAYS,
  REQUEST_DAYS, RECEIVE_DAYS
} from '../actions'

export const hidePoll = (state = false, action) => {
  switch (action.type) {
    case 'HIDE_POLL':
      return action.hideCreatePoll
    default:
      return state
  }
}

export const editDay = (state = {}, action) => {
  switch (action.type) {
    case 'EDIT_DAY':
      return {
        data: action.json
      }
    default:
      return state
  }
}

export const selectedDays = (state = 'reactjs', action) => {
  switch (action.type) {
    case SELECT_DAYS:
      return action.json
    default:
      return state
  }
}

const days = (state = {
  isFetching: false,
  didInvalidate: false,
  days: {}
}, action) => {
  switch (action.type) {
    case INVALIDATE_DAYS:
      return {
        ...state,
        didInvalidate: true
      }
    case REQUEST_DAYS:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case RECEIVE_DAYS:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        days: action.json
      }
    default:
      return state
  }
}

export const recivedDays = (state = {}, action) => {
  switch (action.type) {
    case INVALIDATE_DAYS:
    case RECEIVE_DAYS:
    case REQUEST_DAYS:
      return {
        ...state,
        [action.days]: days(state[action.days], action)
      }
    default:
      return state
  }
}
