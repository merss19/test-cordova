import React, {Component} from 'react'
import {connect} from 'react-redux'
import cookie from 'react-cookie'
import {Link} from 'react-router'
import {
  fetchChat,
  closeChat,
  createWithMessage,
  PROFILE_CHAT_ID,
  rejectProfile,
  approveProfile,
  fetchPendingProfile,
} from '../actions'

import Chat from './Chat'
import UserReportsMenu from '../components/userReports/UserReportsMenu'
import ProfilePropertiesList from '../components/userReports/ProfilePropertiesList'

class UserReports extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isRejectPopupVisible: false
    }
  }

  componentWillMount() {
    const {fetchPendingProfile, routeParams} = this.props

    fetchChat(PROFILE_CHAT_ID, routeParams.userId)
    fetchPendingProfile(routeParams.userId)
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

  approveProfile () {
    const {router, routeParams, approveProfile} = this.props

    approveProfile(routeParams.userId)
      .then(() => router.push('/userReports/pendingProfiles'))
  }

  rejectProfile () {
    const {
      routeParams,
      fetchChat,
      createWithMessage,
      rejectProfile
    } = this.props

    this.hideRejectPopup()

    Promise
      .all([
        createWithMessage(PROFILE_CHAT_ID, routeParams.userId, this.refs.rejectReason.value),
        rejectProfile(routeParams.userId)
      ])
      .then(() => {
        fetchChat(PROFILE_CHAT_ID, routeParams.userId)
      })
  }

  render() {
    const {isRejectPopupVisible} = this.state
    const {userId, isFetching, current, previously} = this.props

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
                            onClick={() => this.approveProfile()}
                            className="pending-profile__button btn btn--primary">
                            Утвердить профиль
                          </button>
                          <button
                            onClick={() => this.showRejectPopup()}
                            className="pending-profile__button btn btn--action">
                            Вернуть на исправление
                          </button>
                        </div>

                        <Link
                          to="/userReports/pendingProfiles"
                          className="pending-profile__close-button">
                          <svg className="svg-icon ico-close">
                            <use xlinkHref="#ico-close"></use>
                          </svg>
                        </Link>
                      </div>

                      <div className="pending-profile__container">
                        {
                          current ?
                            <ProfilePropertiesList
                              title={previously ? 'Было' : null}
                              props={current}
                              compareTo={previously}/> : null
                        }

                        {
                          previously ?
                            <ProfilePropertiesList
                              title="Стало"
                              props={previously}
                              compareTo={current}/> : null
                        }
                      </div>

                      {
                        isRejectPopupVisible ? (
                            <div className="pending-profile__inner-popup">
                              <div className="pending-profile__top-panel">
                                <div className="pending-profile__buttons">
                                  <button
                                    onClick={() => this.rejectProfile()}
                                    className="pending-profile__button btn btn--primary">
                                    Отказать
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
    isFetching = true,
    current = null,
    previously = null
  } = state.pendingProfile

  return {
    userId: Number(cookie.load('user_id')),
    isFetching,
    current,
    previously
  }
}

const mapDispatchToProps = {
  fetchChat,
  closeChat,
  createWithMessage,
  rejectProfile,
  approveProfile,
  fetchPendingProfile
}

UserReports = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserReports);

export default UserReports
