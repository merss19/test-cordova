import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import {
  fetchChat,
  closeChat,
  createWithMessage,
  rejectExam,
  waitingExam,
  approveExam,
  fetchPendingExam,
  EXAM_CHAT_ID
} from '../actions'

import Chat from './Chat'
import UserReportsMenu from '../components/userReports/UserReportsMenu'

const healthConditions = {
  bad: 'Ужасно',
  middle: 'Так себе',
  good: 'Отлично'
}
const youtubePattern = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/

class UserReports extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isConfirmPopupVisible: false
    }
  }

  componentWillMount() {
    const {fetchPendingExam, routeParams} = this.props

    fetchChat(EXAM_CHAT_ID, routeParams.dayId)
    fetchPendingExam(routeParams.userId, routeParams.dayId)
  }

  componentWillUnmount() {
    const {closeChat} = this.props

    closeChat()
  }

  confirmChoice() {
    const {confirmMessage} = this.refs
    const {confirmationAction} = this.state

    this.toggleStatus(confirmationAction, confirmMessage.value)
  }

  toggleStatus(action, message) {
    const {id, router} = this.props

    action(id, message)
      .then(() => router.push('/userReports/exams'))
  }

  showConfirmPopup(confirmationAction) {
    this.setState({isConfirmPopupVisible: true, confirmationAction})
  }

  hideConfirmPopup() {
    this.setState({isConfirmPopupVisible: false})
  }

  render() {
    const {isConfirmPopupVisible} = this.state
    const {
      userId,
      isFetching,
      approveExam,
      waitingExam,
      rejectExam,
      video,
      report,
      health,
    } = this.props

    const healthCondition = healthConditions[health] || healthConditions.middle

    const matchYoutubeUrl = video.match(youtubePattern);
    const isVideoValid = matchYoutubeUrl && matchYoutubeUrl[2].length === 11
    const videoEmbedUrl = isVideoValid ? `https://www.youtube.com/embed/${matchYoutubeUrl[2]}?autoplay=0` : null

    return (
      <div className="layout layout--login">
        <Chat
          userId={userId}
          onWaiting={() => this.toggleStatus(waitingExam, '')}/>

        <div className="header">
          <div className="grid header__inner">
            <h1 className="grid__cell header__logo">
              Ясегодня
              <img src="/assets/img/ys_logo.svg" alt="Ясегодня"/>
            </h1>
          </div>
        </div>

        <div className="user-reports">

          <div className="entry entry--sign-up">
            <div className="entry__inner">
              <div className="entry-info entry-info_top-menu">
                <div className="entry-info__inner">
                  <UserReportsMenu />
                </div>
              </div>

              <div className="entry__box">
                {
                  isFetching ? <div className="spinner"></div> : (
                      <div className="pending-profile">
                        <div className="pending-profile__top-panel">
                          <div className="pending-profile__buttons">
                            <button
                              onClick={() => this.showConfirmPopup(approveExam)}
                              className="pending-profile__button btn btn--primary">
                              Отчёт принят
                            </button>
                            <button
                              onClick={() => this.showConfirmPopup(rejectExam)}
                              className="pending-profile__button btn btn--action">
                              Отчёт не принят
                            </button>
                            <button
                              onClick={() => this.showConfirmPopup(waitingExam)}
                              className="pending-profile__button btn btn--secondary">
                              Вернуть клиенту
                            </button>
                          </div>

                          <Link
                            to="/userReports/exams"
                            className="pending-profile__close-button">
                            <svg className="svg-icon ico-close">
                              <use xlinkHref="#ico-close"></use>
                            </svg>
                          </Link>
                        </div>

                        <div className="pending-profile__container">
                          <div className="pending-profile__row">
                            <h3 className="pending-profile__row-title">
                              Состояние
                            </h3>

                            {healthCondition}
                          </div>


                          <div className="pending-profile__row">
                            <h3 className="pending-profile__row-title">
                              Комментарий
                            </h3>

                            {report}
                          </div>

                          <div className="pending-profile__row">
                            <h3 className="pending-profile__row-title">
                              Видео
                            </h3>

                            {
                              isVideoValid ? (
                                  <iframe width="420" height="315" src={videoEmbedUrl}/>
                                ) : 'Некорректная ссылка, либо отсутствует'

                            }
                          </div>

                        </div>
                      </div>
                    )
                }

                {
                  isConfirmPopupVisible ? (
                      <div className="pending-profile__inner-popup">
                        <div className="pending-profile__top-panel">
                          <div className="pending-profile__buttons">
                            <button
                              onClick={() => this.confirmChoice()}
                              className="pending-profile__button btn btn--primary">
                              Принять
                            </button>
                            <button
                              onClick={() => this.hideConfirmPopup()}
                              className="pending-profile__button btn btn--action">
                              Отмена
                            </button>
                          </div>

                          <div className="pending-profile__close-button"
                               onClick={() => this.hideConfirmPopup()}>
                            <svg className="svg-icon ico-close">
                              <use xlinkHref="#ico-close"></use>
                            </svg>
                          </div>
                        </div>

                        <textarea
                          ref="confirmMessage"
                          className="pending-profile__desc-box"
                          placeholder="Сообщение пользователю"/>
                      </div>
                    ) : null
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  const {pendingEvent = {}} = state

  return pendingEvent
}

const mapDispatchToProps = {
  fetchChat,
  closeChat,
  createWithMessage,
  rejectExam,
  waitingExam,
  approveExam,
  fetchPendingExam
}

UserReports = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserReports);

export default UserReports
