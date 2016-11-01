import React from 'react';

const textStyles = {};
const dateStyles = {};
const adminStyles = {};

const CalendarDayModal = ({ children, date, admin }) => (
  <div>
    <div style={textStyles}>
      {children}
    </div>
    <div style={dateStyles}>
      {date}
    </div>
    <div style={adminStyles}>
      {admin}
    </div>
  </div>
);

CalendarDayModal.propTypes = {
  children: React.PropTypes.string.isRequired,
  onClick: React.PropTypes.func,
};

export default CalendarDayModal;
