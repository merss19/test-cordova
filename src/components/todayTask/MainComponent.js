import React, { Component, PropTypes } from 'react'
import Chat from '../../stories/chat/Chat'
import Poll from '../../stories/poll/Poll'
import Header from '../../stories/Header'
import CalendarList from './CalendarList'
import TaskIntro from './TaskIntro'
import Menu from './Menu'
import Exercises from './Exercises'
import Modal from 'boron/DropModal'
import SendReportModal from './SendReportModal'
import { connect } from 'react-redux'
import { SubmissionError } from 'redux-form'
import cookie from 'react-cookie';

import { action } from '@kadira/storybook'

class MainComponent extends Component {
  render() {
    const contentStyle = {
      borderRadius: '18px',
      padding: '30px'
    }

    const { taskDay, token } = this.props

    console.log('<=======*==0')
    console.log(taskDay)
    console.log(token)

    return (
      <div className="layout">
        <Header closeMobMenu={() => {

        }}/>
        <div className="layout__inner">
          <div className="grid">
            <div className="1/4--desk grid__cell layout__menu">
              <div className="grid layout__menu-inner">
                <Menu/>
                <CalendarList calendar={[{
                    number: '1',
                    icon: 'ico-done',
                    status: 'done',
                    date: '12/12/17',
                    admin: 'Миньон',
                    completeText: 'Зачет принят',
                    day: 'Пн'
                  }, {
                    number: '2',
                    status: 'waiting',
                    date: '12/12/17',
                    admin: 'Миньон',
                    completeText: 'Зачет принимается',
                    day: 'Вт'
                  }, {
                    number: '3',
                    icon: 'ico-cross',
                    status: 'missed',
                    date: '12/12/17',
                    admin: 'Миньон',
                    completeText: 'Зачет не сдан',
                    day: 'Ср'
                }]}/>
              </div>
            </div>
            <div className="3/4--desk 1/1--pocket grid__cell layout__content">
              <TaskIntro/>
              <Exercises sendReport={() => {
                this.refs.sendReportModal.show()
              }}/>

              <Modal ref='sendReportModal' modalStyle={contentStyle}>
                <SendReportModal onSubmit={(data) => {
                  return fetch('http://sport.muhanov.net/api/user/userTask-create', {
                      headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                      },
                      method: 'POST',
                      body: JSON.stringify({
                        authToken: token ? token : cookie.load('token'),
                        data: {
                          ...data,
                          health: 'good',
                          day: taskDay.id,//day
                          user: '23',//user
                          status: 'waiting',
                          admin: 1,//admin
                          adminAnswer: '',//admin
                        }
                      })
                    })
                    .then(response => response.json())
                    .then(json => {
                      console.log('<=--------=--------')
                      console.log(json.data)
                      if (json.data) {
                        console.log('success')
                      } else {
                        throw new SubmissionError({ password: '', _error: 'Отчет заполнен не верно, попробуйте снова' })
                      }
                    })
                }}/>
              </Modal>


              <Poll fields={this.props.taskDay.task.poll.fields}>
                {this.props.taskDay.task.poll.description}
              </Poll>

              <h2 className="h1">Чаты</h2>
              <Chat>Test</Chat>
            </div>
          </div>
        </div>

        <ul className="menu-mob-bottom">
          <li className="menu-mob-bottom__item menu-mob-bottom__item--active">
            <a href="#" className="menu-mob-bottom__item-inner">
              <span className="menu-mob-bottom__ico">
                <svg className="svg-icon ico-m-tasks">
                  <use xlinkHref="#ico-m-tasks"></use>
                </svg>
              </span>
              <span className="menu-mob-bottom__title">Задания</span>
            </a>
          </li>
          <li className="menu-mob-bottom__item">
            <a href="#" className="menu-mob-bottom__item-inner">
              <span className="menu-mob-bottom__ico">
                <svg className="svg-icon ico-m-book">
                  <use xlinkHref="#ico-m-book"></use>
                </svg>
              </span>
              <span className="menu-mob-bottom__title">Зачетка</span>
            </a>
          </li>
          <li className="menu-mob-bottom__item">
            <a href="#" className="menu-mob-bottom__item-inner">
              <span className="menu-mob-bottom__ico">
                <svg className="svg-icon ico-m-food">
                  <use xlinkHref="#ico-m-food"></use>
                </svg>
              </span>
              <span className="menu-mob-bottom__title">Питание</span>
            </a>
          </li>
          <li className="menu-mob-bottom__item">
            <a href="#" className="menu-mob-bottom__item-inner">
              <span className="menu-mob-bottom__ico">
                <svg className="svg-icon ico-m-faq">
                  <use xlinkHref="#ico-m-faq"></use>
                </svg>
              </span>
              <span className="menu-mob-bottom__title">ЧАВО</span>
            </a>
          </li>
        </ul>

        <div className="menu-mob-left">
          <div className="menu-mob-left__inner">
            <div className="menu-mob-left__ico-close">
              <svg className="svg-icon ico-close">
                <use xlinkHref="#ico-close"></use>
              </svg>
            </div>
            <div className="menu-mob-left__logo">
              <svg className="svg-icon ys_logo_web">
                <use xlinkHref="#ys_logo_web"></use>
              </svg>
            </div>
            <ul className="main-nav">
              <li className="main-nav__item main-nav__item--active">
                <a href="#" className="main-nav__item-inner">
                  <svg className="svg-icon ico-m-tasks">
                    <use xlinkHref="#ico-m-tasks"></use>
                  </svg>
                  <span className="main-nav__title">Задания</span>
                </a>
              </li>
              <li className="main-nav__item">
                <a href="#" className="main-nav__item-inner">
                  <svg className="svg-icon ico-m-book">
                    <use xlinkHref="#ico-m-book"></use>
                  </svg>
                  <span className="main-nav__title">Зачетка</span>
                </a>
              </li>
              <li className="main-nav__item">
                <a href="#" className="main-nav__item-inner">
                  <svg className="svg-icon ico-m-food">
                    <use xlinkHref="#ico-m-food"></use>
                  </svg>
                  <span className="main-nav__title">Питание</span>
                </a>
              </li>
              <li className="main-nav__item">
                <a href="#" className="main-nav__item-inner">
                  <svg className="svg-icon ico-m-faq">
                    <use xlinkHref="#ico-m-faq"></use>
                  </svg>
                  <span className="main-nav__title">ЧАВО</span>
                </a>
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
            <ul className="banner-ls banner-ls--menu-mob-left">
              <li className="banner-ls__item">
                <a href="#">
                  <div className="banner-ls__img">
                    <img src="tmp/banner-2.png" alt=""/>
                  </div>
                  <p className="banner-ls__desc">В твой выходной день только сегодня TezTour дарит -10% на тур</p>
                </a>
              </li>
              <li className="banner-ls__item">
                <a href="#">
                  <div className="banner-ls__img">
                    <img src="tmp/banner-1.png" alt=""/>
                  </div>
                </a>
              </li>
            </ul>
            <hr/>
            <div className="btn btn--action">Выйти из кабинета</div>
          </div>
        </div>

        <div id="fill-report-2">
          <div className="base-popup__msg">
            <h3 className="h1">Отчет миньону отправлен успешно!</h3>
            <hr/>
            <div className="base-popup__msg-content">
              <p className="base-parag">Молодец! Так держать! Нам нравится твой подход к тренировкам. Не сдавайся, и ты скоро ты увидишь ошеломляющий  результат.</p>
            </div>
            <div className="btn btn--primary js-fill-report-3">Зачетна книжка</div>
          </div>
        </div>

        <div id="fill-report-3">
          <div className="base-popup__msg">
            <h3 className="h1">Это твоя зачетная книжка.</h3>
            <hr/>
            <div className="base-popup__msg-content">
              <p className="base-parag">Здесь ты будешь сдавать тренерам “проверяющим” отчеты о своих выполненных заданиях. Они тебе будут задавать наводящие вопросы, для того, чтобы проверить тебя. Мы ведь обещали, что спуску не дадим! Пиши отчет по каждому выполненному заданию и двигайся вперед к финальным задачам! Удачи!</p>
            </div>
            <div className="btn btn--primary">Отлилчно!</div>
          </div>
        </div>

      </div>
  )}
}

const mapStateToProps = state => ({ todayTask: state.todayTask })

MainComponent= connect(
  mapStateToProps
)(MainComponent)

export default MainComponent
