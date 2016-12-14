import React from 'react'
import cookie from 'react-cookie'
import { browserHistory } from 'react-router'

const LoadingView = ({title, logout}) => (
  <div className="layout layout--login">
    <div className="entry entry--sign-in">
      <div className="entry__inner">
        <div className="entry__box">
          <h2>{title}</h2>
          {logout &&
            <div>
              <br/>
              <button className="btn btn--action" onClick={e => {
                e.preventDefault()
                cookie.remove('token', { path: '/' })
                cookie.remove('txId', { path: '/' })
                cookie.remove('role', { path: '/' })
                browserHistory.push('/')
              }}>
                Выйти
              </button>
            </div>
          }
        </div>
      </div>
    </div>
  </div>
)

export default LoadingView
