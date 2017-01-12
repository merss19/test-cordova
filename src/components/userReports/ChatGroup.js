import React from 'react'

import ChatList from './ChatList'

export default ({title, unread, list, onChatSelect, selectedChat}) => (
  <div className="chat-group">
    <div
      className="chat-group__header">
      <div className="chat-group__name">
        {title}
      </div>

      <div className="chat-group__unread">
        Непрочитанных

        <div className="chat-group__counter">
          {unread}
        </div>
      </div>
    </div>

    <div className="chat-group__body">
      <ChatList
        list={list}
        selectedChat={selectedChat}
        onChatSelect={onChatSelect}/>
    </div>
  </div>
);
