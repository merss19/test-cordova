import React from 'react'
import {Link} from 'react-router'

export default () => (
  <div className="user-reports-menu">
    <Link
      className="user-reports-menu__item"
      to="/userReports/chats">Чаты</Link>
    <Link
      className="user-reports-menu__item"
      to="/userReports/photos">Фото до/после</Link>
    <Link
      className="user-reports-menu__item"
      to="/userReports/exams">Экзамены и зачёты</Link>
    <Link
      className="user-reports-menu__item"
      to="/userReports/pendingProfiles">Утверждение профилей</Link>
    <Link
      className="user-reports-menu__item"
      to="/userReports/pendingInsurance">Утверждение страховок</Link>
  </div>
)
