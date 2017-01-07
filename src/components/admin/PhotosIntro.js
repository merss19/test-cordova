import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import * as actions from '../../actions'
import Header from '../../stories/Header'
import Menu from './Menu'
import LoadingView from '../componentKit/LoadingView'
import cookie from 'react-cookie'
import moment from 'moment'
import { api } from '../../config.js'
import Modal from 'boron/FadeModal'
import MenuButton from '../../stories/MenuButton'
import { Editor } from 'react-draft-wysiwyg'
import '../../../public/react-draft-wysiwyg.css'

let contentStyle = {
  borderRadius: '18px',
  padding: '30px'
}

class PhotosIntro extends Component {
  componentDidMount() {
    const fbScript = document.createElement("script")
    fbScript.text = "fbq('track', 'PageView');"
    document.body.appendChild(fbScript)

    const { dispatch, selectedPhotosIntro } = this.props
    dispatch(actions.fetchPhotosIntroIfNeeded(selectedPhotosIntro))
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch, selectedPhotosIntro, selectedPrograms } = nextProps

    if (nextProps.selectedPhotosIntro !== this.props.selectedPhotosIntro)
      dispatch(actions.fetchPhotosIntroIfNeeded(selectedPhotosIntro))
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
    const { photosIntro, token, isFetching, programs, editor, content, selectedPhotosIntro, dispatch } = this.props
    const isEmpty = !photosIntro

    console.log(photosIntro)

    return (
      <div className='layout'>
        <Header burger={false} isTask={true}/>
        {isFetching
          ? <LoadingView title="Загружается..."/>
          : <div style={{ opacity: isFetching ? 0.5 : 1 }}>
              <div className="layout__inner">
                <div className="grid">
                  <div className="1/4--desk grid__cell layout__menu">
                    <div className="grid layout__menu-inner">
                      <div className="2/3 grid__cell">
                        <ul className="main-nav">
                          <li className="main-nav__item">
                            <MenuButton onClick={() => {
                              browserHistory.push('superadmin/day')
                            }} icon="ico-m-book">
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
                          <button type className='btn btn--primary' onClick={data => {
                            this.refs.loadingModal.show()

                            console.log(data)

                            const payload = {
                              authToken: token ? token : cookie.load('token'),
                              data: {
                                paramName: "UserPhotoCaption",
                                paramValue: JSON.stringify(content[0])
                              }
                            }

                            const headers = {
                              'Accept': 'application/json',
                              'Content-Type': 'application/json'
                            }

                            console.log(payload)

                            const method = 'POST'
                            return fetch(`${api}/data/siteParam-set`, {
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
                        }}>
                            Сохранить
                          </button>
                        </div>
                      </div>

                      <Editor
                        toolbarClassName="home-toolbar"
                        wrapperClassName="home-wrapper"
                        editorClassName="home-editor"
                        placeholder="Вставьте текст..."
                        onChange={(editorContent) => {
                          const { dispatch } = this.props
                          console.log(JSON.stringify(editorContent))
                          dispatch({ type: 'CONTENT', content: editorContent, index: 0 })
                        }}
                        contentState={photosIntro.data.paramValue && photosIntro.data.paramValue !== 'html'
                          ? JSON.parse(photosIntro.data.paramValue)
                          : editor[0]
                        }
                        uploadCallback={this.uploadImageCallBack}
                      />
                    </div>
                  </div>
                </div>
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
                    dispatch(actions.fetchPhotosIntroIfNeeded(selectedPhotosIntro))
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
  const { selectedPhotosIntro, recivedPhotosIntro, editor, content } = state
  const {
    isFetching,
    photosIntro,
  } = recivedPhotosIntro[selectedPhotosIntro] || {
    isFetching: true,
    photosIntro: {}
  }

  return {
    selectedPhotosIntro,
    isFetching,
    photosIntro,
    editor,
    content,
  }
}

PhotosIntro = connect(
  mapStateToProps
)(PhotosIntro)

export default PhotosIntro
