import {
  SELECT_PROFILE, INVALIDATE_PROFILE,
  REQUEST_PROFILE, RECEIVE_PROFILE
} from '../actions'

import moment from 'moment'

const bodyParam = (state, action) => {
  switch (action.type) {
    case 'ADD_BODY_PARAM':
      return {
        date: action.date,
        height: action.height,
        weight: action.weight,
        chest: action.chest,
        waist: action.waist,
        hips: action.hips,
        thigh: action.thigh
      }
    case 'REMOVE_BODY_PARAM':
      return action.id
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
    case 'REMOVE_BODY_PARAM':
      return state.filter(param => param.id !== bodyParam(undefined, action))
    case 'SAVE_BODY_PARAMS':
      return action.bodyMeasure
    default:
      return state
  }
}

export function profile(state = {}, action) {
  switch (action.type) {
    case 'SIGNUP':
      return {
        program: action.program,
        promo: action.promo,
        amount: action.amount,
        packageType: action.packageType,
        emailFriend: action.emailFriend,
        phoneFriend: action.phoneFriend,
        nameFriend: action.nameFriend,
        share: action.share
      }
    default:
      return state
  }
}

export const birthday = (state = '', action) => {
  switch (action.type) {
    case 'BIRTHDAY':
      return action.birthday
    default:
      return state
  }
}

export const babyBirthday = (state = moment().format('YYYY-MM-DD'), action) => {
  switch (action.type) {
    case 'BABY_BIRTHDAY':
      return action.babyBirthday
    default:
      return state
  }
}

export const babyFeed = (state = moment().format('YYYY-MM-DD'), action) => {
  switch (action.type) {
    case 'BABY_FEED':
      return action.babyFeed
    default:
      return state
  }
}

export const isReadyToTasks = (state = false, action) => {
  switch (action.type) {
    case 'IS_READY_TO_TASKS':
      return action.isReadyToTasks
    default:
      return state
  }
}

export const isBabyFeeding = (state = false, action) => {
  switch (action.type) {
    case 'IS_BABY_FEEDING':
      return action.isBabyFeeding
    default:
      return state
  }
}

export const injuriesHidden = (state = false, action) => {
  switch (action.type) {
    case 'INJURIES_HIDDEN':
      return action.injuriesHidden
    default:
      return state
  }
}

export const sportsPast = (state = false, action) => {
  switch (action.type) {
    case 'SPORTS_PAST':
      return action.sportsPast
    default:
      return state
  }
}

export const injuries = (state = [], action) => {
  switch (action.type) {
    case 'INJURIES_SET':
      return action.injuries
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
        profileData: action.json.data[0],
        insurance: action.json.data[0].insurance,
        bodyParams: action.json.data[0].bodyMeasures,
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
