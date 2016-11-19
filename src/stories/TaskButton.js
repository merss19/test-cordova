import React from 'react';

const buttonStyles = {
  border: '13px solid #70CFFE',
  borderRadius: 7,
  backgroundColor: '#70CFFE',
  color: '#FFFFFF',
  cursor: 'pointer',
  fontSize: 10,
  margin: 10,
};

const buttonCompleteStyles = {
  border: '13px solid #56DAA1',
  borderRadius: 7,
  backgroundColor: '#56DAA1',
  color: '#FFFFFF',
  cursor: 'pointer',
  fontSize: 10,
  margin: 10,
};

const TaskButton = ({ children, onClick, complete }) => {
  if (complete) {
    return (
      <button style={buttonCompleteStyles} onClick={onClick}>
        {children}
      </button>
    );
  } else {
    return (
      <button style={buttonStyles} onClick={onClick}>
        {children}
      </button>
    );
  }
};

TaskButton.propTypes = {
  children: React.PropTypes.string.isRequired,
  onClick: React.PropTypes.func,
};

export default TaskButton;
