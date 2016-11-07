import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

import React from 'react'
import { render } from 'react-dom'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, Link, IndexLink, browserHistory } from 'react-router'
import { ReduxRouter, reduxReactRouter } from 'redux-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import { reducer as reduxFormReducer } from 'redux-form'

import createHistory from 'history/lib/createBrowserHistory';
import * as reducers from './reducers'
import routes from './routes';

const store = createStore(combineReducers({
  ...reducers,
  form: reduxFormReducer,
  routing: routerReducer
}))

const history = syncHistoryWithStore(browserHistory, store)

render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>,
  document.getElementById('root')
)
