import React from 'react'

export default ({list = [], onChatSelect, selectedChat}) => {
  return (
    <div className="chats-list">
      {
        list
          .map((chat, index) => (
            <div
              key={index}
              className={`chats-list__item ${selectedChat === chat.id ? 'chats-list__item_selected' : ''}`}
              onClick={() => onChatSelect(chat.type, chat.typeId)}>
              <div className="chats-list__item-name">
                {chat.title || '-'}
              </div>

              <div className="chats-list__item-timestamp">
                Ожидает ответа: {chat.timePassed}
              </div>
            </div>
          ))
      }
    </div>
  )
}
