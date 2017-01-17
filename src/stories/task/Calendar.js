import React, { PropTypes } from 'react'
import moment from 'moment'

const Calendar = ({ children, onClick, number, completeText, icon, status,

  date, admin, isSelected, isTooSoon,customName,currentDay, day, dynamicStatus,id }) => {


    let calendarIcon,
        calendarToolip,
        content,
        special,
        calendarClass = "min-calendar__item"

    if (icon && !customName.length) {
      calendarIcon = (
        <div className="min-calendar__info">
          <svg className={"svg-icon " + status}>
            <use xlinkHref={"#" + icon}/>
          </svg>
        </div>
      )
    }

	if (currentDay === day && dynamicStatus) {
		calendarIcon = (
			<div className="min-calendar__info sssssssssss">
				<svg className={"svg-icon waiting" }>
					<use xlinkHref={"#ico-done"}/>
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


    content = (
        <span className="min-calendar__date-wrap">
          <span className="min-calendar__day">{children}</span>
          <span className="min-calendar__date" style={style}>{number}</span>
        </span>
    )

    if(customName.length){
      special = (
          <p className="min-calendar__special-day">{customName}</p>
      )
      content = null
      calendarIcon = null
      calendarToolip = null
    }


    return (
      <li id={id} className={calendarClass} onClick={onClick}>
        {content}
        {calendarIcon}
        {calendarToolip}
        {special}
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
