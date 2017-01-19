import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import Menu from '../todayTask/Menu'
import CalendarList from '../todayTask/CalendarList'
import Header from '../../stories/Header'
import Chat from '../../stories/chat/Chat'
import TaskIntro from '../todayTask/TaskIntro'
import cookie from 'react-cookie'
import ScrollToTop from 'react-scroll-up'
import { fetchChat, createWithMessage, PRIVATE_CHAT_ID } from '../../actions'

const scrollUpStyle = {
  zIndex: 2000,
  position: 'fixed',
  fontSize: 16,
  bottom: 60,
  left: 30,
  cursor: 'pointer',
  transitionDuration: '0.2s',
  transitionTimingFunction: 'linear',
  transitionDelay: '0s'
}


class MainComponent extends Component {
  render() {
    const { food, taskDay } = this.props
    const { calendar, id, user: { role } } = taskDay

    const introJSON = food && food.content ? JSON.parse(food.content) : null
    return (
      <div className="layout">
        <Header/>
        <div className="layout__inner">
          <div className="grid">
            <div className="1/4--desk grid__cell layout__menu">
              <div className="grid layout__menu-inner">
                <Menu fullName={cookie.load('fullName')}/>
                <CalendarList
					calendar={calendar}
					dayId={id} role={role}
					privateChatId={PRIVATE_CHAT_ID}
				/>

              </div>
            </div>
            <div className="3/4--desk 1/1--pocket grid__cell layout__content">

              <TaskIntro json={introJSON} />

              {/* {food.chat && food.chat[0] &&
                <Chat chat={food.chat} userId={1} />
              } */}

              <ScrollToTop style={scrollUpStyle} showUnder={160}>
                <div className="btn-go-back">
                  <svg className="svg-icon ico-arrow-up">
                    <use xlinkHref="#ico-arrow-up"></use>
                  </svg>
                </div>
              </ScrollToTop>

            </div>
          </div>
        </div>

        <ul className="menu-mob-bottom">
          <li className="menu-mob-bottom__item">
            <a href="#" className="menu-mob-bottom__item-inner" onClick={
              () => browserHistory.push('/task')
            }>
              <span className="menu-mob-bottom__ico">
                <svg className="svg-icon ico-m-tasks">
                  <use xlinkHref="#ico-m-tasks"></use>
                </svg>
              </span>
              <span className="menu-mob-bottom__title">Задания</span>
            </a>
          </li>
          <li className="menu-mob-bottom__item">
            <a href="#" className="menu-mob-bottom__item-inner" onClick={
              () => browserHistory.push('/reports')
            }>
              <span className="menu-mob-bottom__ico">
                <svg className="svg-icon ico-m-book">
                  <use xlinkHref="#ico-m-book"></use>
                </svg>
              </span>
              <span className="menu-mob-bottom__title">Зачетка</span>
            </a>
          </li>
          <li className="menu-mob-bottom__item">
            <a href="#" className="menu-mob-bottom__item-inner" onClick={
              () => browserHistory.push('/faq')
            }>
              <span className="menu-mob-bottom__ico">
                <svg className="svg-icon ico-m-faq">
                  <use xlinkHref="#ico-m-faq"></use>
                </svg>
              </span>
              <span className="menu-mob-bottom__title">Вопросы/Ответы</span>
            </a>
          </li>
          <li className="menu-mob-bottom__item">
            <a href="#" className="menu-mob-bottom__item-inner" onClick={
              () => browserHistory.push('/profile')
            }>
              <span className="menu-mob-bottom__ico">
                <svg className="svg-icon ico-m-faq">
                  <use xlinkHref="#ico-m-faq"></use>
                </svg>
              </span>
              <span className="menu-mob-bottom__title">Профиль</span>
            </a>
          </li>
          <li className="menu-mob-bottom__item">
            <a href="#" className="menu-mob-bottom__item-inner" onClick={
              () => browserHistory.push('/photos')
            }>
              <span className="menu-mob-bottom__ico">
                <svg className="svg-icon ico-photo">
                  <use xlinkHref="#ico-photo"></use>
                </svg>
              </span>
              <span className="menu-mob-bottom__title">Фото</span>
            </a>
          </li>
        </ul>
      </div>
    )
  }
}

export default MainComponent
