import React from 'react'
const style = {
  color: 'red',
  fontSize: '12'
}

const InputModal = ({ input, title, placeholder, type, meta: { touched, error } }) => (
  <div className="input input--box fill-report--input-info">
    <input {...input} type={type || 'text'} placeholder={placeholder} className="input__field"/>
    {touched && error && <span style={style}>{error}</span>}
  </div>
)

export default InputModal
