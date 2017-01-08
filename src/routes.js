import React from 'react'
import { Route, IndexRoute, browserHistory } from 'react-router'
import { api } from './config'

import App from './components/App'
// import ProfileCreate from './containers/ProfileCreate'
import ProfileSignup from './containers/ProfileSignup'
import PartnerLogin from './containers/PartnerLogin'
import PartnerDataShow from './containers/PartnerDataShow'
import ProfilePasswordForget from './containers/ProfilePasswordForget'
import ProfilePasswordRestore from './containers/ProfilePasswordRestore'
import ProfilePay from './containers/ProfilePay'
import LoginSocial from './components/profile/LoginSocial'
import SignupSocial from './components/profile/SignupSocial'
import LoginFB from './components/profile/LoginFB'
import SuccessProfile from './components/profile/SuccessProfile'
import DayEditor from './components/admin/DayEditor'
import AdminLogin from './containers/AdminLogin'

// Minion containers

import MinionLogin from './containers/MinionLogin'

import PendingMinionChats from './containers/pendingMinionChats'

import PendingPhoto from './containers/PendingPhoto'
import PendingPhotos from './containers/PendingPhotos'

import PendingProfile from './containers/PendingProfile'
import PendingProfiles from './containers/PendingProfiles'

import PendingInsuranceProfile from './containers/PendingInsuranceProfile'
import PendingInsuranceProfiles from './containers/PendingInsuranceProfiles'

// import TodayTask from './containers/TodayTask'
// import Reports from './containers/Reports'
// import Faq from './components/Faq'
// import Food from './components/food/MainComponent'
// import Photos from './containers/Photos'

import cookie from 'react-cookie'
import { promoWatch } from './actions/promo/promoWatch'

const getToken = () => {
  if (cookie.load('token') && !cookie.load('role'))
    browserHistory.push('/signup/pay/success')
}

const getRole = role => {
  return fetch(`${api}/user/user-get`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({
      authToken: cookie.load('token'),
      data: {}
    })
  })
  .then(response => response.json())
  .then(json => {
    const isRegistered = !(!json || json.errorCode !== 1 || !json.data || !json.data[0] || json.data[0].role !== role)

    if (isRegistered) {
      cookie.save('user_id', json.data[0].id, { path: '/' }) // id текущего пользователя необходим для чатов

      if (role === 3 && !json.data[0].paidPackage)
        browserHistory.push('/signup/pay')
    } else {
      browserHistory.push(role === 2 ? '/userReports' : '/')
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
      authToken: cookie.load('token'),
      data: {}
    })
  })
  .then(response => response.json())
  .then(json => {
    if (json && json.errorCode === 1 && json.data && json.data[0]) {
      if (json.data[0].paidPackage && json.data[0].role === 3) {
        browserHistory.push('/signup/pay/success')
      } else {
        browserHistory.push('/signup/pay/')
      }
    }
  })
}

const requireAuth = () => getRole(3)
const requireMinionAuth = () => getRole(2)
const requireAdminAuth = () => getRole(1)

export default (
  <Route path='/' onEnter={promoWatch}>
    <IndexRoute component={App} onEnter={getToken} />
    {/* <Route path='task' component={TodayTask} onEnter={requireAuth} />
    <Route path='faq' component={Faq} onEnter={requireAuth} />
    <Route path='food' component={Food} onEnter={requireAuth} />
    <Route path='reports' component={Reports} onEnter={requireAuth} />
    <Route path='photos' component={Photos} /> */}
    {/* <Route path='profile'>
      <IndexRoute component={App} onEnter={getToken}/>
      <Route path='create' component={ProfileCreate} onEnter={requireAuth} />
    </Route> */}
    <Route path='social/vk' component={LoginSocial} />
    <Route path='social/fb' component={LoginFB} />
    {/* <Route path='social/vk/second' component={SignupSocial} /> */}
    <Route path='signup'>
      <IndexRoute component={ProfileSignup} onEnter={requirePayAuth} />
      <Route path='pay' component={ProfilePay} onEnter={requirePayAuth} />
      <Route path='pay/success' component={SuccessProfile} onEnter={requireAuth} />
    </Route>
    <Route path='signup/:program' component={ProfileSignup} onEnter={requirePayAuth} />
    <Route path='restore'>
      <IndexRoute component={ProfilePasswordForget} onEnter={requirePayAuth} />
      <Route path='create' component={ProfilePasswordRestore} onEnter={requirePayAuth} />
    </Route>
    <Route path='partner'>
      <IndexRoute component={PartnerLogin} />
      <Route path='show' component={PartnerDataShow} onEnter={requireAdminAuth} />
    </Route>
    <Route path='userReports'>
      <IndexRoute
        component={MinionLogin}
        onEnter={requireMinionAuth} />

      <Route
        path='chats'
        component={PendingMinionChats}
        onEnter={requireMinionAuth} />

      <Route
        path='pendingProfiles'
        component={PendingProfiles}
        onEnter={requireMinionAuth} />
      <Route
        path='pendingProfiles/:userId'
        component={PendingProfile}
        onEnter={requireMinionAuth} />

      <Route
        path='photos'
        component={PendingPhotos}
        onEnter={requireMinionAuth} />
      <Route
        path='photos/:userId'
        component={PendingPhoto}
        onEnter={requireMinionAuth} />

      <Route
        path='pendingInsurance'
        component={PendingInsuranceProfiles}
        onEnter={requireMinionAuth} />
      <Route
        path='pendingInsurance/:userId/:insuranceId'
        component={PendingInsuranceProfile}
        onEnter={requireMinionAuth} />
    </Route>

    {/* <Route path='superadmin'>
      <IndexRoute component={AdminLogin} />
      <Route path='day' component={DayEditor} />
      <Route path='day/:program' component={DayEditor} />
      <Route path='day/:program/:id' component={DayEditor} />
    </Route> */}
  </Route>
)
