import React from 'react';
import { Route, IndexRoute, browserHistory } from 'react-router'

import App from './components/App'
import TodayTask from './containers/TodayTask'
import Reports from './containers/Reports'
import ProfileCreate from './containers/ProfileCreate'
import ProfileSignup from './containers/ProfileSignup'
import PartnerLogin from './containers/PartnerLogin'
import PartnerDataShow from './containers/PartnerDataShow'
import ProfilePasswordForget from './containers/ProfilePasswordForget'
import ProfilePasswordRestore from './containers/ProfilePasswordRestore'
import ProfilePay from './containers/ProfilePay'
import LoginSocial from './components/profile/LoginSocial'
import Faq from './components/Faq'
import Food from './components/food/MainComponent'
import cookie from 'react-cookie'
import { promoWatch } from './actions/promo/promoWatch'


const getRole = role => {
  return fetch('http://sport.muhanov.net/api/user/user-get', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        authToken: cookie.load('token'), data: {}
      })
    })
    .then(response => response.json())
    .then(json => {
      if (!json || json.errorCode !== 1 || !json.data || !json.data[0] || json.data[0].role !== role) {
        browserHistory.push('/')
      }
    })
}

const requireAuth = () => getRole(3)

const requireAdminAuth = () => getRole(1)

export default (
  <Route path='/' onEnter={promoWatch}>
    <IndexRoute component={App} />
    {/* <Route path='task' component={TodayTask} onEnter={requireAuth} />
    <Route path='faq' component={Faq} onEnter={requireAuth} />
    <Route path='food' component={Food} onEnter={requireAuth} />
    <Route path='reports' component={Reports} onEnter={requireAuth} /> */}
    <Route path='profile'>
      <IndexRoute component={App} />
      <Route path='create' component={ProfileCreate} onEnter={requireAuth} />
    </Route>
    <Route path='signup'>
      <IndexRoute component={ProfileSignup} />
      <Route path='pay' component={ProfilePay} />
      <Route path='pay/:status' component={ProfilePay} />
    </Route>
    <Route path='signup/social/:type' component={LoginSocial} />
    <Route path='signup/:program' component={ProfileSignup} />
    <Route path='restore'>
      <IndexRoute component={ProfilePasswordForget} />
      <Route path='create' component={ProfilePasswordRestore} />
    </Route>
    <Route path='partner'>
      <IndexRoute component={PartnerLogin} />
      <Route path='show' component={PartnerDataShow} onEnter={requireAdminAuth}/>
    </Route>
  </Route>
);
