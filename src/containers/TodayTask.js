import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'

import MainComponent from '../components/todayTask/MainComponent'
import LoadingView from '../components/componentKit/LoadingView'

class TodayTask extends Component {
  static propTypes = {
    taskDay: PropTypes.object.isRequired,
    isFetching: PropTypes.bool.isRequired,
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
    const { taskDay, token, isFetching,state } = this.props
    const isEmpty = !taskDay|| !taskDay.data || taskDay.data.length === 0
	  console.log('TodayTask')
	  console.log(this.props)
    return (
      <div className={isEmpty ? 'entry__inner' : 'layout'}>
        {isEmpty
          ? (isFetching ? <LoadingView title="Загружается..."/> : <LoadingView title="Ничего не найдено"/>)
          : <div style={{ opacity: isFetching ? 0.5 : 1 }}>
              <MainComponent token={token} taskDay={taskDay.data[0]} state={state} />
            </div>
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  console.log('TodayTask')
  console.log(state)
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
	  state,
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
