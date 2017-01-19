import React from 'react'
import {Link} from 'react-router'

export const ProfileListItem = ({id, fullName, waitingStatus, link, timePassed}) => (
  <div className="pending-profiles__item">
    <Link className="pending-profiles__item-link" to={link}>
      <div className="pending-profiles__item-name">
        {fullName}

        {
          waitingStatus ?
            <strong className="pending-profiles__item-status">
              {waitingStatus}
            </strong> : null
        }
      </div>

      {
        timePassed ?
          <div className="pending-profiles__item-timestamp">
            Изменил анкету: {timePassed}
          </div> : null
      }
    </Link>
  </div>
)

export default ({list, isFetching, loadMoreButton = true, onLoadMore}) => (
  <div className="pending-profiles">
    {
      list.map(item => <ProfileListItem key={item.id} {...item} />)
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
)
