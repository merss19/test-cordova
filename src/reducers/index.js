import { combineReducers } from 'redux'
import profile from './profile'
import { reducer as reduxFormReducer } from 'redux-form'

const iamtodayApp = combineReducers({
  profile,
  form: reduxFormReducer
})

export default iamtodayApp
