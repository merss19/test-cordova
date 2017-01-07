import React from 'react'
import InputElement from 'react-input-mask'
const style = {
  color: 'red',
  fontSize: '12'
}

const InputDateMask = ({ input, title, placeholder, type, meta: { touched, error } }) => (
  <div className="input input--box">
    {/* <input {...input} type={type || 'text'} placeholder={placeholder} className="input__field"/> */}
    <InputElement {...input} mask="9999-99-99" placeholder={placeholder} className="input__field" maskChar=" "/>
    {touched && error && <span style={style}>{error}</span>}
  </div>
)

export default InputDateMask