import React from 'react';

const CustomInput = ({ input, title, name, id, type, meta: { touched, error } }) => (
  // <Row>
  //   <Col md={3}>
  //     <label>{title}</label>
  //   </Col>
  //   <Col md={6}>
  //     <input {...input} placeholder={title} type={type || 'text'}/>
  //     {touched && error && <span>{error}</span>}
  //   </Col>
  // </Row>
  <div className="input input--line">
    <input {...input} id={id} type={type || 'text'} className="input__field"/>
    <label className="input__label" htmlFor={id}>{title}</label>
    {touched && error && <span>{error}</span>}
  </div>
);

export default CustomInput;
