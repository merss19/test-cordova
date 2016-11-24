import React from 'react'

const Header = () => (
  <div className="header">
    <div className="grid header__inner">
      <div className="1/4--portable grid__cell header__burger">
        <span className="header__ico-burger">
          <svg className="svg-icon ico-burger">
            <use xlinkHref="#ico-burger" />
          </svg>
        </span>
      </div>
      <h1 className="2/4--portable 1/2-desk grid__cell header__logo">
        Ясегодня
        <img src="/assets/img/ys_logo.svg" alt="Ясегодня"/>
      </h1>
      <div className="1/4--portable grid__cell header__right-side">
        <div className="header__banner">
          <a href="#" className="header__banner-link">
            <img src="/tmp/banner-1.png" alt=""/>
          </a>
        </div>
      </div>
    </div>
  </div>
)

export default Header;
