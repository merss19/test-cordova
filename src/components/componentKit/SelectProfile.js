import React from 'react'

const SelectProfile = ({ input, options, type, meta: { touched, error } }) => (
  <div className="select">
    <select {...input} className="select__field">
      {options.map(o =>
        <option value={o} key={o}>{o}</option>
      )}
    </select>
    <svg className="svg-icon ico-arrow-accordion">
      <use xlinkHref="#ico-arrow-accordion"></use>
    </svg>
    {touched && error && <span>{error}</span>}
  </div>
)

export default SelectProfile
