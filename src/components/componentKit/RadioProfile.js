import React from 'react'
const style = {
  color: 'red',
  fontSize: '12'
}

const RadioProfile = ({ input, title, value, name, id, meta: { touched, error } }) => (
  <span className="radio">
    <label className="radio__label" htmlFor={id}>
      <input {...input} className="radio__field" id={id} type='radio' name={name}/>
      <span className="radio__ph"></span>
      <span>{title}</span>
    </label>
    {touched && error && <span style={style}>{error}</span>}
  </span>
)

export default RadioProfile
