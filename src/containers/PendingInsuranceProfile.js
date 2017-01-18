import React, {Component} from 'react'
import {connect} from 'react-redux'
import cookie from 'react-cookie'
import {Link} from 'react-router'
import {
  fetchChat,
  closeChat,
  createWithMessage,
  INSURANCE_CHAT_ID,
  rejectInsuranceProfile,
  approveInsuranceProfile,
  fetchPendingInsuranceProfile
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
    const {fetchPendingInsuranceProfile, fetchChat, routeParams} = this.props

    fetchChat(INSURANCE_CHAT_ID, routeParams.insuranceId)
    fetchPendingInsuranceProfile(routeParams.userId)
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

  approveInsurance() {
    const {router, routeParams, approveInsuranceProfile} = this.props

    approveInsuranceProfile(routeParams.insuranceId)
      .then(() => router.push('/userReports/pendingInsurance'))
  }

  rejectInsurance() {
    const {
      routeParams,
      fetchChat,
      createWithMessage,
      rejectInsuranceProfile
    } = this.props

    this.hideRejectPopup()

    Promise
      .all([
        createWithMessage(INSURANCE_CHAT_ID, routeParams.insuranceId, this.refs.rejectReason.value, true),
        rejectInsuranceProfile(routeParams.insuranceId)
      ])
      .then(() => {
        fetchChat(INSURANCE_CHAT_ID, routeParams.insuranceId)
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
                              onClick={() => this.approveInsurance()}
                              className="pending-profile__button btn btn--primary">
                              Страховка утверждена
                            </button>
                            <button
                              onClick={() => this.showRejectPopup()}
                              className="pending-profile__button btn btn--action">
                              В страховке отказано
                            </button>
                          </div>

                          <Link
                            to="/userReports/pendingInsurance"
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
                                      onClick={() => this.rejectInsurance()}
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
    userId: cookie.load('user_id'),
    isFetching,
    current,
    previously
  }
}

const mapDispatchToProps = {
  fetchChat,
  closeChat,
  createWithMessage,
  rejectInsuranceProfile,
  approveInsuranceProfile,
  fetchPendingInsuranceProfile
}

UserReports = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserReports);

export default UserReports
