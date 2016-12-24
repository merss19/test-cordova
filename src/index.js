import 'babel-polyfill'
import 'whatwg-fetch'

import React from 'react'
import { render } from 'react-dom'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import { reducer as reduxFormReducer } from 'redux-form'
import thunk from 'redux-thunk'
import promise from 'redux-promise'

import * as reducers from './reducers'
import routes from './routes'
import createLogger from 'redux-logger'

const middleware = [ thunk, promise ]
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger())
}

const store = createStore(combineReducers({
  ...reducers,
  form: reduxFormReducer,
  routing: routerReducer,
}), applyMiddleware(...middleware))

const history = syncHistoryWithStore(browserHistory, store)

render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>,
  document.getElementById('root')
)
