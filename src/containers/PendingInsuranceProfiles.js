import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchPendingInsuranceProfiles} from '../actions'

import UserReportsMenu from '../components/userReports/UserReportsMenu'
import ProfilesList from '../components/userReports/ProfilesList'

class UserReports extends Component {
  componentWillMount() {
    const {fetchPendingInsuranceProfiles} = this.props

    fetchPendingInsuranceProfiles()
  }

  render() {
    const {list, isFetching = true} = this.props

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
                { isFetching ? <div className="spinner"></div> : <ProfilesList list={list}/> }
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  const {pendingProfiles} = state

  return pendingProfiles
}

const mapDispatchToProps = {
  fetchPendingInsuranceProfiles
}

UserReports = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserReports);

export default UserReports
