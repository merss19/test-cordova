import React, { Component } from 'react'
import { Editor } from 'react-draft-wysiwyg'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import '../../../public/react-draft-wysiwyg.css'
import * as actions from '../../actions'
import { convertFromHTML, convertToRaw, convertFromRaw, ContentState, EditorState } from 'draft-js'
import DraftPasteProcessor from 'draft-js/lib/DraftPasteProcessor'
import draftToHtml from 'draftjs-to-html'
import { Field, FieldArray, reduxForm, formValueSelector } from 'redux-form'
import InputProfile from '../componentKit/InputProfile'
import Calendar from './Calendar'
import SelectProgram from '../componentKit/SelectProgram'
import MenuButton from '../../stories/MenuButton'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment'
import cookie from 'react-cookie'
import { api } from '../../config.js'

let htmlEditor = ''

const renderExercises = ({ fields, meta: { touched, error } }) => (
  <ul>
    <h4>Упражнения:</h4>
    {fields.map((exercise, index) => (
      <li key={index}>
        <br/>
        <div className="gender">
          <div className="low">{index + 1}-е упражение </div>
          <span className="base-table__btn-del">
            <svg className="svg-icon ico-trash" onClick={() => fields.remove(index)}>
              <use xlinkHref="#ico-trash"></use>
            </svg>
          </span>
        </div>
        <br/>
        <Field name={`${exercise}.count`} placeholder="Количество раз" component={InputProfile} />
        <Field name={`${exercise}.description`} placeholder="Описание упражения" component={InputProfile} />
        <Field name={`${exercise}.video`} placeholder="https://youtube/video" component={InputProfile} />
      </li>
    ))}
    <li>
      <a href='#' onClick={e => {
        e.preventDefault()
        fields.push({})
      }}>Добавить</a>
    </li>
  </ul>
)

const renderTasks = ({ fields, meta: { error } }) => (
  <ul>
    {fields.map((task, index) => (
      <li key={index}>
        <br/>
        <div className="gender">
          <h4 className="low">Задание - {index + 1}:</h4>
          <span className="base-table__btn-del">
            <svg className="svg-icon ico-trash" onClick={() => fields.remove(index)}>
              <use xlinkHref="#ico-trash"></use>
            </svg>
          </span>
        </div>
        <br/>
        <Field name={`${task}.name`} placeholder="Название" component={InputProfile} />
        <Field name={`${task}.description`} placeholder="Описание" component={InputProfile} />
        <FieldArray name={`${task}.exercises`} component={renderExercises} />
      </li>
    ))}
    <li>
      <br/>
      <button type="button" className="btn btn--primary" onClick={() => fields.push({})}>Добавить задание</button>
    </li>
  </ul>
)

const renderPollFields = ({ fields, meta: { error } }) => (
  <ul>
    <h4>Варианты опроса:</h4>
    <br/>
    {fields.map((field, index) => (
      <li key={index}>
        <div className="grid">
          <div className="2/3--desk 1/1--pocket grid__cell">
            <Field name={`${field}.name`} placeholder="Название" component={InputProfile} />
          </div>
          <div className="1/3--desk 1/1--pocket grid__cell">
            <span className="base-table__btn-del">
              <svg className="svg-icon ico-trash" onClick={() => fields.remove(index)}>
                <use xlinkHref="#ico-trash"></use>
              </svg>
            </span>
          </div>
        </div>
      </li>
    ))}
    <li>
      <br/>
      <a href='#' onClick={e => {
        e.preventDefault()
        fields.push({})
      }}>Добавить</a>
    </li>
  </ul>
)

class DayEditorValidationForm extends Component {
  onEditorChange: Function = (editorContent) => {
    const { dispatch } = this.props
    dispatch({ type: 'CONTENT', content: editorContent })
    dispatch({ type: 'DAY_INTRO', intro: draftToHtml(editorContent) })
  }

