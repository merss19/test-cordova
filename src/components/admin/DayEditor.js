import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import Header from '../../stories/Header'
import Menu from './Menu'
import CalendarList from './CalendarList'
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
    const { days, token, isFetching } = this.props
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
                <div className="grid">
                  <div className="1/4--desk grid__cell layout__menu">
                    <div className="grid layout__menu-inner">
                      <Menu/>
                      <CalendarList
                        calendar={days}
                        program={this.props.params.program}
                        initialValues={initialValues}
                      />
                    </div>
                  </div>
                  <div className="3/4--desk 1/1--pocket grid__cell layout__content">
                    <div className="stage-box stage-box--small-padding">
                      <DayEditorValidationForm
                        initialValues={initialValues}
                        onSubmit={ data => {
                          console.log(this.props.params.id)
                          console.log(this.props.params.program)
                          console.log(data)
                      }}/>
                    </div>
                  </div>
                </div>
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
