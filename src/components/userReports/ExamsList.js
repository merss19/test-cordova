import React from 'react'
import {Link} from 'react-router'

export default ({title, list, unread}) => (
  <div className="chat-group">
    <div className="chat-group__header">
      <div className="chat-group__name">
        {title}
      </div>
    </div>

    <div className="chat-group__body">
      {
        list.map((item, index) => (
          <Link
            to={item.link}
            key={index}
            className="chats-list__item">
            <div className="chats-list__item-name">
              {`${item.fullName} / ${item.status}`}
            </div>
          </Link>
        ))
      }
    </div>
  </div>
)
