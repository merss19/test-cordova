import React from 'react'

const InputProfileWithVal = ({ input, title, placeholder, val, type, meta: { touched, error } }) => (
  <div className="input input--box">
    <input {...input} type={type || 'text'} placeholder={placeholder} className="input__field" value={val}/>
    {touched && error && <span>{error}</span>}
  </div>
)

export default InputProfileWithVal
