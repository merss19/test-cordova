import React from 'react';

const ButtonPoll = ({ children, onClick }) => (
  <input type={'submit'} onClick={onClick} value={children}/>
);

ButtonPoll.propTypes = {
  children: React.PropTypes.string.isRequired,
  onClick: React.PropTypes.func,
};

export default ButtonPoll;
