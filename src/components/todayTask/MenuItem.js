import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import MenuButton from '../../stories/MenuButton'


const MenuItem = ({item, active}) => (
	<li className="main-nav__item fghfg">
		<MenuButton link={item.link}
		            icon={item.icon}>{item.name}</MenuButton>
	</li>
)


export default MenuItem
