import React from 'react'

const RadioProfileHidden = ({ input, val, key, onClick, name, meta: { touched, error } }) => (
  <li key={index} className="options__item" id={`sports[${key}]`} onClick={onClick}>
    <input {...input} type='radio' name={name} style={{visibility: 'hidden', margin: -5}} value={val}/>
    {val}
  </li>
)

export default RadioProfileHidden
