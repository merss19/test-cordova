import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchPendingInsuranceProfiles} from '../actions'
import ReactPaginate from 'react-paginate'

import UserReportsMenu from '../components/userReports/UserReportsMenu'
import ProfilesList from '../components/userReports/ProfilesList'

const DEFAULT_PAGE = 1
const DEFAULT_PAGE_COUNT = 10

class UserReports extends Component {
  componentWillMount() {
    const {fetchPendingInsuranceProfiles} = this.props

    this.state = {
      list: [],
      page: DEFAULT_PAGE,
      pageCount: DEFAULT_PAGE_COUNT
    }

    fetchPendingInsuranceProfiles(DEFAULT_PAGE)
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.isFetching && this.props.isFetching) {
      this.setState({
        list: [...nextProps.list],
        pageCount: nextProps.pageCount
      })
    }
  }

  loadMore() {
    const {fetchPendingInsuranceProfiles} = this.props
    const nextPage = this.state.page + 1

    fetchPendingInsuranceProfiles(nextPage)

    this.setState({page: nextPage})
  }

  render() {
    const {list = true} = this.state
    const {isFetching = true} = this.props

    const handlePageClick = data => {
      const nextPage = data.selected + 1

      fetchPendingInsuranceProfiles(nextPage)

      this.setState({page: nextPage})
    }

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
                      <div className="pending-profiles">
                        <ProfilesList
                          list={list}
                          isFetching={isFetching}
                          onLoadMore={() => this.loadMore()}
                        />
                        <ReactPaginate previousLabel={"<"}
                          nextLabel={">"}
                          breakLabel={<a href="">...</a>}
                          breakClassName={"break-me"}
                          pageCount={this.state.pageCount}
                          marginPagesDisplayed={2}
                          pageRangeDisplayed={5}
                          onPageChange={handlePageClick}
                          containerClassName={"pagination"}
                          subContainerClassName={"pages pagination"}
                          activeClassName={"active"}
                        />
                      </div>
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

  return {
    pendingProfiles,
    isFetching: pendingProfiles.isFetching,
    list: pendingProfiles.list,
    pageCount: pendingProfiles.pageCount
  }
}

const mapDispatchToProps = {
  fetchPendingInsuranceProfiles
}

UserReports = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserReports);

export default UserReports
