import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import Header from '../../stories/Header'
import Menu from './Menu'
import DayEditorValidationForm from './DayEditorValidationForm'
import LoadingView from '../componentKit/LoadingView'

class DayEditor extends Component {
  componentDidMount() {
    const { dispatch, selectedDays } = this.props
    dispatch(actions.fetchDaysIfNeeded(selectedDays))
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedDays !== this.props.selectedDays) {
      const { dispatch, selectedDays } = nextProps
      dispatch(actions.fetchDaysIfNeeded(selectedDays))
    }
  }

  render() {
    const { days, token, isFetching, editDay } = this.props
    const isEmpty = !days || !days[0]
    const id = this.props.params.id
    let initialValues = {}

    if (!isEmpty && id) {
      initialValues = {
        tasks: days[id].tasks || [],
        customIcon: days[id].customIcon || '',
        customName: days[id].customName || ''
      }
    }

    return (
      <div className='layout'>
        <Header burger={false} />
        {isEmpty
          ? (isFetching
            ? <LoadingView title="Загружается..."/>
            : <LoadingView title="Ничего не найдено"/>)
          : <div style={{ opacity: isFetching ? 0.5 : 1 }}>
              <div className="layout__inner">
                <DayEditorValidationForm
                  calendar={days}
                  program={this.props.params.program}
                  editDay={editDay}
                  hideCreatePoll={false}
                  // initialValues={editDay}
                  onSubmit={ data => {
                    console.log(this.props.params.id)
                    console.log(this.props.params.program)
                    console.log(data)
                }}/>
              </div>
            </div>
          }
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { selectedDays, recivedDays, userToken, editDay } = state
  const {
    isFetching,
    days,
  } = recivedDays[selectedDays] || {
    isFetching: true,
    days: []
  }

  return {
    selectedDays,
    isFetching,
    days,
    editDay,
    token: userToken.token
  }
}

DayEditor = connect(
  mapStateToProps
)(DayEditor)

export default DayEditor
