import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

const headerStyles = {
  height: 40,
  backgroundColor: '#56D0FC',
};

const Header = ({ children }) => (
  <Grid style={headerStyles}>
    <Row>
      <Col md={10}>
        <img src='/Users/vao/Desktop/logo.png'/>
      </Col>
      <Col md={2}>
        <img src='/Users/vao/Desktop/alpha_logo.png'/>
      </Col>
    </Row>
  </Grid>
)

Header.propTypes = {
  children: React.PropTypes.string.isRequired,
};

export default Header;
