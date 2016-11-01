import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Navbar, Jumbotron, Button } from 'react-bootstrap';
import request from 'request';

class App extends Component {
  render() {
    request.post({
      url: 'http://sport.muhanov.net/api/day/Day-get',
      json: { id: 1 },
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }, function (err, response, resultBody) {
      console.log(resultBody);
    });
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
