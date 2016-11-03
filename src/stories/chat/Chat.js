import React from 'react';

const chatStyles = {};

const Chat = ({ children, messages }) => (
  <div style={chatStyles}>{children}</div>
);

Chat.propTypes = {
  children: React.PropTypes.string.isRequired,
  onClick: React.PropTypes.func,
};

export default Chat;
