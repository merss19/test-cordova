import React from 'react'

const InputProfile = ({ input, title, placeholder, type, meta: { touched, error } }) => (
  <div className="input input--box">
    <input {...input} type={type || 'text'} placeholder={placeholder} className="input__field"/>
    {touched && error && <span>{error}</span>}
  </div>
)

export default InputProfile
