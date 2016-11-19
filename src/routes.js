import React from 'react';
import { Route, IndexRoute } from 'react-router'

import App from './components/App'
import TodayTask from './containers/TodayTask'
import Reports from './containers/Reports'
import ProfileCreate from './containers/ProfileCreate'
import ProfileSignup from './containers/ProfileSignup'
import ProfilePay from './containers/ProfilePay'
import Faq from './components/Faq'
import Food from './components/food/MainComponent'
import cookie from 'react-cookie'

const requireAuth = ({nextState, replace}) => {
  if (!cookie.load('token')) {
    replace({
      pathname: '/',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}

export default (
  <Route path='/'>
    <IndexRoute component={App} />
    <Route path='task' component={TodayTask} onEnter={requireAuth}/>
    <Route path='faq' component={Faq} onEnter={requireAuth}/>
    <Route path='food' component={Food} onEnter={requireAuth}/>
    <Route path='reports' component={Reports} onEnter={requireAuth}/>
    <Route path='profile' onEnter={requireAuth}>
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
