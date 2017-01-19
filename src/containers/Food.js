import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'

import MainComponent from '../components/food/MainComponent'
import LoadingView from '../components/componentKit/LoadingView'

//import fetchTaskDayIfNeeded from '../actions/taskDay'


class Food extends Component {
  componentDidMount() {
    const { dispatch, selectedFood ,fetchTaskDayIfNeeded, selectedTaskDay} = this.props
    dispatch(actions.fetchFoodProgramIfNeeded(selectedFood))

	  dispatch(actions.fetchTaskDayIfNeeded(selectedFood))
	  console.log('good-didmount')
	  console.log(this.props.bufer)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedFood !== this.props.selectedFood) {
      const { dispatch, selectedFood } = nextProps
      dispatch(actions.fetchFoodProgramIfNeeded(selectedFood))
    }
  }

  handleChange = nextFood => {
    this.props.dispatch(actions.selectFood(nextFood))
  }

  handleRefreshClick = e => {
    e.preventDefault()

    const { dispatch, selectedFood } = this.props
    dispatch(actions.invalidateFood(selectedFood))
    dispatch(actions.fetchFoodProgramIfNeeded(selectedFood))
  }

  render() {

    const { food, token, isFetching ,taskDay} = this.props


    const isEmpty = !food || !food[0] && !taskDay|| !taskDay.data || taskDay.data.length === 0

    return (
      <div className={isEmpty ? 'entry__inner' : 'layout'}>
        {isEmpty
          ? (!isFetching ? <LoadingView title="Загружается..."/> : <LoadingView title="Ничего не найдено"/>)
          : <div style={{ opacity: isFetching ? 0.5 : 1 }}>
              <MainComponent token={token} food={food[0]} taskDay={taskDay.data[0]}  />
            </div>
        }
      </div>
    )
  }
}

const mapStateToProps = state => {

  const { selectedFood,selectedTaskDay, recivedTaskDay, recivedFood, userToken } = state


  const {
    isFetching,
    lastUpdated,
    food
  } = recivedFood[selectedFood] || {
    isFetching: true,
    food: {}
  },
  {taskDay} = recivedTaskDay[selectedTaskDay] || {
	  isFetching: true,
	  taskDay: {}
  }

  return {
    selectedFood,
    isFetching,
    lastUpdated,
    food,
    taskDay,
    recivedTaskDay,
    token: userToken.token
  }
}

Food = connect(
  mapStateToProps
)(Food)

export default Food
