import React from 'react'

const RadioProfile = ({ input, title, val, name, id, meta: { touched, error } }) => (
  <span className="radio">
    <label className="radio__label" htmlFor={id}>
      <input {...input} className="radio__field" id={id} type='radio' name={name} value={val}/>
      <span className="radio__ph"></span>
      <span>{title}</span>
    </label>
    {touched && error && <span>{error}</span>}
  </span>
)

export default RadioProfile
