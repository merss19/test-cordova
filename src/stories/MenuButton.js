import React from 'react'

const buttonStyles = {
  fontFamily: 'Helvetica',
  color: '#1F447B',
  cursor: 'pointer',
  fontSize: 12,
  padding: '3px 10px',
  margin: 10,
}

const MenuButton = ({ children, href, icon }) => (
  // <div></div>
  <a href={href} className="main-nav__item-inner">
    <svg className={"svg-icon " + icon}>
      <use xlinkHref={"#" + icon }/>
    </svg>
    <span className="main-nav__title">{children}</span>
  </a>
)

MenuButton.propTypes = {
  children: React.PropTypes.string.isRequired,
  children: React.PropTypes.string.isRequired,
  onClick: React.PropTypes.func,
}

export default MenuButton
