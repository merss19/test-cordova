import React from 'react'

export default ({list = [], onChatSelect, selectedChat}) => {
	console.log('chatlisttttttt')
	console.log(list)
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
                {chat.hasMessages ? (chat.isAnswered ? 'Отвечено' : `Ожидает ответа: ${chat.timePassed}`) : 'Пустой'}
              </div>
            </div>
          ))
      }
    </div>
  )
}
