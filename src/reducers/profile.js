import moment from 'moment'

import {
  SELECT_PROFILE, INVALIDATE_PROFILE,
  REQUEST_PROFILE, RECEIVE_PROFILE
} from '../actions'

const bodyParam = (state, action) => {
  switch (action.type) {
    case 'ADD_BODY_PARAM':
      return {
        date: moment().format('YYYY-DD-MM, hh:mm:ss'),
        weight: action.weight,
        chest: action.chest,
        waist: action.waist,
        hip: action.hip,
        hipGirth: action.hipGirth
      }
    default:
      return state
  }
}

export const bodyParams = (state = [], action) => {
  switch (action.type) {
    case 'ADD_BODY_PARAM':
      return [
        ...state,
        bodyParam(undefined, action)
      ]
    default:
      return state
  }
}

export function profile(state = 'DO_NOT_CREATE', action) {
  switch (action.type) {
    case 'CREATE_PROFILE':
      return {
        text: action.text,
      }
    case 'SIGNUP':
      return {
        program: action.program,
        amount: action.amount,
        packageType: action.packageType
      }
    default:
      return state
  }
}

export const selectedProfile = (state = 'reactjs', action) => {
  switch (action.type) {
    case SELECT_PROFILE:
      return action.profileData
    default:
      return state
  }
}

const profileData = (state = {
  isFetching: false,
  didInvalidate: false,
  profileData: {}
}, action) => {
  switch (action.type) {
    case INVALIDATE_PROFILE:
      return {
        ...state,
        didInvalidate: true
      }
    case REQUEST_PROFILE:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case RECEIVE_PROFILE:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        profileData: action.json,
        lastUpdated: action.receivedAt
      }
    default:
      return state
  }
}

export const recivedProfile = (state = {}, action) => {
  switch (action.type) {
    case INVALIDATE_PROFILE:
    case RECEIVE_PROFILE:
    case REQUEST_PROFILE:
      return {
        ...state,
        [action.profileData]: profileData(state[action.profileData], action)
      }
    default:
      return state
  }
}
