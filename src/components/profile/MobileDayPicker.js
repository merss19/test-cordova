import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux'

//import DatePicker from './DatePicker'
import DatePicker from 'react-mobile-datepicker';

function convertDate(date, formate) {
	const year = date.getFullYear();
	let month = date.getMonth() + 1;
	let day = date.getDate();
	const hour = date.getHours();
	const minute = date.getMinutes();
	const second = date.getSeconds();

	if(month < 10) month = '0' + month
	if(day < 10) day = '0' + day

	return formate
		.replace(/Y+/, year)
		.replace(/M+/, month)
		.replace(/D+/, day)
		.replace(/h+/, hour)
		.replace(/m+/, minute)
		.replace(/s+/, second);
}

class MobileDayPicker extends Component {

	state = {
		time: new Date(),
		isOpen: false,
	}

	handleClick = () => {
		this.setState({ isOpen: true });
	}

	handleCancel = () => {
		this.setState({ isOpen: false });
	}

	handleSelect = (time) => {

		const { birthday, babyBirthday, babyFeed } = this.props
		this.setState({ time, isOpen: false });


		switch (this.props.input.name) {
			case 'birthday':
				this.props.dispatch({ type: 'BIRTHDAY', birthday: moment(time).format('YYYY-MM-DD') })
				break
			case 'babyBirthday':
				this.props.dispatch({ type: 'BABY_BIRTHDAY', babyBirthday: moment(time).format('YYYY-MM-DD') })
				break
			case 'lastBabyFeedMonth':
				this.props.dispatch({ type: 'BABY_FEED', babyFeed: moment(time).format('YYYY-MM-DD') })
				break
			default:
				this.props.dispatch({ type: 'BIRTHDAY', birthday: moment(time).format('YYYY-MM-DD') })
		}
	}

  componentDidMount() {
	  console.log('componentDidMount')
	 let navs = document.querySelectorAll('.datepicker-navbar-btn')
	 console.log(navs)
		  navs[1].innerHTML = 'Отмена'
		  navs[0].innerHTML = 'Выбрать'


	  let value = this.day

	  value = this.reverseData(value)
	  value = this.toEuroFormat(value)

	  this.setState({
		  time: value,
	  })

  }


	reverseData(data){

		if(data.indexOf('-') === 4){
			data.split('-')
		}
		const newData = data.split('-').reverse().join('-')
		return newData
	}

	toEuroFormat(value){
		const  arr = value.split('-')
		let data = new Date(parseInt(arr[2]), parseInt(arr[1])-1, parseInt(arr[0]))
		return data
	}

	get day(){
		const { birthday, babyBirthday, babyFeed } = this.props
		let value
		switch (this.props.input.name) {
			case 'birthday':
				value = birthday
				break
			case 'babyBirthday':
				value = babyBirthday
				break
			case 'lastBabyFeedMonth':
				value = babyFeed
				break
			default:
				value = birthday
		}
		return value
	}

  render() {
	  const { input, name, placeholder,  birthday, babyBirthday, babyFeed } = this.props

    return (
	    <div className="datepicker-wrapper">
		    <input
			    name={name}
			    className="select-btn"
			    onClick={this.handleClick}
			    value={convertDate(this.state.time, 'DD-MM-YYYY')}
			    />



		    <DatePicker
			    min= {new Date(1922, 0, 1)}
			    max= {new Date()}
			    value={this.state.time}
			    isOpen={this.state.isOpen}
			    onSelect={this.handleSelect}
			    onCancel={this.handleCancel}
		    />
	    </div>

  )
  }
}

const mapStateToProps = state => {
  const { birthday, babyBirthday, babyFeed } = state
  return {
    birthday,
    babyBirthday,
    babyFeed
  }
}

MobileDayPicker = connect(
  mapStateToProps
)(MobileDayPicker)

export default MobileDayPicker
