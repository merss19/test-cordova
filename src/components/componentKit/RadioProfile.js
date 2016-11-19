import React from 'react'

const RadioProfile = ({ input, title, name, id, meta: { touched, error } }) => (
  <span className="radio">
    <label className="radio__label" htmlFor={id}>
      <input {...input} className="radio__field" id={id} type='radio' name={name}/>
      <span className="radio__ph"></span>
      <span>{title}</span>
    </label>
  </span>
)

export default RadioProfile
