import React from 'react';
import { Route, IndexRoute } from 'react-router'

import App from './components/App'
import TodayTask from './containers/TodayTask'
import ProfileCreate from './containers/ProfileCreate'
import ProfileSignup from './containers/ProfileSignup'
import ProfilePay from './containers/ProfilePay'

export default (
  <Route path='/'>
    <IndexRoute component={App} />
    <Route path='task' component={TodayTask} />
    <Route path='profile'>
      <IndexRoute component={App} />
      <Route path='create' component={ProfileCreate} />
    </Route>
    <Route path='signup'>
      <IndexRoute component={ProfileSignup} />
      <Route path='pay' component={ProfilePay} />
      <Route path='pay/:status' component={ProfilePay} />
    </Route>
    <Route path='signup/:program' component={ProfileSignup} />
  </Route>
);
