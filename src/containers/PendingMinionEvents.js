import React, {Component} from 'react'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import {fetchPendingExams} from '../actions'

import ExamsList from '../components/userReports/ExamsList'
import UserReportsMenu from '../components/userReports/UserReportsMenu'

class PendingEvents extends Component {
  componentWillMount() {
    const {fetchPendingExams} = this.props

    fetchPendingExams()
  }

  render() {
    const {exams, ladders, isFetching = true} = this.props

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
                  !isFetching ? (
                      <div className="chats-groups">
                        <ExamsList key="exams" title="Экзамены" list={exams} unread={0}/>
                        <ExamsList key="ladders" title="Зачёты" list={ladders} unread={0}/>
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
  const {isFetching, list = []} = state.pendingEvents

  return {
    isFetching,
    exams: list.filter(event => event.isExam),
    ladders: list.filter(event => !event.isExam)
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
