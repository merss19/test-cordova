import React from 'react';

const taskTitleStyles = {
  textAlign: 'center',
  backgroundColor: '#1F447B',
  color: '#FFFFFF',
  fontFamily: 'Helvetica',
  fontSize: 25,
  padding: '3px 10px',
  margin: '5px 10px',
};

const TaskTitle = ({ children }) => (
  <div style={taskTitleStyles}>
    {children}
  </div>
)

TaskTitle.propTypes = {
  children: React.PropTypes.string.isRequired,
};

export default TaskTitle;
