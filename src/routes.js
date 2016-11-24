import React from 'react';
import { Route, IndexRoute, browserHistory } from 'react-router'

import App from './components/App'
import TodayTask from './containers/TodayTask'
import Reports from './containers/Reports'
import ProfileCreate from './containers/ProfileCreate'
import ProfileSignup from './containers/ProfileSignup'
import ProfilePay from './containers/ProfilePay'
import Faq from './components/Faq'
import Food from './components/food/MainComponent'
import cookie from 'react-cookie'

const requireAuth = () => {
  if (!cookie.load('token')) {
    browserHistory.push('/')
  }
}

export default (
  <Route path='/'>
    <IndexRoute component={App} />
    <Route path='task' component={TodayTask} onEnter={requireAuth}/>
    <Route path='faq' component={Faq} onEnter={requireAuth}/>
    <Route path='food' component={Food} onEnter={requireAuth}/>
    <Route path='reports' component={Reports} onEnter={requireAuth}/>
    <Route path='profile'>
      <IndexRoute component={App} />
      <Route path='create' component={ProfileCreate} onEnter={requireAuth}/>
    </Route>
    <Route path='signup'>
      <IndexRoute component={ProfileSignup} />
      <Route path='pay' component={ProfilePay} />
      <Route path='pay/:status' component={ProfilePay} />
    </Route>
    <Route path='signup/:program' component={ProfileSignup} />
  </Route>
);
