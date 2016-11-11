import React, { PropTypes } from 'react'
import Calendar from '../../stories/task/Calendar'

const chooseDay = date => {
  console.log(date)
}

const CalendarList = ({ calendar }) => (
  <div className="1/3 grid__cell">
    <ul className="min-calendar">
      {calendar.map((field, index) => (
        <Calendar onClick={chooseDay(field.date)}
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

CalendarList.propTypes = {
  calendar: PropTypes.arrayOf(React.PropTypes.object).isRequired
}

export default CalendarList
