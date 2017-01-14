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
    const { days, token, isFetching, editDay, dayIntro, dayDate,
      programs, editor, content, programShow, selectedDays, dispatch, dayId } = this.props
    const isEmpty = !programs || !days
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
        <Header burger={false} isTask={true}/>
        {isFetching
          ? <LoadingView title="Загружается..."/>
          : <div style={{ opacity: isFetching ? 0.5 : 1 }}>
              <div className="layout__inner">
                <DayEditorValidationForm
                  calendar={days}
                  program={this.props.params.program}
                  editDay={editDay}
                  hideCreatePoll={false}
                  date={dayDate}
                  programs={programs}
                  editor={editor}
                  content={content}
                  onSubmit={data => {


                    this.refs.loadingModal.show()

                    if (data && data.tasks && data.tasks[0]) {
                      data.programTasks[0].customName = data.customName ? data.customName : ''
											data.programTasks[0].program = programShow
                      data.programTasks[0].intro = content[0] ? JSON.stringify(content[0]) : JSON.stringify(editor[0])
                      data.programTasks[0].introHTML = dayIntro[0] ? dayIntro[0] : 'test'
                      data.programTasks[0].program = programShow
                      data.programTasks[0].tasks = data.tasks
                    } else {
                      data.programTasks = [{}]
                      data.programTasks[0] = {
                        customName:data.customName,
                        program: programShow,
                        intro: content[0] ? JSON.stringify(content[0]) : JSON.stringify(editor[0]),
                        introHTML: dayIntro[0] ? dayIntro[0] : 'test'
                      }
                    }

                    delete data.program
                    delete data.tasks

                    // data.intro = JSON.stringify(content)
                    // data.introHTML = dayIntro
                    let url = `${api}/data/adminday-create`
                    data.date = moment(dayDate).format('YYYY-MM-DD')
                    if (dayId && dayId !== '-') {
                      data.id = dayId
                      url = `${api}/data/adminday-update`
                    } else {
                      data.forceNew = true
                    }

                    const payload = {
                      authToken: token ? token : cookie.load('token'),
                      data
                    }

                    const headers = {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json'
                    }


                    const method = 'POST'
                    if ((content[0] && dayIntro[0]) || editor[0] && programShow) {
                      return fetch(url, {
                        headers,
                        method,
                        body: JSON.stringify(payload)
                      })
                      .then(response => response.json())
                      .then(json => {

                        this.refs.loadingModal.hide()
                        if (json.errorCode === 1) {
                          this.refs.successPromoModal.show()
                        } else {
                          this.refs.errorModal.show()
                        }
                      })
                    } else {
                      this.refs.errorModal.show()
                    }
                }}/>
                <Modal ref='loadingModal' contentStyle={contentStyle}>
                  <h2>Подождите...</h2>
                </Modal>
                <Modal ref='errorModal' contentStyle={contentStyle}>
                  <h2>Что-то пошло не так, попробуйте снова</h2>
                  <br/>
                  <button className="btn btn--action" onClick={() => {
                    this.refs.loadingModal.hide()
                    this.refs.errorModal.hide()
                  }}>
                    Продолжить
                  </button>
                </Modal>
                <Modal ref='successPromoModal' contentStyle={contentStyle}>
                  <h2>Изменения сохранены</h2>
                  <br/>
                  <button className="btn btn--action" onClick={() => {
                    this.refs.loadingModal.hide()
                    dispatch({ type: 'CONTENT_RESET' })
                    dispatch({ type: 'DAY_INTRO_RESET' })
                    dispatch({ type: 'EDITOR_RESET' })
                    dispatch({ type: 'DAY_ID', id: '-' })
                    dispatch({ type: 'PROGRAM_SHOW', programShow: 0 })
                    dispatch(actions.fetchDaysIfNeeded(selectedDays))
                  }}>
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
    userToken, editDay, dayIntro, dayDate, editor, content, programShow, dayId } = state
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
    programShow,
    editor,
    content,
    dayId,
    token: userToken.token
  }
}

DayEditor = connect(
  mapStateToProps
)(DayEditor)

export default DayEditor
