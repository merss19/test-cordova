import React from 'react';

const statusStyles = {};
const dateStyles = {};
const adminStyles = {};
const commentsStyles = {};

const TasksAccordionHeader = ({ children, task }) => {
  return (
    <div>
      <div style={statusStyles}>{task.status}</div>
      <div style={dateStyles}>{task.date}</div>
      <div style={adminStyles}>{task.admin}</div>
      <div style={commentsStyles}>{task.comments.length} комментарий</div>
    </div>
  );
};

TasksAccordionHeader.propTypes = {
  children: React.PropTypes.string.isRequired,
  onClick: React.PropTypes.func,
};

export default TasksAccordionHeader;
