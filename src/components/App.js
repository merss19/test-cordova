import React, { Component } from 'react';
import './App.css';

import TodayTask from '../components/TodayTask';
import CreateProfile from '../containers/CreateProfile'

const App = () => (
  <div>
    <CreateProfile />
    {/* <TodayTask>{this.state.user}</TodayTask> */}
  </div>
);

export default App;
