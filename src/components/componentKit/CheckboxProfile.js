import React from 'react'
const style = {
  color: 'red',
  fontSize: '12'
}

const CheckboxProfile = ({ input, title, checker, onChange, id, meta: { touched, error } }) => (
  <li className="checkboxes__item">
    <span className="checkbox">
      <label className="checkbox__label" htmlFor={id}>
        <input {...input} checked={checker} className="checkbox__field" id={id} type="checkbox" onChange={onChange}/>
        <span className="checkbox__ph">
          <svg className="svg-icon ico-tick">
            <use xlinkHref="#ico-tick"></use>
          </svg>
        </span>
        <span className="checkbox__title">{title}</span>
      </label>
    </span>
    {touched && error && <span style={style}>{error}</span>}
  </li>
)

export default CheckboxProfile
