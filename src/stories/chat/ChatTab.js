import React from 'react';

const buttonStyles = {};
const messageCounterStyles = {};
const hairlineStyles = {};

const ChatTab = ({ children, onClick, count }) => (
  <button
    style={buttonStyles}
    onClick={onClick}
  >
    {children}
    <div style={messageCounterStyles}>{count}</div>
    <div style={hairlineStyles}/>
  </button>
);

ChatTab.propTypes = {
  children: React.PropTypes.string.isRequired,
  onClick: React.PropTypes.func,
};

export default ChatTab;
