import React, { Component, PropTypes } from 'react'
import TaskButton from '../../stories/TaskButton'
import Welcome from '../../stories/Welcome'
import ExerciseTitle from '../../stories/task/ExerciseTitle'
import TaskTitle from '../../stories/task/TaskTitle'
import Calendar from '../../stories/task/Calendar'
import Profile from '../../stories/Profile'
import TextDarkBlue from '../../stories/TextDarkBlue'
import TextExercise from '../../stories/task/TextExercise'
import ChatTab from '../../stories/chat/ChatTab'
import Chat from '../../stories/chat/Chat'
import CalendarDayModal from '../../stories/task/CalendarDayModal'
import CalendarFinal from '../../stories/task/CalendarFinal'
import TasksAccordion from '../../stories/TasksAccordion'
import ModalReport from '../../stories/task/ModalReport'
import TasksAccordionHeader from '../../stories/TasksAccordionHeader'
import TasksAccordionContent from '../../stories/TasksAccordionContent'
import ButtonPoll from '../../stories/poll/ButtonPoll'
import ButtonPollSend from '../../stories/poll/ButtonPollSend'
import TextPoll from '../../stories/poll/TextPoll'
import Poll from '../../stories/poll/Poll'
import Header from '../../stories/Header'
import RemainTimeTitle from '../../stories/task/RemainTimeTitle'
import ExerciseHeader from '../../stories/task/ExerciseHeader'
import ExerciseHowTitle from '../../stories/task/ExerciseHowTitle'
import CalendarList from './CalendarList'
import TaskIntro from './TaskIntro'
import Menu from './Menu'
import Exercises from './Exercises'
import SendReportModal from './SendReportModal'
import Modal from 'boron/DropModal'
import { connect } from 'react-redux'

import { action } from '@kadira/storybook'

class MainComponent extends Component {
  render() {
    return (
      <div className="layout">
        {console.log('<=======*==0')}
        {console.log(this.props.taskDay)}

        <Header/>
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
              <TaskIntro>Test</TaskIntro>
              <Exercises sendReport={() => {
                this.refs.sendReportModal.show()
              }}/>

              <Modal ref='sendReportModal'>
                <div className='base-popup tingle-modal-box__content tingle-modal-box'>
                  <h3 className="h1">Отчет миньону</h3>
                  <hr/>
                  <p className="sub-title">Напиши сообщение миньону о том, что тренировка отработана! Если ты и правда все сделал :)</p>
                  <div className="input input--box fill-report--input-info">
                    <input className="input__field" type="text" placeholder="Выполнено, сделал, справился..."/>
                  </div>
                  <p className="text-center">Как ты себя чувствовал во время выполнения заданий?</p>
                  <ul className="your-condition">
                    <li className="your-condition__item your-condition__item--active">
                      <span className="your-condition__ico">
                        <svg className="svg-icon ico-your-condition-1">
                          <use xlinkHref="#ico-your-condition-1"></use>
                        </svg>
                      </span>
                      <p className="your-condition__title">отлично</p>
                    </li>
                    <li className="your-condition__item">
                      <span className="your-condition__ico">
                        <svg className="svg-icon ico-your-condition-2">
                          <use xlinkHref="#ico-your-condition-2"></use>
                        </svg>
                      </span>
                      <p className="your-condition__title">так себе</p>
                    </li>
                    <li className="your-condition__item">
                      <span className="your-condition__ico">
                        <svg className="svg-icon ico-your-condition-3">
                          <use xlinkHref="#ico-your-condition-3"></use>
                        </svg>
                      </span>
                      <p className="your-condition__title">не очень</p>
                    </li>
                  </ul>

                  <p className="text-center mb30">Прикрепите файл или вставьте ссылку с видео выполнения заданий</p>

                  <div className="fill-report__video-report">
                    <div className="input input--box input--btn">
                      <input type="text" className="input__field" placeholder="http://youtube.com"/>
                      <div className="btn btn--secondary">Прикрепить файл</div>
                    </div>
                  </div>

                  <hr/>

                  <div className="text-center">
                    <div className="btn btn--primary js-fill-report-2">Отправить отчет</div>
                  </div>
                </div>
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
