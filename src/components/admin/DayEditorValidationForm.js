import React, { Component } from 'react'
import { Editor } from 'react-draft-wysiwyg'
import { connect } from 'react-redux'
import '../../../public/react-draft-wysiwyg.css'
import draftToHtml from 'draftjs-to-html'
import Header from '../../stories/Header'
import { Field, FieldArray, reduxForm, formValueSelector } from 'redux-form'
import InputProfile from '../componentKit/InputProfile'

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
      <a href='#' onClick={() => fields.push({})}>Добавить</a>
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
      <button type="button" className="btn btn--primary" onClick={() => fields.push({})}>+</button>
    </li>
  </ul>
)

class DayEditorValidationForm extends Component {
  // componentWillMount() {
  //   const { dispatch, initialValues } = this.props
  //   console.log('nnnnnnnnnnn===0')
  //   console.log(initialValues)
  //   dispatch(() => ({type: 'EDIT_DAY', ...initialValues}))
  // }

  onEditorChange(editorContent) {
    htmlEditor = draftToHtml(editorContent)
    console.log(htmlEditor)
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

  render() {
    const { error, handleSubmit, onSubmit, initialValues } = this.props
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid">
          <div className="1/2--desk grid__cell mb30">
            <button type className='btn btn--primary'>
              Сохранить
            </button>
          </div>
        </div>

        <div className="grid">
          <div className="1/2--desk 1/1--pocket grid__cell">
            <Field name={'customName'} placeholder="Название дня" component={InputProfile} />
          </div>
          <div className="1/2--desk 1/1--pocket grid__cell">
            <Field name={'customIcon'} placeholder="Выберите иконку" component={InputProfile} />
          </div>
        </div>

        <div className='home-root'>
          <Editor
            toolbarClassName="home-toolbar"
            wrapperClassName="home-wrapper"
            editorClassName="home-editor"
            placeholder="Вставьте текст..."
            onChange={this.onEditorChange}
            uploadCallback={this.uploadImageCallBack}
          />
        </div>
        <FieldArray name='tasks' component={renderTasks} />
      </form>
    )
  }
}

DayEditorValidationForm = reduxForm({
  form: 'dayEditor',
})(DayEditorValidationForm)

const selector = formValueSelector('dayEditor')

const mapStateToProps = state => {
  console.log('M<=======)=-0')
  console.log(state)
  return {
    initialValues: state.editDay
  }
}

DayEditorValidationForm = connect(
  mapStateToProps
)(DayEditorValidationForm)

export default reduxForm({
  form: 'fieldArrays',     // a unique identifier for this form
})(DayEditorValidationForm)

// export default DayEditorValidationForm
