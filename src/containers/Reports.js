import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { browserHistory } from 'react-router'
import {
  selectReports,
  invalidateReports,
  fetchReportsIfNeeded,
  fetchTaskDayIfNeeded
} from '../actions'

import { fetchChat, createWithMessage, PRIVATE_CHAT_ID } from '../actions'

import LoadingView from '../components/componentKit/LoadingView'
import Menu from '../components/todayTask/Menu'
import CalendarList from '../components/todayTask/CalendarList'
import Header from '../stories/Header'

class Reports extends Component {
  componentDidMount() {
    const { fetchReportsIfNeeded, selectedReports ,fetchTaskDayIfNeeded, selectedTaskDay} = this.props

    fetchReportsIfNeeded(selectedReports)
	 fetchTaskDayIfNeeded('reactjs')
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedReports !== this.props.selectedReports) {
      const { fetchReportsIfNeeded, selectedReports } = nextProps
      fetchReportsIfNeeded(selectedReports)
    }
  }
//<LoadingView title="Ничего не найдено" taskBack={true}/>

  render() {
    const { reports, isFetching ,taskDay } = this.props

    const isEmpty = !reports || reports.length === 0 && !taskDay|| !taskDay.data || taskDay.data.length === 0

	let calendar = [],
	    id ,
	    role


	  if(!isEmpty){
		  calendar = taskDay.data[0].calendar
		  id = taskDay.data[0].id
		  role = taskDay.data[0].user.role

	  }

    return (
      <div className={isEmpty ? 'entry__inner' : 'layout'}>
        <Header/>
        {isEmpty
          ? (isFetching ? <LoadingView title="Загружается..."/> : <LoadingView title="Загружается..."/>)
          : <div className="layout__inner">
              <div className="grid">
                <div className="1/4--desk grid__cell layout__menu">
                  <div className="grid layout__menu-inner">
                    <Menu/>
	                  <CalendarList
		                  calendar={calendar}
		                  dayId={id} role={role}
		                  privateChatId={PRIVATE_CHAT_ID}
	                  />

                  </div>
                </div>

                <div className="3/4--desk 1/1--pocket grid__cell layout__content">

                  <div className="stage-box stage-box--no-padding">

                    <h1 className="h1">Отчеты за все дни</h1>

                    <ul className="accordion accordion--reports">
                      {reports.map((report, index) => {
                        let health, status, accordionState
                        const adminName = report.userInfo.firstName + ' ' + report.userInfo.lastName

                        switch (report.health) {
                          case 'good':
                            health = 'Отлично'
                            break
                          case 'middle':
                            health = 'Так себе'
                            break
                          case 'bad':
                            health = 'Не очень'
                            break
                          default:
                            health = 'Так себе'
                        }

                        switch (report.status) {
                          case 'done':
                            status = 'Зачет'
                            accordionState = 'accordion__state--done'
                            break
                          case 'missed':
                            status = 'Не сдан'
                            accordionState = 'accordion__state--cross'
                            break
                          case 'waitingadmin':
                          case 'waiting':
                            status = 'Проверка'
                            accordionState = 'accordion__state--waiting'
                            break
                          default:
                            health = 'Так себе'
                        }

                        return (
                          <li key={index} className="accordion__item">
                            <div className="accordion__header">
                              <div className={`accordion__state ${accordionState}`}>{status}</div>
                              <div className="accordion__date">{moment(report.date).format('YYYY-MM-DD')}</div>
                              <div className="accordion__name">{adminName}</div>
                              {/* <div className="accordion__qty-msg">
                                <svg className="svg-icon ico-msg">
                                  <use xlinkHref="#ico-msg"></use>
                                </svg>
                                <span className="num">5</span>
                              </div> */}
                              <div className="accordion__btn">
                                <div className="accordion__btn-title">свернуть</div>
                                <svg className="svg-icon ico-arrow-accordion">
                                  <use xlinkHref="#ico-arrow-accordion"></use>
                                </svg>
                              </div>
                            </div>
                            <div className="accordion__content">
                              <ul className="chat-content">
                                {report.adminAnswer &&
                                  <li className="chat-msg chat-msg--someone">
                                    {/* <div className="chat-msg__ava">
                                      <img src={report.userInfo.photo} alt=""/>
                                    </div> */}
                                    <div className="chat-msg__content" style={{ margin: '0px 50px' }}>
                                      <p className="chat-msg__name">{adminName}</p>
                                      <div className="chat-msg__text">{report.adminAnswer}</div>
                                    </div>
                                  </li>
                                }
                                <li className="chat-msg chat-msg--you chat-msg--system">
                                  <div className="chat-msg__content" style={{ margin: '0px 50px' }}>
                                    <div className="chat-msg__text">{`${report.report} Состояние: ${health}`}</div>
                                  </div>
                                  {/* <div className="chat-msg__ava">
                                    <img src="/tmp/ava-you.png" alt=""/>
                                  </div> */}
                                </li>
                                <br/>
                              </ul>
                            </div>
                          </li>
                        )
                      }
                    )}
                    </ul>

                  </div>

                </div>
              </div>
            </div>
          }
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
                () => browserHistory.push('/food')
              }>
                <span className="menu-mob-bottom__ico">
                  <svg className="svg-icon ico-m-food">
                    <use xlinkHref="#ico-m-food"></use>
                  </svg>
                </span>
                <span className="menu-mob-bottom__title">Питание</span>
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
                  <span className="main-nav__title">Вопросы/Ответы</span>
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
                    <img src="/tmp/banner-2.png" alt=""/>
                  </div>
                  <p className="banner-ls__desc">В твой выходной день только сегодня TezTour дарит -10% на тур</p>
                </a>
              </li>
              <li className="banner-ls__item">
                <a href="#">
                  <div className="banner-ls__img">
                    <img src="/tmp/banner-1.png" alt=""/>
                  </div>
                </a>
              </li>
            </ul>
            <hr/>
            <div className="btn btn--action">Выйти из кабинета</div>
          </div>
        </div>

      </div>
    )
  }
}

const mapStateToProps = state => {

  const { selectedReports, recivedReports, selectedTaskDay, recivedTaskDay } = state

  const {
    isFetching,
    lastUpdated,
    reports
  } = recivedReports[selectedReports] || {
    isFetching: true,
    reports: []
  },
  {taskDay} = recivedTaskDay[selectedTaskDay] || {
	  isFetching: true,
	  taskDay: {}
  }

  return {
    taskDay,
    recivedTaskDay,
    selectedReports,
    isFetching,
    reports
  }
}

Reports = connect(
  mapStateToProps,
  {
    selectReports,
    invalidateReports,
    fetchReportsIfNeeded,
    fetchTaskDayIfNeeded
  }
)(Reports)

export default Reports
