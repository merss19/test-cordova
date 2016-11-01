import React from 'react';

const statusStyles = {};
const dateStyles = {};
const adminStyles = {};
const commentsStyles = {};

function getComments(comments) {
  const items = [];
  comments.forEach((c) => {
    items.push(
      <div>
        <div>{c.author}: </div>
        <div>{c.text} </div>
        <img src={c.photo}/>
      </div>
    );
  });

  return items;
}

const TasksAccordionHeader = ({ children, comments }) => {
  return (
    <div>{getComments(comments)}</div>
  );
};

TasksAccordionHeader.propTypes = {
  children: React.PropTypes.string.isRequired,
  onClick: React.PropTypes.func,
};

export default TasksAccordionHeader;
