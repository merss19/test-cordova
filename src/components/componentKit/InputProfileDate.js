import React from 'react'
const style = {
  color: 'red',
  fontSize: '12'
}

const InputProfileDate = ({ input, disabled, title, placeholder, val,  type, meta: { touched, error } }) => (
  <div className="input input--box">
    {disabled ? <input disabled {...input} type={type || 'text'} placeholder={placeholder} className="input__field input__field--date" value={val} />
      : <input {...input} type={type || 'text'} placeholder={placeholder} className="input__field input__field--date" value={val} />
    }
    {touched && error && <span style={style}>{error}</span>}
  </div>
)

export default InputProfileDate
