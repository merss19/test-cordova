import React from 'react'
import { Link } from 'react-router'

const MenuButton = ({ children, onClick, icon, link }) => (
	<Link to={link} href="#" onClick={onClick} className="main-nav__item-inner" activeClassName = "main-nav__item-inner--active">
	    <svg className={"svg-icon " + icon}>
	      <use xlinkHref={"#" + icon }/>
	    </svg>
	    <span className="main-nav__title">{children}</span>
	</Link>
)

MenuButton.propTypes = {
  children: React.PropTypes.string.isRequired,
  onClick: React.PropTypes.func,
}

export default MenuButton
