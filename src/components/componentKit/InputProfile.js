import React from 'react'
const style = {
  color: 'red',
  fontSize: '12'
}

const InputProfile = ({ input, title, placeholder, value,type, meta: { touched, error } }) => {
	console.log('InputProfile')
	console.log(input)
	console.log(value)
	return (
  <div className="input input--box">
    <input {...input} type={type || 'text'} placeholder={placeholder} className="input__field" onFocus={e => {
      e.target.placeholder = ''
    }} onBlur={e => {
      e.target.placeholder = placeholder
    }} />
    {touched && error && <span style={style}>{error}</span>}
  </div>)
}

export default InputProfile
