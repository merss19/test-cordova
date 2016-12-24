import React from 'react'
import InputElement from 'react-input-mask'

const InputProfilePhone = ({ input, title, placeholder, type, meta: { touched, error } }) => (
  <div className="input input--box">
    {/* <input {...input} type={type || 'text'} placeholder={placeholder} className="input__field"/> */}
    <InputElement {...input} mask="+7 999 999 9999" placeholder={placeholder} className="input__field" maskChar=" "/>
    {touched && error && <span>{error}</span>}
  </div>
)

export default InputProfilePhone
