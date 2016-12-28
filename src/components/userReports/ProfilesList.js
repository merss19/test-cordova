import React from 'react'
import {Link} from 'react-router'

export const ProfileListItem = ({id, fullName, waitingStatus, link, timePassed}) => (
  <li className="pending-profiles__item">
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
  </li>
)

export default ({list}) => (
  <div className="pending-profiles">
    {
      list.map(item => <ProfileListItem key={item.id} {...item} />)
    }
  </div>
)
