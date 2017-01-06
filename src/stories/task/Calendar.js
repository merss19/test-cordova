import React, { PropTypes } from 'react'
import moment from 'moment'

const Calendar = ({ children, onClick, number, completeText, icon, status,
  date, admin, isSelected, isTooSoon }) => {
    let calendarIcon
    let calendarToolip
    let calendarClass = "min-calendar__item"

    if (icon) {
      calendarIcon = (
        <div className="min-calendar__info">
          <svg className={"svg-icon " + icon}>
            <use xlinkHref={"#" + icon}/>
          </svg>
        </div>
      )
    }

    if (completeText && admin && status) {
      calendarToolip = (
        <div className={"calendar-toolip calendar-toolip--" + status}>
          <div className="calendar-toolip__inner">
            <p className="calendar-toolip__title">{completeText}</p>
            <p className="calendar-toolip__date"><span>{admin}</span></p>
          </div>
        </div>
      )
    }

    if (moment(date).format('YYYY-MM-DD') === moment().format('YYYY-MM-DD')) {
      calendarClass = "min-calendar__item today"
    } else if (isSelected) {
      calendarClass = "min-calendar__item is-select"
    }

    const style = isTooSoon ? { color: '#C8C9CF' } : {}

    return (
      <li className={calendarClass} onClick={onClick}>
        <span className="min-calendar__date-wrap">
          <span className="min-calendar__day">{children}</span>
          <span className="min-calendar__date" style={style}>{number}</span>
        </span>
        {calendarIcon}
        {calendarToolip}
      </li>
    )
}

Calendar.propTypes = {
  children: PropTypes.string.isRequired,
  icon: PropTypes.string,
  status: PropTypes.string,
  admin: PropTypes.string,
  completeText: PropTypes.string,
  date: PropTypes.string,
  onClick: PropTypes.func,
}

export default Calendar
