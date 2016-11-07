import React from 'react';
import { Row, Col } from 'react-bootstrap';

const CustomInput = ({ input, title, name, type, meta: { touched, error } }) => (
  <Row>
    <Col md={3}>
      <label>{title}</label>
    </Col>
    <Col md={6}>
      <input {...input} placeholder={title} type={type || 'text'}/>
      {touched && error && <span>{error}</span>}
    </Col>
  </Row>
);

export default CustomInput;
