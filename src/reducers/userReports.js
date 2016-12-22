import {
  REQUEST_PENDING_PROFILE, RECEIVE_PENDING_PROFILE,
  REQUEST_PENDING_PROFILES, RECEIVE_PENDING_PROFILES,
} from '../actions'

export const pendingProfile = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_PENDING_PROFILE:
      return {
        isFetching: true
      }
    case RECEIVE_PENDING_PROFILE:
      return {
        isFetching: false,
        ...action.payload
      }
    default:
      return state
  }
}

export const pendingProfiles = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_PENDING_PROFILES:
      return {
        isFetching: true
      }
    case RECEIVE_PENDING_PROFILES:
      return {
        isFetching: false,
        list: action.payload
      }
    default:
      return state
  }
}
