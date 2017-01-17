import React, {Component} from 'react'

export default class Chat extends Component {
  render() {
    return (
      <ul className="chat__tabs">
        <li className="chat__tab chat__tab--disabled">
          <span className="chat__tab-title">Общий</span>
          <span className="chat__tab-msg"></span>
        </li>
        <li className="chat__tab chat__tab--active">
          <span className="chat__tab-title">С тренером</span>
          <span className="chat__tab-msg"></span>
        </li>
      </ul>
    )
  }
}
