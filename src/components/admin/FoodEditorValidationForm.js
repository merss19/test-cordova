import React, { Component } from 'react'
import { Editor } from 'react-draft-wysiwyg'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import '../../../public/react-draft-wysiwyg.css'
import * as actions from '../../actions'
import { convertFromHTML, ContentState, EditorState } from 'draft-js'
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

class FoodEditorValidationForm extends Component {
  onEditorChange: Function = (editorContent) => {
    const { dispatch } = this.props
    dispatch({ type: 'CONTENT', content: editorContent })
    dispatch({ type: 'FOOD_DESCRIPTION', description: draftToHtml(editorContent) })
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
    const { reset, hideCreatePoll, handleSubmit, onSubmit, dispatch, food,
      change, programs, selectedFood, editor, foodProgram } = this.props

    let contentEditor
    if (foodProgram && editor) {
      contentEditor = (
        <div className='home-root'>
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
      )
    } else if (foodProgram && !editor) {
      contentEditor = (
        <div className='home-root'>
          <Editor ref='introEditor'
            toolbarClassName="home-toolbar"
            wrapperClassName="home-wrapper"
            editorClassName="home-editor"
            placeholder="Вставьте текст..."
            onChange={this.onEditorChange}
            uploadCallback={this.uploadImageCallBack}
          />
        </div>
      )
    }

    return (
      <form onSubmit={handleSubmit(onSubmit)} className="grid">
        <div className="1/4--desk grid__cell layout__menu">
          <div className="grid layout__menu-inner">
            <div className="2/3 grid__cell">
              <ul className="main-nav">
                <li className="main-nav__item">
                  <MenuButton onClick={() => browserHistory.push('/superadmin/day')} icon="ico-m-book">
                    Создать день
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

            <div className="share-box">
              <ul className="btn-social">
                {programs.map((program, index) => {
                  if (program.id !== 4) {
                    return (
                      <li key={index} className={foodProgram + '' !== program.id + ''
                        ? "btn-social__item btn-social__item--vk"
                        : "btn-social__item btn-social__item--odnoklassniki"}>
                        <span className="btn-social__title" onClick={() => {
                          dispatch({ type: 'FOOD_PROGRAM', program: program.id })
                          if (food[index] && food[index].content)
                            dispatch({ type: 'EDITOR', editor: JSON.parse(food[index].content) })
                        }}>
                          {program.name}
                        </span>
                      </li>
                    )
                  }
                })}
              </ul>
            </div>

            {contentEditor}

          </div>
        </div>
      </form>
    )
  }
}

FoodEditorValidationForm = reduxForm({
  form: 'dayEditor',
})(FoodEditorValidationForm)

let selector = formValueSelector('dayEditor')

const mapStateToProps = state => {
  const { selectedFood, selectedPrograms, electedPrograms, recivedPrograms, hidePoll, programShow } = state
  const { programs } = recivedPrograms[selectedPrograms] || []
  return {
    hideCreatePoll: hidePoll,
    programShow,
    programs,
    selectedFood
  }
}

FoodEditorValidationForm = connect(
  mapStateToProps
)(FoodEditorValidationForm)

export default FoodEditorValidationForm
