import React from 'react';
import { Route, IndexRoute } from 'react-router'

import App from './components/App'
import TodayTask from './components/todayTask/TodayTask'
import ProfileCreate from './containers/ProfileCreate'

export default (
  <Route path='/'>
    <IndexRoute component={App} />
    <Route path='task' component={TodayTask} />
    <Route path='profile'>
      <IndexRoute component={App} />
      <Route path='create' component={ProfileCreate} />
    </Route>
  </Route>
);
