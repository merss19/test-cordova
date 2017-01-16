import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import Chat from '../../containers/Chat'
import Poll from '../../stories/poll/Poll'
import Header from '../../stories/Header'
import CalendarList from './CalendarList'
import TaskIntro from './TaskIntro'
import Menu from './Menu'
import Exercises from './Exercises'
import Modal from 'boron/FadeModal'
import SendReportModal, {conditions} from './SendReportModal'
import { connect } from 'react-redux'
import { SubmissionError } from 'redux-form'
import cookie from 'react-cookie'
import { api } from '../../config.js'
import ScrollToTop from 'react-scroll-up'
import { fetchChat, createWithMessage, PRIVATE_CHAT_ID } from '../../actions'

let contentStyle = {
  borderRadius: '18px',
  padding: '30px'
}

const reportStyle = {
  borderRadius: '18px',
  padding: '30px',
}

let modalStyle = {
  // position: 'absolute',
  zIndex: '3000',
  transform: 'translate3d(-50%, -50%, 0px)',
  overflowY: 'auto',
  padding: '0',
	bottom: '0',
	rigth: '0',
  width: '100%',
  maxWidth: '530px',
  minWidth: '300px',
  WebkitOverflowScrolling: 'touch',
  height: '100%',
  top: '50%',
	left: '50%',
}

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

const HEALTH_CONDITIONS = conditions.reduce((all, {filter, title}) => Object.assign(all, {[filter]: title}), {})

class MainComponent extends Component {

	constructor(props) {
		super();
		this.state = {
			statusWaiting: false
		};
		console.log('MainComponent')
		console.log(this.state.statusWaiting)
	}


  componentWillMount() {
    if (window.mobilecheck()) {
      contentStyle.margin = '100px'
      contentStyle.width = '300px'
      delete reportStyle.borderRadius
    }

    if (!window.mobilecheck()) {
      modalStyle = {}
    }
  }

  handleScroll(event) {
    if (event.srcElement.body.scrollTop > 54) {
      document.getElementById('menu').className = 'grid layout__menu-inner is-fixed'
      document.getElementById('menu').style = 'width: 295px'
    } else {
      document.getElementById('menu').className = 'grid layout__menu-inner'
    }
  }

  handleResize(event) {
    const windowWidth = window.innerWidth
    if (windowWidth < 1210 && windowWidth > 1024) {
      const offset = (1210 - windowWidth) * 0.3
      document.getElementById('menu').style = `width: ${295 - offset}px`
    }
  }

  // componentDidMount() {
  //   window.addEventListener('scroll', this.handleScroll)
  //   window.addEventListener("resize", this.handleResize)
  // }
  //
  // componentWillUnmount() {
  //   window.removeEventListener('scroll', this.handleScroll)
  //   window.removeEventListener("resize", this.handleResize)
  // }

  createTask (data) {
	  console.log('createTask')
	  console.log(data)
    const { taskDay, token, createWithMessage, fetchChat } = this.props
    const chatMessage = `Отчёт для тренера:
                         Комментарий: "${data.report}";
                         Видео: ${data.video};
                         Оценка: ${HEALTH_CONDITIONS[data.health]}.`;

    return Promise.all([

      createWithMessage(PRIVATE_CHAT_ID, null, chatMessage),
      fetch(`${api}/user/userDay-create` ,{

        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
          authToken: token ? token : cookie.load('token'),
          data: {
            ...data,
            health: data.health,
            day: taskDay.id,//day
            user: taskDay.user.id,//user
            status: 'waiting',
            admin: taskDay.user.admin,//admin
            adminAnswer: '',//admin
          }
        })
      })
        .then(response => response.json())
        .then(json => {
          console.log('create-task')
          console.log(json)
          this.refs.successModal.show()
          this.refs.sendReportModal.hide()
          if (json.isSuccess) {
	          this.setState({
		          statusWaiting: true
	          })

          } else {
            //throw new SubmissionError({ password: '', _error: 'Отчет заполнен не верно, попробуйте снова' })
          }
        })
    ])
      .then(() => fetchChat(PRIVATE_CHAT_ID))
  }

  render() {
    const { taskDay, token } = this.props
    const { intro, tasks, poll, chat, calendar, id, user: { firstName, lastName, role } } = taskDay
    const introJSON = intro && intro[0] && intro[0].intro ? JSON.parse(intro[0].intro) : null
    const introHTML = intro && intro[0] && intro[0].introHTML ? intro[0].introHTML : ''

    return (
      <div className="layout">
        <Header closeMobMenu={() => {}} isTask={true}/>

        <div className="layout__inner">
          <div className="grid">
            <div className="1/4--desk grid__cell layout__menu">
              <div id="menu" className="grid layout__menu-inner">
                <Menu fullName={`${firstName} ${lastName}`}/>
                <CalendarList calendar={calendar} dayId={id} role={role} statusWaiting={this.state.statusWaiting}/>
              </div>
            </div>
            <div className="3/4--desk 1/1--pocket grid__cell layout__content">
              <TaskIntro text={introHTML} json={introJSON} isTasks={!!tasks && !!tasks[0]} scrollToTasks={e => {
                e.preventDefault()


                const nextElement = document.getElementById('tasks')
                let offset = 0

                if (nextElement) {
                  offset = nextElement.offsetTop - 20
                } else {
                  offset = this.refs.taskResults.offsetTop
                }

                window.scrollTo(0, offset)
              }}/>

              <div id='tasks'/>
              {tasks && tasks[0] &&
                <Exercises token={token} tasks={tasks} sendReport={() => {
                  this.refs.sendReportModal.show()
                }}/>
              }

              <Modal ref='sendReportModal' modalStyle={modalStyle} contentStyle={reportStyle}>
                <SendReportModal isVideo={taskDay.isVideo} onSubmit={(data) => this.createTask(data)}/>
              </Modal>
              <Modal ref='successModal' contentStyle={contentStyle}>
                <h2>Отчет отправлен! В течении некоторого времени его проверит твой тренер</h2>
                <br/>
                <div className="btn btn--action" onClick={e => this.refs.successModal.hide()}>
                  Продолжить
                </div>
              </Modal>


              {poll && poll.description &&
                <Poll poll={poll} />
              }

              <Chat userId={taskDay.user.id} isWindow={false} isOpen={false} />

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
          {/* <li className="menu-mob-bottom__item">
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
          </li> */}
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

const mapStateToProps = state => {
  return { todayTask: state.todayTask }
}

MainComponent= connect(
  mapStateToProps,
  { createWithMessage, fetchChat }
)(MainComponent)

export default MainComponent
