import React from 'react';

const buttonStyles = {
  border: '1px solid #FFFFFF',
  borderRadius: 7,
  backgroundColor: '#56D0FC',
  color: '#FFFFFF',
  cursor: 'pointer',
  fontSize: 10,
  padding: '3px 10px',
  margin: 10,
};

const ButtonPoll = ({ children, onClick }) => (
  <input type={'submit'} style={buttonStyles} onClick={onClick} value={children}/>
);

ButtonPoll.propTypes = {
  children: React.PropTypes.string.isRequired,
  onClick: React.PropTypes.func,
};

export default ButtonPoll;
