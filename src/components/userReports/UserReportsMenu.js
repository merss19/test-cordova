import React from 'react'
import {Link} from 'react-router'

export default () => (
  <div className="user-reports-menu">
    <Link
      className="user-reports-menu__item"
      to="/userReports/events">События</Link>
    <Link
      className="user-reports-menu__item"
      to="/userReports/qa">Вопросы/ответы</Link>
    <Link
      className="user-reports-menu__item"
      to="/userReports/pendingProfiles">Утверждение профилей</Link>
    <Link
      className="user-reports-menu__item"
      to="/userReports/pendingInsurance">Утверждение страховок</Link>
  </div>
)
