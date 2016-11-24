import 'babel-polyfill'
import 'whatwg-fetch'

import React from 'react'
import { render } from 'react-dom'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, Link, IndexLink, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import { reducer as reduxFormReducer } from 'redux-form'
import thunk from 'redux-thunk'

import createHistory from 'history/lib/createBrowserHistory'
import * as reducers from './reducers'
import routes from './routes'

const middleware = [ thunk ]
// if (process.env.NODE_ENV !== 'production') {
//   middleware.push(createLogger())
// }

const store = createStore(combineReducers({
  ...reducers,
  form: reduxFormReducer,
  routing: routerReducer
}), applyMiddleware(...middleware))

const history = syncHistoryWithStore(browserHistory, store)

render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>,
  document.getElementById('root')
)
