import React from 'react'

const CheckboxProfile = ({ input, title, id, meta: { touched, error } }) => (
  <li className="checkboxes__item">
    <span className="checkbox">
      <label className="checkbox__label" htmlFor={id}>
        <input {...input} className="checkbox__field" id={id} type="checkbox"/>
        <span className="checkbox__ph">
          <svg className="svg-icon ico-tick">
            <use xlinkHref="#ico-tick"></use>
          </svg>
        </span>
        <span className="checkbox__title">{title}</span>
      </label>
    </span>
  </li>
)

export default CheckboxProfile
