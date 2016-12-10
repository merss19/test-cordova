import React from 'react'

const ListNumTask = props => (
  <li className="num-list__item">
    <span className="num-list__number">props.num</span>
    <h6 className="num-list__title">props.name</h6>
    <p className="num-list__description">props.text</p>
  </li>
)

export default ListNumTask
