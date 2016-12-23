import React from 'react'
import MenuButton from '../../stories/MenuButton'
import { browserHistory } from 'react-router'

const Menu = () => (
  <div className="2/3 grid__cell">
    <ul className="main-nav">
      <li className="main-nav__item">
        <MenuButton onClick={() => {
          browserHistory.push('/superadmin/day/1/')
        }} icon="ico-m-book">#Я ГЕРОЙ</MenuButton>
      </li>
      <li className="main-nav__item">
        <MenuButton onClick={() => {
          browserHistory.push('/superadmin/day/2/')
        }} icon="ico-m-book">#МАМА МОЖЕТ</MenuButton>
      </li>
      <li className="main-nav__item">
        <MenuButton onClick={() => {
          browserHistory.push('/superadmin/day/3/')
        }} icon="ico-m-book">#ЭКСТРЕМАЛЬНАЯ СУШКА</MenuButton>
      </li>
      <li className="main-nav__item">
        <MenuButton onClick={() => {
          browserHistory.push('/superadmin/day/4/')
        }} icon="ico-m-book">#Я ЗАВТРА</MenuButton>
      </li>
    </ul>
    {/* <hr/>
    <div className="profile">
      <Link to="/profile/create">
        <p className="profile__name">Анна Иванова</p>
        <p className="profile__sub-text">Профиль</p>
      </Link>
    </div>
    <hr/> */}
  </div>
)

export default Menu
