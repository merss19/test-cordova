import {
  SELECT_PROFILE, INVALIDATE_PROFILE,
  REQUEST_PROFILE, RECEIVE_PROFILE
} from '../actions'

const bodyParam = (state, action) => {
  switch (action.type) {
    case 'ADD_BODY_PARAM':
      return {
        date: action.date,
        weight: action.weight,
        chest: action.chest,
        waist: action.waist,
        hips: action.hips,
        thigh: action.thigh
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
    case 'SAVE_BODY_PARAMS':
      return action.bodyMeasure
    default:
      return state
  }
}

export function profile(state = {}, action) {
  switch (action.type) {
    // case 'CREATE_PROFILE':
    //   return {
    //     program: action.program,
    //     amount: action.amount,
    //     packageType: action.packageType
    //   }
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
        profileData: action.profile,
        insurance: action.insurance,
        bodyParams: action.bodyParams,
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
