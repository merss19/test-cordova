import React from 'react';

const linkStyles = {
  color: '#1F447B',
  cursor: 'pointer',
  fontSize: 10,
  padding: '3px 10px',
  margin: 10,
};

const LinkClose = ({ children, onClick }) => (
  <a href={'#'} style={linkStyles} onClick={onClick}>
    {children}
  </a>
);

LinkClose.propTypes = {
  children: React.PropTypes.string.isRequired,
  onClick: React.PropTypes.func,
};

export default LinkClose;
