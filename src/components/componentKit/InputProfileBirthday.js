import React from 'react'

const InputProfileBirthday = ({ input, title, placeholder, type, meta: { touched, error } }) => (
  <div className="input input--box mb30">
    <input {...input} type={type || 'text'} placeholder={placeholder} className="input__field input__field--date"/>
    {touched && error && <span>{error}</span>}
  </div>
)

export default InputProfileBirthday
