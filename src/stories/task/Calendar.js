import React, { PropTypes } from 'react'

const Calendar = ({ children, onClick, number, completeText, icon, status, date, admin }) => {
    let calendarIcon
    let calendarToolip

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

    return (
      <li className="min-calendar__item" onClick={onClick}>
        <span className="min-calendar__date-wrap">
          <span className="min-calendar__day">{children}</span>
          <span className="min-calendar__date">{number}</span>
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
