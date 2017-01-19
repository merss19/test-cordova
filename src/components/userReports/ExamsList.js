import React from 'react'
import {Link} from 'react-router'

export default ({title, list, unread, isFetching, loadMoreButton = true, onLoadMore}) => (
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

      {/* {
        loadMoreButton ? (
          <button
            onClick={!isFetching ? onLoadMore : null}
            className="pending-profile__load-more btn btn--action">
            {isFetching ? 'Загружается...' : 'Загрузить больше'}
          </button>
        ) : null
      } */}
    </div>
  </div>
)
