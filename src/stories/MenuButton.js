import React from 'react'

const MenuButton = ({ children, onClick, icon }) => (
  // <div></div>
  <a href="#" onClick={onClick} className="main-nav__item-inner">
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
