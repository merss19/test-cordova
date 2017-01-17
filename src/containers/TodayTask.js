import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {
  selectTaskDay,
  invalidateTaskDay,
  fetchTaskDayIfNeeded,
  fetchChat, PRIVATE_CHAT_ID
} from '../actions'

import MainComponent from '../components/todayTask/MainComponent'
import LoadingView from '../components/componentKit/LoadingView'

class TodayTask extends Component {
  static propTypes = {
    taskDay: PropTypes.object.isRequired,
    isFetching: PropTypes.bool.isRequired,
    selectTaskDay: PropTypes.func.isRequired,
    invalidateTaskDay: PropTypes.func.isRequired,
    fetchTaskDayIfNeeded: PropTypes.func.isRequired,
    fetchChat: PropTypes.func.isRequired
  }

  componentDidMount() {
    const { fetchTaskDayIfNeeded, selectedTaskDay, fetchChat } = this.props

    fetchChat(PRIVATE_CHAT_ID)
    fetchTaskDayIfNeeded(selectedTaskDay)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedTaskDay !== this.props.selectedTaskDay) {
      const { fetchTaskDayIfNeeded, selectedTaskDay, taskDay, fetchChat } = nextProps
      fetchChat(PRIVATE_CHAT_ID)
      fetchTaskDayIfNeeded(selectedTaskDay)
    }
  }

  handleChange = nextTaskDay => {
    const { selectTaskDay } = this.props

    selectTaskDay(nextTaskDay)
  }

  handleRefreshClick = e => {
    e.preventDefault()

    const { invalidateTaskDay, fetchTaskDayIfNeeded, selectedTaskDay } = this.props
    invalidateTaskDay(selectedTaskDay)
    fetchTaskDayIfNeeded(selectedTaskDay)
  }

  render() {
    const { taskDay, token, isFetching } = this.props
    const isEmpty = !taskDay|| !taskDay.data || taskDay.data.length === 0
	  console.log('todauTaskkkkkk')
		console.log(this.props)
    return (
      <div className={isEmpty ? 'entry__inner dfgdfg' : 'layout dfgdfg'}>
        {isEmpty
          ? (isFetching ? <LoadingView title="Загружается..."/> : <LoadingView title="Ничего не найдено"/>)
          : <div style={{ opacity: isFetching ? 0.5 : 1 }}>
              <MainComponent token={token} taskDay={taskDay.data[0]} />
            </div>
        }
      </div>
    )
  }
}

const mapStateToProps = state => {

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
  mapStateToProps,
  {
    selectTaskDay,
    invalidateTaskDay,
    fetchTaskDayIfNeeded,
    fetchChat
  }
)(TodayTask)

export default TodayTask
