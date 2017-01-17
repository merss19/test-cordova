import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchPendingProfiles} from '../actions'

import UserReportsMenu from '../components/userReports/UserReportsMenu'
import ProfilesList from '../components/userReports/ProfilesList'

const DEFAULT_PAGE = 1

class UserReports extends Component {
  componentWillMount() {
    const {fetchPendingProfiles} = this.props

    this.state = {
      list: [],
      page: DEFAULT_PAGE,
    }

    fetchPendingProfiles(DEFAULT_PAGE)
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.isFetching && this.props.isFetching) {
      this.setState({
        list: [...this.state.list, ...nextProps.list]
      })
    }
  }

  loadMore() {
    const {fetchPendingProfiles} = this.props
    const nextPage = this.state.page + 1

    fetchPendingProfiles(nextPage)

    this.setState({page: nextPage})
  }

  render() {
    const {list = true} = this.state
    const {isFetching = true} = this.props

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
                  !isFetching || list.length ? (
                      <ProfilesList
                        list={list}
                        isFetching={isFetching}
                        onLoadMore={() => this.loadMore()}/>
                    ) : <div className="spinner"></div>
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
  const {pendingProfiles} = state

  return pendingProfiles
}

const mapDispatchToProps = {
  fetchPendingProfiles
}

UserReports = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserReports);

export default UserReports
