import React, { PropTypes } from 'react'

const Calendar = props => {
    const { children, onClick, onTrashClick, number, date, dispatch, selectedDays } = props
	console.log('Calendarfff')
	console.log(props)
    return (
      <li className="min-calendar__item" onClick={onClick}>
        <span className="min-calendar__date-wrap">
          <span className="min-calendar__day">{children}</span>
          <span className="min-calendar__date">{number}</span>
        </span>
        <div className="min-calendar__info">
          <svg className="svg-icon ico-trash" onClick={onTrashClick}>
            <use xlinkHref="#ico-trash"></use>
          </svg>
        </div>
      </li>
    )
}

export default Calendar
