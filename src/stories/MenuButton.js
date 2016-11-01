import React from 'react';

const buttonStyles = {
  fontFamily: 'Helvetica',
  color: '#1F447B',
  cursor: 'pointer',
  fontSize: 12,
  padding: '3px 10px',
  margin: 10,
};

const MenuButton = ({ children, href }) => (
  <div>
    <a style={buttonStyles} href={href}>
      {children}
    </a>
    <br/>
  </div>
);

MenuButton.propTypes = {
  children: React.PropTypes.string.isRequired,
  onClick: React.PropTypes.func,
};

export default MenuButton;
