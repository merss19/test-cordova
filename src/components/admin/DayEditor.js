import React, { Component } from 'react'
import { Editor } from 'react-draft-wysiwyg'
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import draftToHtml from 'draftjs-to-html'
import Header from '../../stories/Header'

let htmlEditor = ''

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
    return (
      <div className='layout'>
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
          </div>
        </div>

      </div>
    )
  }
}

export default DayEditor
