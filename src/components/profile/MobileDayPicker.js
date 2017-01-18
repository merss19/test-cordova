import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux'

import DatePicker from './DatePicker'

class MobileDayPicker extends Component {

  constructor(props) {
    super(props);
	  this.state = {
		  date: ''
	  };

  }

  componentDidMount() {

	  let value = this.day

	  value = this.reverseData(value)
	  value = this.toEuroFormat(value)

	  this.setState({
		  date:value
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

	onConfirm(data) {

		this.setState({
			date:data
		})

		switch (this.props.input.name) {
			case 'birthday':
				this.props.dispatch({ type: 'BIRTHDAY', birthday: moment(data).format('YYYY-MM-DD') })
				break
			case 'babyBirthday':
				this.props.dispatch({ type: 'BABY_BIRTHDAY', babyBirthday: moment(data).format('YYYY-MM-DD') })
				break
			case 'lastBabyFeedMonth':
				this.props.dispatch({ type: 'BABY_FEED', babyFeed: moment(data).format('YYYY-MM-DD') })
				break
			default:
				this.props.dispatch({ type: 'BIRTHDAY', birthday: moment(data).format('YYYY-MM-DD') })
		}
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

    return (
	    <div>
		    <DatePicker min ={'01 Jan 1917'}
		                max ={'01 Jan 2017'}
		                defaultDate ={this.state.date}
		                onConfirm ={this.onConfirm.bind(this)}
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
