import React, { PropTypes } from 'react'
import MenuButton from '../../stories/MenuButton'

const Menu = () => (
  <div className="2/3 grid__cell">
    <ul className="main-nav">
      <li className="main-nav__item main-nav__item--active">
        <MenuButton href="/index.html" icon="ico-m-tasks">Задания</MenuButton>
      </li>
      <li className="main-nav__item">
        <MenuButton href="/reports.html" icon="ico-m-book">Зачетка</MenuButton>
      </li>
      <li className="main-nav__item">
        <MenuButton href="/food.html" icon="ico-m-food">Питание</MenuButton>
      </li>
      <li className="main-nav__item">
        <MenuButton href="/faq.html" icon="ico-m-faq">ЧАВО</MenuButton>
      </li>
    </ul>
    <hr/>
    <div className="profile">
      <a href="#">
        <p className="profile__name">Анна Иванова</p>
        <p className="profile__sub-text">Профиль</p>
      </a>
    </div>
    <hr/>
    <ul className="banner-ls">
      <li className="banner-ls__item">
        <a href="#">
          <div className="banner-ls__img">
            <img src="tmp/banner-2.png" alt=""/>
          </div>
          <p className="banner-ls__desc">В твой выходной день только сегодня TezTour дарит -10% на тур</p>
        </a>
      </li>
    </ul>
  </div>
)

export default Menu
