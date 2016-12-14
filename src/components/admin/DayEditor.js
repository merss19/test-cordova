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
    <li>
      <button type="button" className="btn btn--primary" onClick={() => fields.push({})}>+</button>
    </li>
    {fields.map((exercise, index) => (
      <li key={index}>
        <Field name={`${exercise}.count`} placeholder="Количество раз" component={InputProfile} />
        <Field name={`${exercise}.description`} placeholder="Описание упражения" component={InputProfile} />
        <Field name={`${exercise}.video`} placeholder="https://youtube/video" component={InputProfile} />
      </li>
    ))}
  </ul>
)

const renderTasks = ({ fields, meta: { error } }) => (
  <ul>
    <li>
      <br/>
      <button type="button" className="btn btn--primary" onClick={() => fields.push({})}>+</button>
    </li>
    {fields.map((task, index) => (
      <li key={index}>
        <Field name={`${task}.name`} placeholder="Название" component={InputProfile} />
        <Field name={`${task}.description`} placeholder="Описание" component={InputProfile} />
        <FieldArray name={`${task}.exercises`} component={renderExercises} />
      </li>
    ))}
  </ul>
)

class DayEditor extends Component {
  onEditorChange: Function = (editorContent) => {
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
    console.log(this.props)
    return (
      <form className='layout'>
        <Header burger={false} />
        <div className="layout__inner layout__inner--profile">
          <div className="stage-box stage-box--small-padding">
            <div className="grid">
              <div className="1/2--desk grid__cell mb30">
                <button className='btn btn--primary'>
                  Сохранить
                </button>
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
          </div>
        </div>
      </form>
    )
  }
}

// DayEditor = reduxForm({
//   form: 'dayEditor',
// })(DayEditor)
//
// const selector = formValueSelector('dayEditor')
//
// const mapStateToProps = state => {
//   const tasks = selector(state, 'tasks')
//   console.log(tasks)
//   return {
//     tasks
//   }
// }
//
// DayEditor = connect(
//   mapStateToProps
// )(DayEditor)

export default reduxForm({
  form: 'fieldArrays',     // a unique identifier for this form
})(DayEditor)

// export default DayEditor
