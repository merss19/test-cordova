import React from 'react'
import { Route, IndexRoute, browserHistory } from 'react-router'
import { api } from './config'

import App from './components/App'
import ProfileCreate from './containers/ProfileCreate'
import ProfileSignup from './containers/ProfileSignup'
import PartnerLogin from './containers/PartnerLogin'
import PartnerDataShow from './containers/PartnerDataShow'
import ProfilePasswordForget from './containers/ProfilePasswordForget'
import ProfilePasswordRestore from './containers/ProfilePasswordRestore'
import ProfilePay from './containers/ProfilePay'
import LoginSocial from './components/profile/LoginSocial'
import SuccessProfile from './components/profile/SuccessProfile'
import DayEditor from './components/admin/DayEditor'
import AdminLogin from './containers/AdminLogin'

// import TodayTask from './containers/TodayTask'
// import Reports from './containers/Reports'
// import Faq from './components/Faq'
// import Food from './components/food/MainComponent'
// import Photos from './containers/Photos'

import cookie from 'react-cookie'
import { promoWatch } from './actions/promo/promoWatch'

const getToken = () => {
  if (cookie.load('token')) {
    browserHistory.push('/signup/pay/success')
  }
}

const getRole = role => {
  return fetch(`${api}/user/user-get`, {
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
        if (role === 3 && !json.data[0].paidPackage) {
          browserHistory.push('/')
        }
      }
    })
}

const requirePayAuth = () => {
  return fetch(`${api}/user/user-get`, {
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
      if (!json || json.errorCode !== 1 || !json.data || !json.data[0] || json.data[0].role !== 3) {
        if (json.data[0].paidPackage) {
          browserHistory.push('/signup/pay/success')
        }
      }
    })
}

const requireAuth = () => getRole(3)
const requireAdminAuth = () => getRole(1)

export default (
  <Route path='/' onEnter={promoWatch}>
    <IndexRoute component={App} onEnter={getToken} />
    {/* <Route path='task' component={TodayTask} onEnter={requireAuth} />
    <Route path='faq' component={Faq} onEnter={requireAuth} />
    <Route path='food' component={Food} onEnter={requireAuth} />
    <Route path='reports' component={Reports} onEnter={requireAuth} />
    <Route path='photos' component={Photos} /> */}
    <Route path='profile'>
      <IndexRoute component={App} onEnter={getToken}/>
      <Route path='create' component={ProfileCreate} onEnter={requireAuth} />
    </Route>
    <Route path='social/:type' component={LoginSocial} />
    <Route path='signup'>
      <IndexRoute component={ProfileSignup} onEnter={getToken} />
      <Route path='pay' component={ProfilePay} onEnter={requirePayAuth} />
      <Route path='pay/success' component={SuccessProfile} onEnter={requireAuth} />
    </Route>
    <Route path='signup/:program' component={ProfileSignup} onEnter={getToken} />
    <Route path='restore'>
      <IndexRoute component={ProfilePasswordForget} onEnter={getToken} />
      <Route path='create' component={ProfilePasswordRestore} onEnter={getToken} />
    </Route>
    <Route path='partner'>
      <IndexRoute component={PartnerLogin} onEnter={getToken} />
      <Route path='show' component={PartnerDataShow} onEnter={requireAdminAuth}/>
    </Route>
    {/* <Route path='superadmin'>
      <IndexRoute component={AdminLogin} />
      <Route path='day' component={DayEditor} />
    </Route> */}
  </Route>
)
