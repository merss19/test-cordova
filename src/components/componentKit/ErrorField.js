import React from 'react'

const ErrorField = ({ input, meta: { touched, error } }) => (
  <div className="text-center">{touched && error && <strong>{error}</strong>}</div>
)

export default ErrorField
