import React, { Component } from 'react'



class ConditionItem extends Component {

	constructor(props) {
		super(props);
		this.state = {
			selected: ''
		}
	}

	handleClick(filter){
		this.setState({
			selected:filter
		})
		this.props.onChangeCondition(filter)

	}


  render() {
	const {item, input} = this.props
    return (
	    <li onClick={this.handleClick.bind(this,item.filter)}
	        className={"your-condition__item " + (this.props.selected === item.filter ? 'your-condition__item--active' : '')}>
		    <input {...input} type='radio'  className="condition__input"/>
		  <span className="your-condition__ico">
		    <svg className={"svg-icon " + item.class}>
			    <use xlinkHref={'#' + item.class}></use>
		    </svg>
		  </span>
		    <p className="your-condition__title">{item.title}</p>
	    </li>
    )
  }
}

export default ConditionItem
