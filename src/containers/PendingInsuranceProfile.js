import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import {
  rejectInsuranceProfile,
  approveInsuranceProfile,
  fetchPendingInsuranceProfile,
} from '../actions'

import UserReportsMenu from '../components/userReports/UserReportsMenu'
import ProfilePropertiesList from '../components/userReports/ProfilePropertiesList'

class UserReports extends Component {
  componentWillMount() {
    const {fetchPendingInsuranceProfile, routeParams} = this.props

    fetchPendingInsuranceProfile(routeParams.userId)
  }

  approveInsurance () {
    const {router, routeParams, approveInsuranceProfile} = this.props

    approveInsuranceProfile(routeParams.insuranceId)
      .then(() => router.push('/userReports/pendingInsurance'))
  }

  rejectInsurance () {
    const {router, routeParams, rejectInsuranceProfile} = this.props

    rejectInsuranceProfile(routeParams.insuranceId)
      .then(() => router.push('/userReports/pendingInsurance'))
  }

  render() {
    const {isFetching, current, previously} = this.props

    return (
      <div className="layout layout--login">

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
                            onClick={() => this.rejectInsurance()}
                            className="pending-profile__button btn btn--action">
                            В страховку отказано
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
  const {isFetching = true, current = null, previously = null} = state.pendingProfile

  return {isFetching, current, previously}
}

const mapDispatchToProps = {
  rejectInsuranceProfile,
  approveInsuranceProfile,
  fetchPendingInsuranceProfile
}

UserReports = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserReports);

export default UserReports
