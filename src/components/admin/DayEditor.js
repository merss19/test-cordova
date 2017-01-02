import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import Header from '../../stories/Header'
import Menu from './Menu'
import DayEditorValidationForm from './DayEditorValidationForm'
import LoadingView from '../componentKit/LoadingView'
import cookie from 'react-cookie'
import moment from 'moment'
import { api } from '../../config.js'
import Modal from 'boron/FadeModal'

let contentStyle = {
  borderRadius: '18px',
  padding: '30px'
}

class DayEditor extends Component {
  componentDidMount() {
    const fbScript = document.createElement("script")
    fbScript.text = "fbq('track', 'PageView');"
    document.body.appendChild(fbScript)

    const { dispatch, selectedDays, selectedPrograms } = this.props
    dispatch(actions.fetchDaysIfNeeded(selectedDays))
    dispatch(actions.fetchProgramsIfNeeded(selectedPrograms))
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch, selectedDays, selectedPrograms } = nextProps

    if (nextProps.selectedDays !== this.props.selectedDays)
      dispatch(actions.fetchDaysIfNeeded(selectedDays))

    if (nextProps.selectedPrograms !== this.props.selectedPrograms)
      dispatch(actions.fetchProgramsIfNeeded(selectedPrograms))
  }

  render() {
    const { days, token, isFetching, editDay, dayIntro, dayDate, programs } = this.props
    const isEmpty = !programs || !days
    console.log(days)
    // const id = this.props.params.id
    // let initialValues = {}

    //
    // if (days && days[0] && id) {
    //   initialValues = {
    //     tasks: days[id].tasks || [],
    //     customIcon: days[id].customIcon || '',
    //     customName: days[id].customName || ''
    //   }
    // }

    return (
      <div className='layout'>
        <Header burger={false} />
        {isEmpty
          ? isFetching
            ? <LoadingView title="Загружается..."/>
            : <LoadingView title="Ничего не найдено"/>
          : <div style={{ opacity: isFetching ? 0.5 : 1 }}>
              <div className="layout__inner">
                <DayEditorValidationForm
                  calendar={days}
                  program={this.props.params.program}
                  editDay={editDay}
                  hideCreatePoll={false}
                  date={dayDate}
                  programs={programs}
                  onSubmit={ data => {
                    this.refs.loadingModal.show()
                    console.log(this.props.params.id)
                    console.log(this.props.params.program)

                    data.programTasks = data.programTasks.filter(t => {
                      return t.id !== 4
                    }).map(task => {
                      const copy = { ...task, program: task.id }
                      const {id, ...newTask} = copy
                      return newTask
                    })

                    data.intro = dayIntro
                    data.date = moment(dayDate).format('YYYY-MM-DD')

                    const payload = {
                      authToken: token ? token : cookie.load('token'),
                      data
                    }

                    const headers = {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json'
                    }

                    console.log(payload)

                    const method = 'POST'
                    return fetch(`${api}/data/adminday-create`, {
                      headers,
                      method,
                      body: JSON.stringify(payload)
                    })
                    .then(response => response.json())
                    .then(json => {
                      console.log(json)
                      this.refs.loadingModal.hide()
                      if (json.errorCode === 1) {
                        this.refs.successPromoModal.show()
                      } else {
                        this.refs.errorModal.show()
                      }
                    })
                }}/>
                <Modal ref='loadingModal' contentStyle={contentStyle} backdrop={false}>
                  <h2>Подождите...</h2>
                </Modal>
                <Modal ref='errorModal' contentStyle={contentStyle}>
                  <h2>Что-то пошло не так, попробуйте снова</h2>
                  <br/>
                  <button className="btn btn--action" onClick={() => this.refs.errorModal.hide()}>
                    Продолжить
                  </button>
                </Modal>
                <Modal ref='successPromoModal' contentStyle={contentStyle}>
                  <h2>Изменения сохранены</h2>
                  <br/>
                  <button className="btn btn--action" onClick={() => this.refs.successPromoModal.hide()}>
                    Продолжить
                  </button>
                </Modal>
              </div>
            </div>
          }
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { selectedPrograms, recivedPrograms, selectedDays, recivedDays,
    userToken, editDay, dayIntro, dayDate } = state
  const {
    isFetching,
    days,
  } = recivedDays[selectedDays] || {
    isFetching: true,
    days: []
  }

  const { programs } = recivedPrograms[selectedPrograms] || []

  return {
    selectedDays,
    selectedPrograms,
    isFetching,
    days,
    editDay,
    dayIntro,
    dayDate,
    programs,
    token: userToken.token
  }
}

DayEditor = connect(
  mapStateToProps
)(DayEditor)

export default DayEditor
