import React from 'react';

const taskTitleStyles = {
  borderRadius: 5,
  textAlign: 'center',
  color: '#1F447B',
  fontFamily: 'Helvetica',
  fontSize: 19,
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
