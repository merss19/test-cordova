import React from 'react';
import ExerciseTitle from './ExerciseTitle';
import TaskButton from '../TaskButton';
import { Grid, Row, Col } from 'react-bootstrap';

const headerStyles = {
  height: 70,
  backgroundColor: '#FCFDFD',
};

const hairLineStyles = {
  height: 1,
  backgroundColor: '#70CFFE',
};

const Header = ({ children, onClick }) => (
  <Row style={headerStyles} className="show-grid">
    <div style={hairLineStyles}/>
    <Col md={9}>
      <ExerciseTitle number='1'>{children}</ExerciseTitle>
    </Col>
    <Col md={3}>
      <TaskButton onClick={onClick}>ВЫПОЛНИТЬ 😀</TaskButton>
    </Col>
  </Row>
);

Header.propTypes = {
  children: React.PropTypes.string.isRequired,
};

export default Header;
