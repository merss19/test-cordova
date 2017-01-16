import React, { PropTypes, Component } from 'react'
import Calendar from '../../stories/task/Calendar'
import * as actions from '../../actions'
import { connect } from 'react-redux'
import moment from 'moment'

class CalendarList extends Component {
  componentDidMount() {
    if (window.mobilecheck()) {
      document.getElementById('calendar').scrollLeft = document.getElementById('today').getBoundingClientRect().left
    }
  }

  render() {
    const { calendar, selectedTaskDay, dispatch, dayId, role, privateChatId } = this.props

    return (
      <div className="1/3--desk grid__cell layout__calendar">
        <ul id='calendar' className="min-calendar">
          {calendar.map((field, index) => {
            let icon
            switch (field.status) {
              case 'done':
                icon = 'ico-done'
                break
              case 'missed':
                icon = 'ico-cross'
                break
              default:
                icon = ''
            }

            const isTooSoon = moment(field.date).isAfter(moment().format('YYYY-MM-DD')) && role !== 2

            return (
              <Calendar
                id={field.date === moment().format('YYYY-MM-DD') ? 'today' : 'day'}
                onClick={() => {
                  if (!isTooSoon) {
                    dispatch({ type: 'SELECT_DAY_ID', id: field.dayId })
                    dispatch({ type: 'SELECT_DAY_DATE', date: field.date })
                    dispatch(actions.fetchTaskDayIfNeeded(selectedTaskDay))
                    dispatch(actions.fetchChat(privateChatId))
                  }
                }}
                key={index}
                isTooSoon={isTooSoon}
                isSelected={field.dayId === dayId}
                number={field.number}
                icon={icon}
                customName = {field.customName}
                status={field.status}
                date={field.date}
                admin={field.admin}
                completeText={field.completeText}>
                  {field.day}
              </Calendar>
            )
          })}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { selectedTaskDay } = state

  return {
    selectedTaskDay
  }
}

CalendarList = connect(
  mapStateToProps
)(CalendarList)

export default CalendarList
