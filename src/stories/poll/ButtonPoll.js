import React from 'react';

const ButtonPoll = ({ children, onClick }) => (
  <li className="question-form__option" onClick={onClick}>{children}</li>
);

ButtonPoll.propTypes = {
  children: React.PropTypes.string.isRequired,
  onClick: React.PropTypes.func,
};

export default ButtonPoll;
