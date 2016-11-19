import React from 'react';

const ButtonPoll = ({ children, onClick }) => (
  <li className="options__item" onClick={onClick}>{children}</li>
);

ButtonPoll.propTypes = {
  children: React.PropTypes.string.isRequired,
  onClick: React.PropTypes.func,
};

export default ButtonPoll;
