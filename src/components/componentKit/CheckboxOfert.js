import React from 'react'
import { Link } from 'react-router'

const CheckboxOfert = ({ input, title, id, meta: { touched, error } }) => (
  <div className="checkboxes__item">
    <span className="checkbox">
      <label className="checkbox__label" htmlFor={id}>
        <input {...input} className="checkbox__field" id={id} type="checkbox"/>
        <span className="checkbox__ph">
          <svg className="svg-icon ico-tick">
            <use xlinkHref="#ico-tick"></use>
          </svg>
        </span>
        <div className='gender'>
          <span className="checkbox__title">{title}</span>
          <div className="divider" />
          <Link to="chart" target="_blank" to="http://todayme.ru/dogovor-oferty#.WGFQqrZ95E4">оферты</Link>
        </div>
      </label>
    </span>
    {touched && error && <span>{error}</span>}
  </div>
)

export default CheckboxOfert
