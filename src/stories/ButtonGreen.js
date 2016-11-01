import React from 'react';

const buttonStyles = {
  border: '13px solid #56DAA1',
  borderRadius: 7,
  backgroundColor: '#56DAA1',
  color: '#FFFFFF',
  cursor: 'pointer',
  fontSize: 10,
  padding: '3px 10px',
  margin: 10,
};

const ButtonGreen = ({ children, onClick }) => (
  <input type={'submit'} style={buttonStyles} onClick={onClick} value={children}/>
);

ButtonGreen.propTypes = {
  children: React.PropTypes.string.isRequired,
  onClick: React.PropTypes.func,
};

export default ButtonGreen;
