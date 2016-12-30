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
import LoginFB from './components/profile/LoginFB'
import SuccessProfile from './components/profile/SuccessProfile'
import SuccessTomorrowProfile from './components/profile/SuccessTomorrowProfile'
import DayEditor from './components/admin/DayEditor'
import AdminLogin from './containers/AdminLogin'

// Minion containers

import MinionLogin from './containers/MinionLogin'

import PendingProfile from './containers/PendingProfile'
import PendingProfiles from './containers/PendingProfiles'

import PendingInsuranceProfile from './containers/PendingInsuranceProfile'
import PendingInsuranceProfiles from './containers/PendingInsuranceProfiles'

import TodayTask from './containers/TodayTask'
import Reports from './containers/Reports'
import Faq from './components/Faq'
import Food from './components/food/MainComponent'
import Photos from './containers/Photos'

import cookie from 'react-cookie'
import { promoWatch } from './actions/promo/promoWatch'

const getToken = () => {
  if (cookie.load('token') && !cookie.load('role'))
    browserHistory.push('/signup/pay/success')
}

const getRole = role => {
  const token = cookie.load('token')
  return fetch(`${api}/user/user-get`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({
      authToken: token,
      data: {}
    })
  })
  .then(response => response.json())
  .then(json => {
    const isRegistered = !(!json || json.errorCode !== 1 || !json.data || !json.data[0] || json.data[0].role !== role)

    if (isRegistered) {
      if (role === 3 && !json.data[0].paidPackage)
        browserHistory.push('/signup/pay')
    } else {
      browserHistory.push(role === 2 ? '/userReports' : '/')
    }
  })
}

const requirePayAuth = fromPay => {
  const token = cookie.load('token')
  if (token) {
    return fetch(`${api}/user/user-get`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        authToken: token,
        data: {}
      })
    })
    .then(response => response.json())
    .then(json => {
      if (json && json.errorCode === 1 && json.data && json.data[0]) {
        if (json.data[0].paidPackage && json.data[0].program + '' !== '4') {
          browserHistory.push('/signup/pay/success')
        } else {
          browserHistory.push('/signup/pay/')
        }
      } else {
        cookie.remove('token', { path: '/' })
        cookie.remove('txId', { path: '/' })
        cookie.remove('role', { path: '/' })
        cookie.remove('program', { path: '/' })
        cookie.remove('packageType', { path: '/' })
        cookie.remove('promoName', { path: '/' })
        cookie.remove('share', { path: '/' })
        cookie.remove('general', { path: '/' })
        browserHistory.push('/')
      }
    })
  } else if (fromPay) {
    browserHistory.push('/')
  }
}

const requireForTest = () => {
  const token = cookie.load('token')
  return fetch(`${api}/user/user-get`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({
      authToken: token,
      data: {}
    })
  })
  .then(response => response.json())
  .then(json => {
    const isRegistered = json && json.errorCode === 1 && json.data && json.data[0] && json.data[0].role === 2

    if (!isRegistered)
      browserHistory.push('/')
  })
}

const forceTrailingSlash = (nextState, replace) => {
  const path = nextState.location.pathname
  if (path.slice(-1) === '/') {
    replace({
      ...nextState.location,
      pathname: path.slice(0, path.length - 1)
    })
  }

  var url = window.location.toString()
  if (/www.lk/g.test(url)) {
    window.location = url.replace(/www.lk/, 'lk')
  }
}

const forceTrailingSlashOnChange = (prevState, nextState, replace) => {
  forceTrailingSlash(nextState, replace)
}

const requireMinionAuth = () => getRole(2)
const requireAdminAuth = () => getRole(1)
const requireFromPayAuth = () => requirePayAuth(true)
const requireFromLoginAuth = () => requirePayAuth(false)

export default (
    <Route path='/' onEnter={promoWatch}>
      <IndexRoute component={App} onEnter={getToken} />
      <Route onEnter={forceTrailingSlash} onChange={forceTrailingSlashOnChange}>
        <Route path='task' component={TodayTask} onEnter={requireForTest} />
        <Route path='faq' component={Faq} onEnter={requireForTest} />
        <Route path='food' component={Food} onEnter={requireForTest} />
        <Route path='reports' component={Reports} onEnter={requireForTest} />
        <Route path='photos' component={Photos} onEnter={requireForTest} />
        <Route path='profile' component={ProfileCreate} onEnter={requireForTest} />
        <Route path='social/vk' component={LoginSocial} />
        <Route path='social/fb' component={LoginFB} />
        <Route path='signup'>
          <IndexRoute component={ProfileSignup} onEnter={requireFromLoginAuth} />
          <Route path='pay' component={ProfilePay} onEnter={requireFromPayAuth} />
          <Route path='pay/success' component={SuccessProfile} />
          <Route path='pay/success/friend' component={SuccessTomorrowProfile} />
        </Route>
        <Route path='signup/:program' component={ProfileSignup} onEnter={requireFromLoginAuth} />
        <Route path='restore'>
          <IndexRoute component={ProfilePasswordForget} onEnter={requireFromLoginAuth} />
          <Route path='create' component={ProfilePasswordRestore} onEnter={requireFromLoginAuth} />
        </Route>
        <Route path='partner'>
          <IndexRoute component={PartnerLogin} />
          <Route path='show' component={PartnerDataShow} onEnter={requireAdminAuth} />
        </Route>
        <Route path='userReports'>
          <IndexRoute component={MinionLogin} onEnter={requireMinionAuth} />

          <Route path='pendingProfiles' component={PendingProfiles} onEnter={requireMinionAuth} />
          <Route path='pendingProfiles/:userId' component={PendingProfile} onEnter={requireMinionAuth} />

          <Route path='pendingInsurance' component={PendingInsuranceProfiles} onEnter={requireMinionAuth} />
          <Route path='pendingInsurance/:userId/:insuranceId' component={PendingInsuranceProfile} onEnter={requireMinionAuth} />
        </Route>

        {/* <Route path='superadmin'>
          <IndexRoute component={AdminLogin} />
          <Route path='day' component={DayEditor} />
          <Route path='day/:program' component={DayEditor} />
          <Route path='day/:program/:id' component={DayEditor} />
        </Route> */}
      </Route>
    </Route>
)
