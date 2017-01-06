import React from 'react'
const style = {
  color: 'red',
  fontSize: '12'
}

const CustomInput = ({ input, title, id, type, meta: { touched, error } }) => (
  <div className="input input--line">
    <input {...input} id={id} type={type || 'text'} className="input__field"/>
    <label className="input__label" htmlFor={id}>{title}</label>
    {touched && error && <span style={style}>{error}</span>}
  </div>
)

export default CustomInput
