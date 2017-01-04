import React, { PropTypes } from 'react'
import Calendar from '../../stories/task/Calendar'
import * as actions from '../../actions'
import { connect } from 'react-redux'

let CalendarList = ({ calendar, selectedTaskDay, dispatch, dayId }) => (
  <div className="1/3 grid__cell">
    <ul className="min-calendar">
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
        return (
          <Calendar
            onClick={() => {
              console.log('field.id')
              console.log(field.dayId)
              dispatch({ type: 'SELECT_DAY_ID', id: field.dayId })
              dispatch({ type: 'SELECT_DAY_DATE', date: field.date })
              dispatch(actions.fetchTaskDayIfNeeded(selectedTaskDay))
            }}
            key={index}
            isSelected={field.dayId === dayId}
            number={field.number}
            icon={icon}
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
