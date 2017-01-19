import React, { Component } from 'react'
import MenuItem from './MenuItem'
import { browserHistory } from 'react-router'
import { Link } from 'react-router'

const menuList = [
	{
		name: 'Задания',

		active: true,
		link:'task',
		icon:'ico-m-tasks'
	},
	{
		name: 'Зачетка',
		active: false,
		link:'reports',
		icon:'ico-m-book'
	},
	{
		name: 'Питание',
		active: false,
		link:'food',
		icon:'ico-m-food'
	},
	{
		name: 'Вопросы/Ответы',
		active: false,
		link:'faq',
		icon:'ico-m-faq'
	},
	{
		name: 'Фото',
		active: false,
		link:'photos',
		icon:'ico-photo'
	}
]
class Menu extends Component {

	render() {
		const { fullName, changeActive,active} = this.props


		return(
			<div className="2/3 grid__cell layout__menu-nav">
				<ul className="main-nav">
					{menuList.map((item, index) => {
						return (
							<MenuItem key={index}
							          item={item}
							/>
						)
					})}
				</ul>
				<hr/>
				<div className="profile">
					<Link to="/profile">
						<p className="profile__name">{fullName && fullName !== ' undefined' && fullName !== ' ' ? fullName : 'Участник'}</p>
						<p className="profile__sub-text">Профиль</p>
					</Link>
				</div>
				<hr/>
				<ul className="banner-ls">
					<li className="banner-ls__item">
						<div className="btn btn--primary" onClick={() => browserHistory.push('/season')}>
							Записаться на 2-ой сезон
							{/* <div className="banner-ls__img">
							 <img src="/tmp/banner-2.png" alt=""/>
							 </div>
							 <p className="banner-ls__desc">В твой выходной день только сегодня TezTour дарит -10% на тур</p> */}
						</div>
					</li>
				</ul>
			</div>
		)
	}

}
export default Menu