  uploadImageCallBack(file) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      xhr.open('POST', 'https://api.imgur.com/3/image')
      xhr.setRequestHeader('Authorization', 'Client-ID 8d26ccd12712fca')
      const data = new FormData()
      data.append('image', file)
      xhr.send(data)
      xhr.addEventListener('load', () => {
        const response = JSON.parse(xhr.responseText)
        resolve(response)
      })
      xhr.addEventListener('error', () => {
        const error = JSON.parse(xhr.responseText)
        reject(error)
      })
    })
  }

  componentDidMount() {
    const { change, programs } = this.props
    change('programTasks', programs)
  }

  render() {
    const { reset, hideCreatePoll, handleSubmit, onSubmit, dispatch, calendar,
      change, date, programs, programShow, selectedDays, editor } = this.props

    console.log('lllllllllllllllllllll')
    console.log(editor)
    console.log(calendar)

    const renderPrograms = ({ fields, meta: { error } }) => (
      <ul>
        {/* {this.props.params.program + '' === '1'
        } */}
        {fields.length > 0
          ? fields.map((program, index) => {
              if (index < 3) {
                return (
                  <li key={index}>
                    <button type="button" className="btn btn--secondary" onClick={() => {
                      dispatch({ type: 'PROGRAM_SHOW', programShow: index + 1 })
                    }}>
                      {programs[index].name}
                    </button>
                    {programShow === programs[index].id &&
                      <FieldArray name={`${program}.tasks`} component={renderTasks} />
                    }
                    <hr/>
                  </li>
                )
              }
            })
          : <li>
              <FieldArray name='program[0].tasks' component={renderTasks} />
            </li>
        }
      </ul>
    )

    const handleDateChange = date => {
      dispatch({ type: 'DAY_DATE', date: date })
      dispatch(actions.fetchDaysIfNeeded(selectedDays))
    }

    return (
      <form onSubmit={handleSubmit(onSubmit)} className="grid">
        <div className="1/4--desk grid__cell layout__menu">
          <div className="grid layout__menu-inner">
            <div className="2/3 grid__cell">
              <ul className="main-nav">
                <li className="main-nav__item">
                  <MenuButton onClick={() => change('programTasks', programs)} icon="ico-m-book">
                    Тренировочный день
                  </MenuButton>
                </li>
                <li className="main-nav__item">
                  <MenuButton onClick={() => change('programTasks', [])} icon="ico-m-book">
                    Бонусный день
                  </MenuButton>
                </li>
                <li className="main-nav__item">
                  <MenuButton onClick={() => {
                    browserHistory.push('/userReports/pendingProfiles')
                  }} icon="ico-m-tasks">Отчеты</MenuButton>
                </li>
                <li className="main-nav__item">
                  <MenuButton onClick={() => {
                    browserHistory.push('/superadmin/food')
                  }} icon="ico-m-food">Питание</MenuButton>
                </li>
              </ul>
            </div>
            <div className="1/3 grid__cell">
              <ul className="min-calendar">
                {calendar && calendar.map((field, index) => (
                  <Calendar onClick={() => {
                      reset()

                      // this.refs.introEditor.changeEditorState(editorState)//JSON.parse(calendar[index].intro)
                      dispatch({ type: 'EDITOR', editor: JSON.parse(calendar[index].intro) })
                      // dispatch({ type: 'EDITOR_STATE', editorState: editorState })

                      dispatch({ type: 'DAY_DATE', date: moment(date, 'YYYY-MM-DD') })
                      change('customName', calendar[index].customName)
                      change('customIcon', calendar[index].customIcon)
                      change('programTasks', calendar[index].programTasks)
                    }}
                    onTrashClick={() => {
                      const payload = {
                        authToken: cookie.load('token'),
                        data: {
                          id: field.id
                        }
                      }

                      const headers = {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                      }

                      const method = 'POST'
                      return fetch(`${api}/data/adminday-delete`, {
                        headers,
                        method,
                        body: JSON.stringify(payload)
                      })
                      .then(response => response.json())
                      .then(json => {
                        if (json.errorCode === 1) {
                          dispatch(actions.fetchDaysIfNeeded(selectedDays))
                        }
                      })
                    }}
                    key={index}
                    number={field.id}
                    date={field.date}
                  >
                    {moment(field.date).format('DDddd')}
                  </Calendar>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="3/4--desk 1/1--pocket grid__cell layout__content">
          <div className="stage-box stage-box--small-padding">
            <div className="grid">
              <div className="1/2--desk grid__cell mb30">
                <button type className='btn btn--primary'>
                  Сохранить
                </button>
              </div>
            </div>

            <DatePicker selected={date} onChange={handleDateChange} />
            <br/>
            <br/>

            <div className="grid">
              <div className="1/2--desk 1/1--pocket grid__cell">
                <Field name='customName' placeholder="Название дня" component={InputProfile} />
              </div>
              <div className="1/2--desk 1/1--pocket grid__cell">
                <Field name='customIcon' placeholder="Выберите иконку" component={InputProfile} />
              </div>
            </div>

            <br/>
            <br/>

            {editor
              ? <div className='home-root'>
                <Editor ref='introEditor'
                  toolbarClassName="home-toolbar"
                  wrapperClassName="home-wrapper"
                  editorClassName="home-editor"
                  placeholder="Вставьте текст..."
                  onChange={this.onEditorChange}
                  contentState={editor}
                  uploadCallback={this.uploadImageCallBack}
                />
              </div>
              : <div className='home-root'>
                <Editor ref='introEditor'
                  toolbarClassName="home-toolbar"
                  wrapperClassName="home-wrapper"
                  editorClassName="home-editor"
                  placeholder="Вставьте текст..."
                  onChange={this.onEditorChange}
                  uploadCallback={this.uploadImageCallBack}
                />
              </div>
            }

            <br/>

            {/* <Field name="program" id="program" options={[
              { name: '#Я ГЕРОЙ', value: '1'},
              { name: '#МАМА МОЖЕТ', value: '2' },
              { name: '#ЭКСТРЕМАЛЬНАЯ СУШКА', value: '3' },
            ]} component={SelectProgram} /> */}

            <FieldArray name='programTasks' component={renderPrograms} />

            <br/>
            <button type="button" className="btn btn--secondary" onClick={() => {
              dispatch({ type: 'HIDE_POLL', hideCreatePoll: !hideCreatePoll })
            }}>
              {!hideCreatePoll ? 'Добавить опрос' : 'Убрать опрос' }
            </button>
            {hideCreatePoll &&
              <div>
                <br/>
                <Field name='description' placeholder="Описание опроса" component={InputProfile} />
                <FieldArray name='pollFields' component={renderPollFields} />
              </div>
            }
          </div>
        </div>
      </form>
    )
  }
}

DayEditorValidationForm = reduxForm({
  form: 'dayEditor',
  fields: ['programTasks', 'customName', 'customIcon']
})(DayEditorValidationForm)

let selector = formValueSelector('dayEditor')

const mapStateToProps = state => {
  const { selectedDays, selectedPrograms, electedPrograms, recivedPrograms, hidePoll, programShow } = state
  const { programs } = recivedPrograms[selectedPrograms] || []
  return {
    hideCreatePoll: hidePoll,
    programShow,
    programs,
    selectedDays
  }
}

DayEditorValidationForm = connect(
  mapStateToProps
)(DayEditorValidationForm)

export default DayEditorValidationForm
