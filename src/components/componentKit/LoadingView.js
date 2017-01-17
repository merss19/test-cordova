import React from 'react'
import cookie from 'react-cookie'
import { browserHistory } from 'react-router'

const LoadingView = ({title, logout, toSignup, taskBack}) => (
  <div className="layout layout--login">
    <div className="entry entry--sign-in">
      <div className="entry__inner">
        <div className="entry__box">
          <h2>{title}</h2>
          {logout &&
            <div>
              <br/>
              <div className="btn btn--action" onClick={e => {
                cookie.remove('token', { path: '/' })
                cookie.remove('txId', { path: '/' })
                cookie.remove('role', { path: '/' })
                cookie.remove('program', { path: '/' })
                cookie.remove('packageType', { path: '/' })
                cookie.remove('promoName', { path: '/' })
                cookie.remove('share', { path: '/' })
                cookie.remove('general', { path: '/' })
                if (toSignup) {
                  browserHistory.push('/signup')
                } else {
                  browserHistory.push('/')
                }
              }}>
                Продолжить
              </div>
            </div>
          }
          {taskBack &&
            <div>
              <br/>
              <div className="btn btn--action" onClick={e => {
                browserHistory.push('/task')
              }}>
                К заданиям
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  </div>
)

export default LoadingView
