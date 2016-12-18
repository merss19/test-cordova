import React, { Component, PropTypes } from 'react'
import Calendar from '../../stories/task/Calendar'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'

const chooseDay = id => {

}

class CalendarList extends Component{
  render() {
    const { dispatch, calendar, program } = this.props
    return(
      <div className="1/3 grid__cell">
        <ul className="min-calendar">
          {calendar.map((field, index) => (
            <Calendar onClick={() => {
              const editDay = {
                tasks: calendar[index].tasks || [],
                customIcon: calendar[index].customIcon || '',
                customName: calendar[index].customName || ''
              }
              console.log(editDay)
              dispatch({type: 'EDIT_DAY', ...editDay})
              //browserHistory.push(`/superadmin/day/${program}/${index}`)
            }}
              key={index}
              number={field.number}
              icon={field.icon}
              status={field.status}
              date={field.date}
              admin={field.admin}
              completeText={field.completeText}>{field.day}</Calendar>
          ))}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { editDay } = state
  return {
    editDay
  }
}

CalendarList = connect(
  mapStateToProps
)(CalendarList)

export default CalendarList
