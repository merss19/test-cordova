import React from 'react'
import MenuButton from '../../stories/MenuButton'
import { browserHistory } from 'react-router'
import { Link } from 'react-router'

const Menu = ({fullName}) => (
  <div className="2/3 grid__cell">
    <ul className="main-nav">
      <li className="main-nav__item">
        <MenuButton onClick={() => {
          browserHistory.push('/task')
        }} icon="ico-m-tasks">Задания</MenuButton>
      </li>
      {/* <li className="main-nav__item">
        <MenuButton onClick={() => {
          browserHistory.push('/reports')
        }} icon="ico-m-book">Зачетка</MenuButton>
      </li> */}
      <li className="main-nav__item">
        <MenuButton onClick={() => {
          browserHistory.push('/food')
        }} icon="ico-m-food">Питание</MenuButton>
      </li>
      <li className="main-nav__item">
        <MenuButton onClick={() => {
          browserHistory.push('/faq')
        }} icon="ico-m-faq">Вопросы/Ответы</MenuButton>
      </li>
      <li className="main-nav__item">
        <MenuButton onClick={() => {
          browserHistory.push('/photos')
        }} icon="ico-photo">Фото</MenuButton>
      </li>
    </ul>
    <hr/>
    <div className="profile">
      <Link to="/profile">
        <p className="profile__name">{fullName && fullName !== ' undefined' && fullName !== ' ' ? fullName : 'Участник'}</p>
        <p className="profile__sub-text">Профиль</p>
      </Link>
    </div>
    {/* <hr/>
    <ul className="banner-ls">
      <li className="banner-ls__item">
        <a href="#">
          <div className="banner-ls__img">
            <img src="/tmp/banner-2.png" alt=""/>
          </div>
          <p className="banner-ls__desc">В твой выходной день только сегодня TezTour дарит -10% на тур</p>
        </a>
      </li>
    </ul> */}
  </div>
)

export default Menu
