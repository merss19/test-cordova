import React, {Component} from 'react'
import {connect} from 'react-redux'
import cookie from 'react-cookie'
import {Link} from 'react-router'
import {
  fetchChat,
  closeChat,
  createWithMessage,
  PROFILE_PHOTO_CHAT_ID,
  rejectPhoto,
  approvePhoto,
  fetchPendingPhoto,
} from '../actions'

import Chat from './Chat'
import UserReportsMenu from '../components/userReports/UserReportsMenu'
import ProfilePhotos from '../components/userReports/ProfilePhotos'

class UserReports extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isRejectPopupVisible: false
    }
  }

  componentWillMount() {
    const {
      routeParams,
      fetchChat,
      fetchPendingPhoto,
    } = this.props

    fetchChat(PROFILE_PHOTO_CHAT_ID, routeParams.userId)
    fetchPendingPhoto(Number(routeParams.userId), Number(routeParams.programId))
  }

  componentWillUnmount () {
    const {closeChat} = this.props

    closeChat()
  }

  showRejectPopup() {
    this.setState({isRejectPopupVisible: true})
  }

  hideRejectPopup() {
    this.setState({isRejectPopupVisible: false})
  }

  approvePhoto () {
    const {router, approvePhoto, user, program} = this.props

    approvePhoto(user, program)
      .then(() => router.push('/userReports/photos'))
  }

  rejectPhoto () {
    const {
      user,
      program,
      fetchChat,
      createWithMessage,
      rejectPhoto
    } = this.props

    this.hideRejectPopup()

    Promise
      .all([
        createWithMessage(PROFILE_PHOTO_CHAT_ID, user, this.refs.rejectReason.value),
        rejectPhoto(user, program)
      ])
      .then(() => {
        fetchChat(PROFILE_PHOTO_CHAT_ID, user)
      })
  }

  render() {
    const {isRejectPopupVisible} = this.state
    const {
      userId,
      isFetching,
      photoAfterBackUrl,
      photoAfterFrontUrl,
      photoAfterLeftUrl,
      photoAfterRightUrl,
      photoBeforeBackUrl,
      photoBeforeFrontUrl,
      photoBeforeLeftUrl,
      photoBeforeRightUrl
    } = this.props

    return (
      <div className="layout layout--login">
        <Chat userId={userId}/>

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
                            onClick={() => this.approvePhoto()}
                            className="pending-profile__button btn btn--primary">
                            Утвердить фотографии
                          </button>
                          <button
                            onClick={() => this.showRejectPopup()}
                            className="pending-profile__button btn btn--action">
                            Вернуть на исправление
                          </button>
                        </div>

                        <Link
                          to="/userReports/photos"
                          className="pending-profile__close-button">
                          <svg className="svg-icon ico-close">
                            <use xlinkHref="#ico-close"></use>
                          </svg>
                        </Link>
                      </div>

                      <div className="pending-profile__container">
                        <ProfilePhotos
                          title="До"
                          front={photoBeforeFrontUrl}
                          back={photoBeforeBackUrl}
                          left={photoBeforeLeftUrl}
                          right={photoBeforeRightUrl}/>
                        
                        <ProfilePhotos
                          title="После"
                          front={photoAfterFrontUrl}
                          back={photoAfterBackUrl}
                          left={photoAfterLeftUrl}
                          right={photoAfterRightUrl}/>
                      </div>

                      {
                        isRejectPopupVisible ? (
                            <div className="pending-profile__inner-popup">
                              <div className="pending-profile__top-panel">
                                <div className="pending-profile__buttons">
                                  <button
                                    onClick={() => this.rejectPhoto()}
                                    className="pending-profile__button btn btn--primary">
                                    Вернуть
                                  </button>
                                  <button
                                    onClick={() => this.hideRejectPopup()}
                                    className="pending-profile__button btn btn--action">
                                    Отмена
                                  </button>
                                </div>

                                <div className="pending-profile__close-button"
                                     onClick={() => this.hideRejectPopup()}>
                                  <svg className="svg-icon ico-close">
                                    <use xlinkHref="#ico-close"></use>
                                  </svg>
                                </div>
                              </div>

                              <textarea
                                ref="rejectReason"
                                className="pending-profile__desc-box"
                                placeholder="Причина отказа"/>
                            </div>
                          ) : null
                      }
                    </div>
                  )
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
  const {
    pendingPhoto
  } = state

  return {
    userId: cookie.load('user_id'),
    ...pendingPhoto
  }
}

const mapDispatchToProps = {
  fetchChat,
  closeChat,
  createWithMessage,
  rejectPhoto,
  approvePhoto,
  fetchPendingPhoto
}

UserReports = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserReports);

export default UserReports
