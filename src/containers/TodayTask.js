import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import * as actions from '../actions'

import MainComponent from '../components/todayTask/MainComponent';

class TodayTask extends Component {
  static propTypes = {
    token: PropTypes.string.isRequired,
    taskDay: PropTypes.object.isRequired,
    selectedTaskDay: PropTypes.string.isRequired,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
    dispatch: PropTypes.func.isRequired
  }

  componentDidMount() {
    const { dispatch, selectedTaskDay } = this.props
    dispatch(actions.fetchTaskDayIfNeeded(selectedTaskDay))
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedTaskDay !== this.props.selectedTaskDay) {
      const { dispatch, selectedTaskDay } = nextProps
      dispatch(actions.fetchTaskDayIfNeeded(selectedTaskDay))
    }
  }

  handleChange = nextTaskDay => {
    this.props.dispatch(actions.selectTaskDay(nextTaskDay))
  }

  handleRefreshClick = e => {
    e.preventDefault()

    const { dispatch, selectedTaskDay } = this.props
    dispatch(actions.invalidateTaskDay(selectedTaskDay))
    dispatch(actions.fetchTaskDayIfNeeded(selectedTaskDay))
  }

  render() {
    const { selectedTaskDay, taskDay, isFetching, lastUpdated } = this.props
    console.log('MMMMMMMM===(')
    console.log(taskDay)
    const isEmpty = taskDay === undefined || taskDay.data === undefined
    console.log(isEmpty)
    return (
      <div>
        {isEmpty
          ? (isFetching ? <h2>Загружается...</h2> : <h2>Ничего не найдено</h2>)
          : <div style={{ opacity: isFetching ? 0.5 : 1 }}>
              <MainComponent taskDay={taskDay.data[0]} />
            </div>
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { selectedTaskDay, recivedTaskDay, userToken } = state

  const {
    isFetching,
    lastUpdated,
    taskDay
  } = recivedTaskDay[selectedTaskDay] || {
    isFetching: true,
    taskDay: {}
  }

  return {
    selectedTaskDay,
    isFetching,
    lastUpdated,
    taskDay,
    token: userToken.token
  }
}

TodayTask = connect(
  mapStateToProps
)(TodayTask)

export default TodayTask
