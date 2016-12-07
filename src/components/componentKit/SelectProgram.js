import React from 'react'

const SelectProgram = ({ input, options, type, meta: { touched, error } }) => (
  <div className="select">
    <select {...input} className="select__field">
      {options.map(o =>
        <option value={o.value} key={o.name}>{o.name}</option>
      )}
    </select>
    <svg className="svg-icon ico-arrow-accordion">
      <use xlinkHref="#ico-arrow-accordion"></use>
    </svg>
    {touched && error && <span>{error}</span>}
  </div>
)

export default SelectProgram
