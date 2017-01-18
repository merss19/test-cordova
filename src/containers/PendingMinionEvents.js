import React, {Component} from 'react'
import { Field, reduxForm } from 'redux-form'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import {fetchPendingExams} from '../actions'
import ReactPaginate from 'react-paginate'

import ExamsList from '../components/userReports/ExamsList'
import UserReportsMenu from '../components/userReports/UserReportsMenu'

const DEFAULT_PAGE = 1
const DEFAULT_PAGE_COUNT = 10
let currentStatus = 'waiting'
let isExam = true

class PendingEvents extends Component {
  componentWillMount() {
    const {fetchPendingExams} = this.props

    this.state = {
      list: [],
      page: DEFAULT_PAGE,
      pageCount: DEFAULT_PAGE_COUNT
    }

    fetchPendingExams(currentStatus, DEFAULT_PAGE, isExam)
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
    const {fetchPendingExams} = this.props
    const nextPage = this.state.page + 1

    fetchPendingExams(currentStatus, nextPage)

    this.setState({page: nextPage})
  }

  render() {
    const {isFetching = true, fetchPendingExams} = this.props
    const {list = true} = this.state

    const handlePageClick = data => {
      console.log(data)
      const nextPage = data.selected + 1

      fetchPendingExams(currentStatus, nextPage, isExam)

      this.setState({page: nextPage})
    }

    const examsTypes = [
      { text: 'Экзамены', val: true },
      { text: 'Зачёты', val: false }
    ]

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
                      <div className="chats-groups">
                        <button className="btn btn--primary" onClick={e => {
                          e.preventDefault()
                          currentStatus = 'waiting'

                          this.state = {
                            list: [],
                            page: DEFAULT_PAGE
                          }

                          fetchPendingExams(currentStatus, DEFAULT_PAGE, isExam)
                        }}>
                          Waiting
                        </button>

                        <div className="divider" />

                        <button className="btn btn--action" onClick={e => {
                          e.preventDefault()
                          currentStatus = 'done'

                          this.state = {
                            list: [],
                            page: DEFAULT_PAGE
                          }

                          fetchPendingExams(currentStatus, DEFAULT_PAGE, isExam)
                        }}>
                          Done
                        </button>

                        <div className="divider" />

                        <ul className="options options--white mtb30" style={{ display: 'inline-block'}}>
                          {examsTypes.map((val, index) => (
                            <label key={index} style={{ display: 'inline-block'}}>
                              <li name="examsTypes" className={ isExam === val.val ? "options__item is-active" : "options__item"} id={`examsTypes[${index}]`} onClick={e => {
                                document.getElementById(`examsTypes[${index}]`).className += ' is-active'
                                examsTypes.forEach((v, i) => {
                                  if (index !== i)
                                    document.getElementById(`examsTypes[${i}]`).className = "options__item"
                                })
                              }}>
                                <Field
                                  component='input'
                                  type='radio'
                                  name='examsTypes'
                                  style={{visibility: 'hidden', margin: -5}}
                                  value={val.val}
                                  onClick={() => {
                                    isExam = val.val

                                    this.state = {
                                      list: [],
                                      page: DEFAULT_PAGE
                                    }

                                    fetchPendingExams(currentStatus, DEFAULT_PAGE, isExam)
                                  }}/>
                                {val.text}
                              </li>
                              <span/>
                            </label>
                          ))}
                        </ul>

                        <ExamsList key="exams" title={isExam ? "Экзамены" : "Зачёты"} list={list} isFetching={isFetching} onLoadMore={() => this.loadMore()} unread={0}/>
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
                        {/* <ExamsList key="ladders" title="Зачёты" list={ladders} isFetching={isFetching} onLoadMore={() => this.loadMore()} unread={0}/> */}
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

PendingEvents = reduxForm({
  form: 'examsForm'
})(PendingEvents)

const mapStateToProps = state => {
  const {isFetching, list = [], pageCount} = state.pendingEvents

  return {
    isFetching,
    list,
    pageCount,
    // exams: list.filter(event => event.isExam),
    // ladders: list.filter(event => !event.isExam)
  }
}

const mapDispatchToProps = {
  fetchPendingExams
}

PendingEvents = connect(
  mapStateToProps,
  mapDispatchToProps
)(PendingEvents);

export default PendingEvents
