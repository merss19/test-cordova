import React from 'react'
import { browserHistory } from 'react-router'
import cookie from 'react-cookie'

const Header = props => (
  <div className="header">
    <div className="grid header__inner">
      {props.burger
        ? <div className="1/4--portable grid__cell header__burger">
            <span className="header__ico-burger">
              <svg className="svg-icon ico-burger">
                <use xlinkHref="#ico-burger" />
              </svg>
            </span>
          </div>
        : <div className="1/4--portable grid__cell header__burger"/>
      }

      {!window.mobilecheck() &&
        <h1 className="2/4--portable 1/2-desk grid__cell header__logo">
          Ясегодня
          <img src="/assets/img/ys_logo.svg" alt="Ясегодня"/>
        </h1>
      }

      {window.mobilecheck() &&
        props.isReadyToTasks &&
          props.isProfile &&
            <div className="gender">
              <div className="1/4--portable grid__cell"/>
              <div className="1/4--portable grid__cell"/>
              <h1 className="2/4--portable 1/2-desk grid__cell header__logo">
                Ясегодня
                <img src="/assets/img/ys_logo.svg" alt="Ясегодня"/>
              </h1>
              <div className="1/4--portable grid__cell"/>
              <div className="1/4--portable grid__cell"/>
              <div className="1/4--portable grid__cell header__right-side">
                <button className="btn btn--primary" style={{
                  backgroundColor: '#1F447B',
                  // margin: '7px 120px',
                  width: '70px',
                  height: '40px',
                  fontSize: '9px',
                  padding: '10px',
                }} onClick={e => {
                  e.preventDefault()
                  browserHistory.push('/task')
                }}>
                  К заданиям
                </button>
              </div>
            </div>
      }

      <div className="1/4--portable grid__cell header__right-side"/>
      <div className="1/4--portable grid__cell"/>
      <div className="1/4--portable grid__cell"/>
      <div className="1/4--portable grid__cell"/>

      {props.alpha &&
        <div className="1/4--portable grid__cell header__right-side">
          <div className="header__banner">
            <a href="#" className="header__banner-link">
              <img src="/tmp/banner-1.png" alt=""/>
            </a>
          </div>
        </div>
      }

      {!window.mobilecheck() &&
        <div className="1/4--portable grid__cell" style={props.isReadyToTasks && props.isProfile ? { width: '2000px' } : {}}>
          {props.isReadyToTasks &&
            props.isProfile &&(
              <button className="btn btn--primary" style={{ backgroundColor: '#1F447B' }} onClick={e => {
                e.preventDefault()
                browserHistory.push('/task')
              }}>
                К заданиям
              </button>
            )
          }
          <div className="divider" />
          <button className="btn btn--action" style={props.isTask ? {marginLeft: '77px'} : {}} onClick={e => {
            e.preventDefault()
            cookie.remove('token', { path: '/' })
            cookie.remove('txId', { path: '/' })
            cookie.remove('role', { path: '/' })
            cookie.remove('program', { path: '/' })
            cookie.remove('packageType', { path: '/' })
            cookie.remove('promoName', { path: '/' })
            cookie.remove('share', { path: '/' })
            cookie.remove('general', { path: '/' })
            cookie.remove('userProgram', { path: '/' })
            browserHistory.push('/')
          }}>
            Выйти
          </button>
        </div>
      }

    </div>
  </div>
)

export default Header;
