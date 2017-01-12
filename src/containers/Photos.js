import React, { Component } from 'react'
import { browserHistory } from 'react-router'
// import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../actions'
import { api } from '../config.js'
import cookie from 'react-cookie'
import Menu from '../components/todayTask/Menu'
import CalendarList from '../components/todayTask/CalendarList'
import Header from '../stories/Header'
import {
  Entity,
  Editor,
  EditorState,
  convertFromRaw,
  CompositeDecorator
} from 'draft-js'
import {getCustomStyleMap} from 'draftjs-utils'
import Modal from 'boron/FadeModal'

let contentStyle = {
  borderRadius: '18px',
  padding: '30px',
  marginLeft: 'auto',
  marginRight: 'auto',
  width: '450px',
  textAlign: 'center'
}

const customStyleMap = getCustomStyleMap()

let photoBeforeFront
let photoBeforeBack
let photoBeforeLeft
let photoBeforeRight
let photoAfterFront
let photoAfterBack
let photoAfterLeft
let photoAfterRight

let photoBeforeFrontUrl
let photoBeforeBackUrl
let photoBeforeLeftUrl
let photoBeforeRightUrl
let photoAfterFrontUrl
let photoAfterBackUrl
let photoAfterLeftUrl
let photoAfterRightUrl

let photoBeforeVideoUrl
let photoAfterVideoUrl

const decorator = new CompositeDecorator([
  {
    strategy: (contentBlock, callback) => {
      contentBlock.findEntityRanges(
        (character) => {
          const entityKey = character.getEntity()
          return (
            entityKey !== null &&
            Entity.get(entityKey).getType() === 'LINK'
          )
        },
        callback
      )
    },
    component: (props) => {
      const {url} = Entity.get(props.entityKey).getData()
      return (
        <a href={url}>
          {props.children}
        </a>
      )
    },
  },
])

const Image = (props) => {
  return <img src={props.src} style={{
    maxWidth: '100%',
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto' }} />;
};

const Atomic = (props) => {
  const entity = Entity.get(props.block.getEntityAt(0));
  const {src} = entity.getData();
  const type = entity.getType();

  let media;
  if (type === 'IMAGE') {
    media = <Image src={src} />;
  }

  return media;
};

function mediaBlockRenderer(block) {
  if (block.getType() === 'atomic') {
    return {
      component: Atomic,
      editable: false,
    };
  }

  return null;
}

class Photos extends Component {
  componentDidMount() {
    const { dispatch, selectedPhotos } = this.props
    dispatch(actions.fetchPhotosIfNeeded(selectedPhotos))
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedPhotos !== this.props.selectedPhotos) {
      const { dispatch, selectedPhotos } = nextProps
      dispatch(actions.fetchPhotosIfNeeded(selectedPhotos))
    }
  }

  render() {
    const { photos, isFetching, dispatch } = this.props
    console.log('<====)==0')
    console.log(photos)
    const isEmpty = !photos || !photos.data || !photos.data[0]
    const url = 'https://api.todayme.ru'
    console.log(url)
    console.log(isEmpty)
    let json
    if (!isEmpty) {
      const p = photos.data[photos.data.length - 1]
      photoBeforeFrontUrl = p.photoBeforeFrontUrl ? url + p.photoBeforeFrontUrl : ''
      photoBeforeBackUrl = p.photoBeforeBackUrl ? url + p.photoBeforeBackUrl : ''
      photoBeforeLeftUrl = p.photoBeforeLeftUrl ? url + p.photoBeforeLeftUrl : ''
      photoBeforeRightUrl = p.photoBeforeRightUrl ? url + p.photoBeforeRightUrl : ''
      photoAfterFrontUrl = p.photoAfterFrontUrl ? url + p.photoAfterFrontUrl : ''
      photoAfterBackUrl = p.photoAfterBackUrl ? url + p.photoAfterBackUrl : ''
      photoAfterLeftUrl = p.photoAfterLeftUrl ? url + p.photoAfterLeftUrl : ''
      photoAfterRightUrl = p.photoAfterRightUrl ? url + p.photoAfterRightUrl : ''

      photoBeforeVideoUrl = p.photoBeforeVideoUrl ? url + p.photoBeforeVideoUrl : ''
      photoAfterVideoUrl = p.photoAfterVideoUrl ? url + p.photoAfterVideoUrl : ''

      json = JSON.parse(p.userPhotoCaption)
      this.refs.videoBefore.value = photoBeforeVideoUrl ? photoBeforeVideoUrl : ''
    }

    const editorState = json ? EditorState.createWithContent(convertFromRaw(json), decorator) : EditorState.createEmpty()

    return (
      <div className="layout">

        <Header closeMobMenu={() => {}} isTask={true}/>

        <div className="layout__inner">
          <div className="grid">
            <div className="1/4--desk grid__cell layout__menu">
              <div className="grid layout__menu-inner">
                <Menu fullName={cookie.load('fullName')}/>
                {/* <CalendarList calendar={[{
                    number: '1',
                    icon: 'ico-done',
                    status: 'done',
                    date: '12/12/17',
                    admin: 'Миньон',
                    completeText: 'Зачет принят',
                    day: 'Пн'
                  }, {
                    number: '2',
                    status: 'waiting',
                    date: '12/12/17',
                    admin: 'Миньон',
                    completeText: 'Зачет принимается',
                    day: 'Вт'
                  }, {
                    number: '3',
                    icon: 'ico-cross',
                    status: 'missed',
                    date: '12/12/17',
                    admin: 'Миньон',
                    completeText: 'Зачет не сдан',
                    day: 'Ср'
                }]}/> */}
              </div>
            </div>
            <div className="3/4--desk 1/1--pocket grid__cell layout__content">

              <div className="stage-box stage-box--small-padding">

                <h1 className="h1">Фото ДО:</h1>

                <hr/>

                <Editor
                  readOnly={true}
                  customStyleMap={customStyleMap}
                  editorState={editorState}
                  blockRendererFn={mediaBlockRenderer}/>

                <br/>

                <ul className="upload-gallery">
                  <li ref="liBeforeFront" className={ photoBeforeFrontUrl ? 'upload-gallery__item upload-gallery__item--uploaded' : "upload-gallery__item" }>
                    <span className="upload-gallery__item-inner">
                      <input ref="inputBeforeFront" type="file" accept="image/*" className="upload-file__input" onChange={input => {
                        const { target } = input
                        if (target.files && target.files[0]) {
                          var reader = new FileReader()

                          reader.onload = e => {
                            this.refs.liBeforeFront.className='upload-gallery__item upload-gallery__item--uploaded'
                            this.refs.beforeFront.src = e.target.result

                            const content = reader.result.replace(/data:image\/\w+;base64,/, '')
                            const name = target.files[0].name
                            const payload = {
                              authToken: cookie.load('token'),
                              data: {
                                name,
                                content
                              }
                            }

                            const headers = {
                              'Accept': 'application/json',
                              'Content-Type': 'application/json'
                            }

                            return fetch(`${api}/data/file-upload`, {
                                headers,
                                method: 'POST',
                                body: JSON.stringify(payload)
                              })
                              .then(response => response.json())
                              .then(json => {
                                console.log(json)
                                photoBeforeFront = json.data.uid
                                photoBeforeFrontUrl = `${api}/files/${json.data.uid}.${json.data.extension}`.replace(/api\//, '')
                              })
                          }

                          reader.readAsDataURL(target.files[0])
                        }
                      }}/>
                      <span className="upload-gallery__ico">
                        <svg className="svg-icon ico-gallery">
                          <use xlinkHref="#ico-gallery"></use>
                        </svg>
                      </span>
                      <span className="upload-gallery__title">Спереди</span>
                      <span className="upload-gallery__img_wrap">
                        <img ref='beforeFront' className="upload-gallery__img" src={photoBeforeFrontUrl} alt=""/>
                      </span>
                    </span>
                    <a href="#" onClick={e => {
                      e.preventDefault()
                      this.refs.inputBeforeFront.click()
                    }}>
                      Загрузить
                    </a>
                  </li>
                  <li ref="liBeforeBack" className={ photoBeforeBackUrl ? 'upload-gallery__item upload-gallery__item--uploaded' : "upload-gallery__item" }>
                    <span className="upload-gallery__item-inner">
                      <input ref="inputBeforeBack" type="file" accept="image/*" className="upload-file__input" onChange={input => {
                        const { target } = input
                        if (target.files && target.files[0]) {
                          var reader = new FileReader()

                          reader.onload = e => {
                            this.refs.liBeforeBack.className='upload-gallery__item upload-gallery__item--uploaded'
                            this.refs.beforeBack.src = e.target.result

                            const content = reader.result.replace(/data:image\/\w+;base64,/, '')
                            const name = target.files[0].name
                            const payload = {
                              authToken: cookie.load('token'),
                              data: {
                                name,
                                content
                              }
                            }

                            const headers = {
                              'Accept': 'application/json',
                              'Content-Type': 'application/json'
                            }

                            return fetch(`${api}/data/file-upload`, {
                                headers,
                                method: 'POST',
                                body: JSON.stringify(payload)
                              })
                              .then(response => response.json())
                              .then(json => {
                                photoBeforeBack = json.data.uid
                                photoBeforeBackUrl = `${api}/files/${json.data.uid}.${json.data.extension}`.replace(/api\//, '')
                              })
                          }

                          reader.readAsDataURL(target.files[0])
                        }
                      }}/>
                      <span className="upload-gallery__ico">
                        <svg className="svg-icon ico-gallery">
                          <use xlinkHref="#ico-gallery"></use>
                        </svg>
                      </span>
                      <span className="upload-gallery__title">Сзади</span>
                      <span className="upload-gallery__img_wrap">
                        <img ref='beforeBack' className="upload-gallery__img" src={photoBeforeBackUrl} alt=""/>
                      </span>
                    </span>
                    <a href="#" onClick={e => {
                      e.preventDefault()
                      this.refs.inputBeforeBack.click()
                    }}>
                      Загрузить
                    </a>
                  </li>
                  <li ref="liBeforeLeft" className={ photoBeforeLeftUrl ? 'upload-gallery__item upload-gallery__item--uploaded' : "upload-gallery__item" }>
                    <span className="upload-gallery__item-inner">
                      <input ref="inputBeforeLeft" type="file" accept="image/*" className="upload-file__input" onChange={input => {
                        const { target } = input
                        if (target.files && target.files[0]) {
                          var reader = new FileReader()

                          reader.onload = e => {
                            this.refs.liBeforeLeft.className='upload-gallery__item upload-gallery__item--uploaded'
                            this.refs.beforeLeft.src = e.target.result

                            const content = reader.result.replace(/data:image\/\w+;base64,/, '')
                            const name = target.files[0].name
                            const payload = {
                              authToken: cookie.load('token'),
                              data: {
                                name,
                                content
                              }
                            }

                            const headers = {
                              'Accept': 'application/json',
                              'Content-Type': 'application/json'
                            }

                            return fetch(`${api}/data/file-upload`, {
                                headers,
                                method: 'POST',
                                body: JSON.stringify(payload)
                              })
                              .then(response => response.json())
                              .then(json => {
                                photoBeforeLeft = json.data.uid
                                photoBeforeLeftUrl = `${api}/files/${json.data.uid}.${json.data.extension}`.replace(/api\//, '')
                              })
                          }

                          reader.readAsDataURL(target.files[0])
                        }
                      }}/>
                      <span className="upload-gallery__ico">
                        <svg className="svg-icon ico-gallery">
                          <use xlinkHref="#ico-gallery"></use>
                        </svg>
                      </span>
                      <span className="upload-gallery__title">Слева</span>
                      <span className="upload-gallery__img_wrap">
                        <img ref='beforeLeft' className="upload-gallery__img" src={photoBeforeLeftUrl} alt=""/>
                      </span>
                    </span>
                    <a href="#" onClick={e => {
                      e.preventDefault()
                      this.refs.inputBeforeLeft.click()
                    }}>
                      Загрузить
                    </a>
                  </li>

                  <li ref="liBeforeRight" className={ photoBeforeRightUrl ? 'upload-gallery__item upload-gallery__item--uploaded' : "upload-gallery__item" }>
                    <span className="upload-gallery__item-inner">
                      <input ref="inputBeforeRight" type="file" accept="image/*" className="upload-file__input" onChange={input => {
                        const { target } = input
                        if (target.files && target.files[0]) {
                          var reader = new FileReader()

                          reader.onload = e => {
                            this.refs.liBeforeRight.className='upload-gallery__item upload-gallery__item--uploaded'
                            this.refs.beforeRight.src = e.target.result

                            const content = reader.result.replace(/data:image\/\w+;base64,/, '')
                            const name = target.files[0].name
                            const payload = {
                              authToken: cookie.load('token'),
                              data: {
                                name,
                                content
                              }
                            }

                            const headers = {
                              'Accept': 'application/json',
                              'Content-Type': 'application/json'
                            }

                            return fetch(`${api}/data/file-upload`, {
                                headers,
                                method: 'POST',
                                body: JSON.stringify(payload)
                              })
                              .then(response => response.json())
                              .then(json => {
                                photoBeforeRight = json.data.uid
                                photoBeforeRightUrl = `${api}/files/${json.data.uid}.${json.data.extension}`.replace(/api\//, '')
                              })
                          }

                          reader.readAsDataURL(target.files[0])
                        }
                      }}/>
                      <span className="upload-gallery__ico">
                        <svg className="svg-icon ico-gallery">
                          <use xlinkHref="#ico-gallery"></use>
                        </svg>
                      </span>
                      <span className="upload-gallery__title">Справа</span>
                      <span className="upload-gallery__img_wrap">
                        <img ref='beforeRight' className="upload-gallery__img" src={photoBeforeRightUrl} alt=""/>
                      </span>
                    </span>
                    <a href="#" onClick={e => {
                      e.preventDefault()
                      this.refs.inputBeforeRight.click()
                    }}>
                      Загрузить
                    </a>
                  </li>
                </ul>

                <br/>

                <div className="input input--box">
                  <input ref="videoBefore" type="text" className="input__field" placeholder="http://youtube.com"/>
                  {/* <div className="btn btn--secondary">Прикрепить файл</div> */}
                </div>

                <div className="btn btn--primary" onClick={() => {
                  this.refs.loadingModal.show()
                  const payload = {
                    authToken: cookie.load('token'),
                    data: {
                      program: cookie.load('userProgram') ? cookie.load('userProgram') : 1,
                      photoBeforeFront,
                      photoBeforeBack,
                      photoBeforeLeft,
                      photoBeforeRight,
                      photoAfterFront,
                      photoAfterBack,
                      photoAfterLeft,
                      photoAfterRight,
                      photoBeforeFrontUrl,
                      photoBeforeBackUrl,
                      photoBeforeLeftUrl,
                      photoBeforeRightUrl,
                      photoAfterFrontUrl,
                      photoAfterBackUrl,
                      photoAfterLeftUrl,
                      photoAfterRightUrl,
                      photoBeforeVideoUrl,
                      photoAfterVideoUrl
                    }
                  }

                  let url = `${api}/user/userPhoto-update`

                  if (isEmpty
                    || (!photos.data[photos.data.length - 1].photoBeforeFrontUrl
                      && !photos.data[photos.data.length - 1].photoBeforeBackUrl
                      && !photos.data[photos.data.length - 1].photoBeforeLeftUrl
                      && !photos.data[photos.data.length - 1].photoBeforeRightUrl
                      && !photos.data[photos.data.length - 1].photoBeforeVideoUrl))
                    url = `${api}/user/userPhoto-create`

                  return fetch(url, {
                    headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json'
                    },
                    method: 'POST',
                    body: JSON.stringify(payload)
                  })
                  .then(response => response.json())
                  .then(json => {
                    this.refs.loadingModal.hide()
                    if (json.errorCode === 1) {
                      this.refs.successModal.show()
                    } else {
                      this.refs.errorModal.show()
                    }
                  })
                }}>
                  Отправить на проверку
                </div>

                <Modal ref='loadingModal' contentStyle={contentStyle}>
                  <h2>Подождите...</h2>
                </Modal>
                <Modal ref='errorModal' contentStyle={contentStyle}>
                  <h2>Что-то пошло не так, попробуйте снова</h2>
                  <br/>
                  <button className="btn btn--action" onClick={() => {
                    this.refs.errorModal.hide()
                  }}>
                    Продолжить
                  </button>
                </Modal>
                <Modal ref='successModal' contentStyle={contentStyle}>
                  <h2>Фотографии и видео отправлены на проверку!</h2>
                  <br/>
                  <button className="btn btn--action" onClick={() => {
                    this.refs.successModal.hide()
                  }}>
                    Продолжить
                  </button>
                </Modal>

                <hr/>

                {/* <p className="base-parag">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat blanditiis quo porro nesciunt consequuntur est dolore accusamus commodi dolorem. Vel nobis architecto perspiciatis eligendi libero odit nisi iure natus, repellendus laboriosam voluptates excepturi magni vero, dolorum reiciendis. Iusto, excepturi tenetur, quisquam unde voluptatibus adipisci iure, impedit modi ipsa consequatur iste.</p>

                <p className="base-parag">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat blanditiis quo porro nesciunt consequuntur est dolore accusamus commodi dolorem. Vel nobis architecto perspiciatis eligendi libero odit nisi iure natus, repellendus laboriosam voluptates excepturi magni vero, dolorum reiciendis. Iusto, excepturi tenetur, quisquam unde voluptatibus adipisci iure, impedit modi ipsa consequatur iste.</p>

                <ul className="upload-gallery">
                  {/* {before.map(gallery => {

                  })}
                  <li ref="liAfterFront" className={ photoAfterFrontUrl ? 'upload-gallery__item upload-gallery__item--uploaded' : "upload-gallery__item" }>
                    <span className="upload-gallery__item-inner">
                      <input ref="inputAfterFront" type="file" accept="image/*" className="upload-file__input" onChange={input => {
                        const { target } = input
                        if (target.files && target.files[0]) {
                          var reader = new FileReader()

                          reader.onload = e => {
                            this.refs.liAfterFront.className='upload-gallery__item upload-gallery__item--uploaded'
                            this.refs.afterFront.src = e.target.result

                            const content = reader.result.replace(/data:image\/\w+;base64,/, '')
                            const name = target.files[0].name
                            const payload = {
                              authToken: cookie.load('token'),
                              data: {
                                name,
                                content
                              }
                            }

                            const headers = {
                              'Accept': 'application/json',
                              'Content-Type': 'application/json'
                            }

                            return fetch(`${api}/data/file-upload`, {
                                headers,
                                method: 'POST',
                                body: JSON.stringify(payload)
                              })
                              .then(response => response.json())
                              .then(json => {
                                photoAfterFront = json.data.uid
                                photoAfterFrontUrl = `${api}/files/${json.data.uid}.${json.data.extension}`.replace(/api\//, '')
                              })
                          }

                          reader.readAsDataURL(target.files[0])
                        }
                      }}/>
                      <span className="upload-gallery__ico">
                        <svg className="svg-icon ico-gallery">
                          <use xlinkHref="#ico-gallery"></use>
                        </svg>
                      </span>
                      <span className="upload-gallery__title">Спереди</span>
                      <span className="upload-gallery__img_wrap">
                        <img ref='afterFront' className="upload-gallery__img" src={photoAfterFrontUrl} alt=""/>
                      </span>
                    </span>
                    <a href="#" onClick={e => {
                      e.preventDefault()
                      this.refs.inputAfterFront.click()
                    }}>
                      Загрузить
                    </a>
                  </li>
                  <li ref="liAfterBack" className={ photoAfterBackUrl ? 'upload-gallery__item upload-gallery__item--uploaded' : "upload-gallery__item" }>
                    <span className="upload-gallery__item-inner">
                      <input ref="inputAfterBack" type="file" accept="image/*" className="upload-file__input" onChange={input => {
                        const { target } = input
                        if (target.files && target.files[0]) {
                          var reader = new FileReader()

                          reader.onload = e => {
                            this.refs.liAfterBack.className='upload-gallery__item upload-gallery__item--uploaded'
                            this.refs.afterBack.src = e.target.result
                            const content = reader.result.replace(/data:image\/\w+;base64,/, '')
                            const name = target.files[0].name
                            const payload = {
                              authToken: cookie.load('token'),
                              data: {
                                name,
                                content
                              }
                            }

                            const headers = {
                              'Accept': 'application/json',
                              'Content-Type': 'application/json'
                            }

                            return fetch(`${api}/data/file-upload`, {
                                headers,
                                method: 'POST',
                                body: JSON.stringify(payload)
                              })
                              .then(response => response.json())
                              .then(json => {
                                photoAfterBack = json.data.uid
                                photoAfterBackUrl = `${api}/files/${json.data.uid}.${json.data.extension}`.replace(/api\//, '')
                              })
                          }

                          reader.readAsDataURL(target.files[0])
                        }
                      }}/>
                      <span className="upload-gallery__ico">
                        <svg className="svg-icon ico-gallery">
                          <use xlinkHref="#ico-gallery"></use>
                        </svg>
                      </span>
                      <span className="upload-gallery__title">Сзади</span>
                      <span className="upload-gallery__img_wrap">
                        <img ref='afterBack' className="upload-gallery__img" src={photoAfterBackUrl} alt=""/>
                      </span>
                    </span>
                    <a href="#" onClick={e => {
                      e.preventDefault()
                      this.refs.inputAfterBack.click()
                    }}>
                      Загрузить
                    </a>
                  </li>
                  <li ref="liAfterLeft" className={ photoAfterLeftUrl ? 'upload-gallery__item upload-gallery__item--uploaded' : "upload-gallery__item" }>
                    <span className="upload-gallery__item-inner">
                      <input ref="inputAfterLeft" type="file" accept="image/*" className="upload-file__input" onChange={input => {
                        const { target } = input
                        if (target.files && target.files[0]) {
                          var reader = new FileReader()

                          reader.onload = e => {
                            this.refs.liAfterLeft.className='upload-gallery__item upload-gallery__item--uploaded'
                            this.refs.afterLeft.src = e.target.result

                            const content = reader.result.replace(/data:image\/\w+;base64,/, '')
                            const name = target.files[0].name
                            const payload = {
                              authToken: cookie.load('token'),
                              data: {
                                name,
                                content
                              }
                            }

                            const headers = {
                              'Accept': 'application/json',
                              'Content-Type': 'application/json'
                            }

                            return fetch(`${api}/data/file-upload`, {
                                headers,
                                method: 'POST',
                                body: JSON.stringify(payload)
                              })
                              .then(response => response.json())
                              .then(json => {
                                photoAfterLeft = json.data.uid
                                photoAfterLeftUrl = `${api}/files/${json.data.uid}.${json.data.extension}`.replace(/api\//, '')
                              })
                          }

                          reader.readAsDataURL(target.files[0])
                        }
                      }}/>
                      <span className="upload-gallery__ico">
                        <svg className="svg-icon ico-gallery">
                          <use xlinkHref="#ico-gallery"></use>
                        </svg>
                      </span>
                      <span className="upload-gallery__title">Слева</span>
                      <span className="upload-gallery__img_wrap">
                        <img ref='afterLeft' className="upload-gallery__img" src={photoAfterLeftUrl} alt=""/>
                      </span>
                    </span>
                    <a href="#" onClick={e => {
                      e.preventDefault()
                      this.refs.inputAfterLeft.click()
                    }}>
                      Загрузить
                    </a>
                  </li>

                  <li ref="liAfterRight" className={ photoAfterRightUrl ? 'upload-gallery__item upload-gallery__item--uploaded' : "upload-gallery__item" }>
                    <span className="upload-gallery__item-inner">
                      <input ref="inputAfterRight" type="file" accept="image/*" className="upload-file__input" onChange={input => {
                        const { target } = input
                        if (target.files && target.files[0]) {
                          var reader = new FileReader()

                          reader.onload = e => {
                            this.refs.liAfterRight.className='upload-gallery__item upload-gallery__item--uploaded'
                            this.refs.afterRight.src = e.target.result

                            const content = reader.result.replace(/data:image\/\w+;base64,/, '')
                            const name = target.files[0].name
                            const payload = {
                              authToken: cookie.load('token'),
                              data: {
                                name,
                                content
                              }
                            }

                            const headers = {
                              'Accept': 'application/json',
                              'Content-Type': 'application/json'
                            }

                            return fetch(`${api}/data/file-upload`, {
                                headers,
                                method: 'POST',
                                body: JSON.stringify(payload)
                              })
                              .then(response => response.json())
                              .then(json => {
                                photoAfterRight = json.data.uid
                                photoAfterRightUrl = `${api}/files/${json.data.uid}.${json.data.extension}`.replace(/api\//, '')
                              })
                          }

                          reader.readAsDataURL(target.files[0])
                        }
                      }}/>
                      <span className="upload-gallery__ico">
                        <svg className="svg-icon ico-gallery">
                          <use xlinkHref="#ico-gallery"></use>
                        </svg>
                      </span>
                      <span className="upload-gallery__title">Справа</span>
                      <span className="upload-gallery__img_wrap">
                        <img ref='afterRight' className="upload-gallery__img" src={photoAfterRightUrl} alt=""/>
                      </span>
                    </span>
                    <a href="#" onClick={e => {
                      e.preventDefault()
                      this.refs.inputAfterRight.click()
                    }}>
                      Загрузить
                    </a>
                  </li>
                </ul>

                <br/>

                <div className="input input--box">
                  <input ref="videoAfter" type="text" className="input__field" placeholder="http://youtube.com"/>
                </div>

                <div className="btn btn--primary" onClick={() => {
                  console.log(photoBeforeFrontUrl)
                  const payload = {
                    authToken: cookie.load('token'),
                    data: {
                      program: cookie.load('userProgram') ? cookie.load('userProgram') : 1,
                      photoBeforeFront,
                      photoBeforeBack,
                      photoBeforeLeft,
                      photoBeforeRight,
                      photoAfterFront,
                      photoAfterBack,
                      photoAfterLeft,
                      photoAfterRight,
                      photoBeforeFrontUrl,
                      photoBeforeBackUrl,
                      photoBeforeLeftUrl,
                      photoBeforeRightUrl,
                      photoAfterFrontUrl,
                      photoAfterBackUrl,
                      photoAfterLeftUrl,
                      photoAfterRightUrl,
                      photoBeforeVideoUrl,
                      photoAfterVideoUrl
                    }
                  }

                  let url = `${api}/user/userPhoto-update`

                  if (isEmpty)
                    url = `${api}/user/userPhoto-create`

                  console.log(payload)

                  return fetch(url, {
                    headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json'
                    },
                    method: 'POST',
                    body: JSON.stringify(payload)
                  })
                  .then(response => response.json())
                  .then(json => {
                    console.log(json)
                  })
                }}>
                  Отправить на проверку
                </div>

                <hr/>

                <p className="base-parag">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat blanditiis quo porro nesciunt consequuntur est dolore accusamus commodi dolorem. Vel nobis architecto perspiciatis eligendi libero odit nisi iure natus, repellendus laboriosam voluptates excepturi magni vero, dolorum reiciendis. Iusto, excepturi tenetur, quisquam unde voluptatibus adipisci iure, impedit modi ipsa consequatur iste.</p>

                <p className="base-parag">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat blanditiis quo porro nesciunt consequuntur est dolore accusamus commodi dolorem. Vel nobis architecto perspiciatis eligendi libero odit nisi iure natus, repellendus laboriosam voluptates excepturi magni vero, dolorum reiciendis. Iusto, excepturi tenetur, quisquam unde voluptatibus adipisci iure, impedit modi ipsa consequatur iste.</p> */}

              </div>

            </div>
          </div>
        </div>

        <ul className="menu-mob-bottom">
          <li className="menu-mob-bottom__item">
            <a href="#" className="menu-mob-bottom__item-inner" onClick={
              () => browserHistory.push('/task')
            }>
              <span className="menu-mob-bottom__ico">
                <svg className="svg-icon ico-m-tasks">
                  <use xlinkHref="#ico-m-tasks"></use>
                </svg>
              </span>
              <span className="menu-mob-bottom__title">Задания</span>
            </a>
          </li>
          {/* <li className="menu-mob-bottom__item">
            <a href="#" className="menu-mob-bottom__item-inner" onClick={
              () => browserHistory.push('/reports')
            }>
              <span className="menu-mob-bottom__ico">
                <svg className="svg-icon ico-m-book">
                  <use xlinkHref="#ico-m-book"></use>
                </svg>
              </span>
              <span className="menu-mob-bottom__title">Зачетка</span>
            </a>
          </li>
          <li className="menu-mob-bottom__item">
            <a href="#" className="menu-mob-bottom__item-inner" onClick={
              () => browserHistory.push('/food')
            }>
              <span className="menu-mob-bottom__ico">
                <svg className="svg-icon ico-m-food">
                  <use xlinkHref="#ico-m-food"></use>
                </svg>
              </span>
              <span className="menu-mob-bottom__title">Питание</span>
            </a>
          </li> */}
          <li className="menu-mob-bottom__item">
            <a href="#" className="menu-mob-bottom__item-inner" onClick={
              () => browserHistory.push('/faq')
            }>
              <span className="menu-mob-bottom__ico">
                <svg className="svg-icon ico-m-faq">
                  <use xlinkHref="#ico-m-faq"></use>
                </svg>
              </span>
              <span className="menu-mob-bottom__title">Вопросы/Ответы</span>
            </a>
          </li>
          <li className="menu-mob-bottom__item">
            <a href="#" className="menu-mob-bottom__item-inner" onClick={
              () => browserHistory.push('/profile')
            }>
              <span className="menu-mob-bottom__ico">
                <svg className="svg-icon ico-m-faq">
                  <use xlinkHref="#ico-m-faq"></use>
                </svg>
              </span>
              <span className="menu-mob-bottom__title">Профиль</span>
            </a>
          </li>
          <li className="menu-mob-bottom__item">
            <a href="#" className="menu-mob-bottom__item-inner" onClick={
              () => browserHistory.push('/photos')
            }>
              <span className="menu-mob-bottom__ico">
                <svg className="svg-icon ico-m-faq">
                  <use xlinkHref="#ico-m-faq"></use>
                </svg>
              </span>
              <span className="menu-mob-bottom__title">Фото</span>
            </a>
          </li>
        </ul>

        <div className="menu-mob-left">
          <div className="menu-mob-left__inner">
            <div className="menu-mob-left__ico-close">
              <svg className="svg-icon ico-close">
                <use xlinkHref="#ico-close"></use>
              </svg>
            </div>
            <div className="menu-mob-left__logo">
              <svg className="svg-icon ys_logo_web">
                <use xlinkHref="#ys_logo_web"></use>
              </svg>
            </div>
            <ul className="main-nav">
              <li className="main-nav__item main-nav__item--active">
                <a href="#" className="main-nav__item-inner">
                  <svg className="svg-icon ico-m-tasks">
                    <use xlinkHref="#ico-m-tasks"></use>
                  </svg>
                  <span className="main-nav__title">Задания</span>
                </a>
              </li>
              <li className="main-nav__item">
                <a href="#" className="main-nav__item-inner">
                  <svg className="svg-icon ico-m-book">
                    <use xlinkHref="#ico-m-book"></use>
                  </svg>
                  <span className="main-nav__title">Зачетка</span>
                </a>
              </li>
              <li className="main-nav__item">
                <a href="#" className="main-nav__item-inner">
                  <svg className="svg-icon ico-m-food">
                    <use xlinkHref="#ico-m-food"></use>
                  </svg>
                  <span className="main-nav__title">Питание</span>
                </a>
              </li>
              <li className="main-nav__item">
                <a href="#" className="main-nav__item-inner">
                  <svg className="svg-icon ico-m-faq">
                    <use xlinkHref="#ico-m-faq"></use>
                  </svg>
                  <span className="main-nav__title">Вопросы/Ответы</span>
                </a>
              </li>
            </ul>
            <hr/>
            <div className="profile">
              <a href="#">
                <p className="profile__name">Анна Иванова</p>
                <p className="profile__sub-text">Профиль</p>
              </a>
            </div>
            <hr/>
            <ul className="banner-ls banner-ls--menu-mob-left">
              <li className="banner-ls__item">
                <a href="#">
                  <div className="banner-ls__img">
                    <img src="tmp/banner-2.png" alt=""/>
                  </div>
                  <p className="banner-ls__desc">В твой выходной день только сегодня TezTour дарит -10% на тур</p>
                </a>
              </li>
              <li className="banner-ls__item">
                <a href="#">
                  <div className="banner-ls__img">
                    <img src="tmp/banner-1.png" alt=""/>
                  </div>
                </a>
              </li>
            </ul>
            <hr/>
            <div className="btn btn--action">Выйти из кабинета</div>
          </div>
        </div>

      </div>
    )
  }
}

const mapStateToProps = state => {
  const { selectedPhotos, recivedPhotos, userToken } = state

  const {
    isFetching,
    photos
  } = recivedPhotos[selectedPhotos] || {
    isFetching: true,
    photos: {}
  }

  return {
    selectedPhotos,
    isFetching,
    photos,
    token: userToken.token
  }
}

Photos = connect(
  mapStateToProps
)(Photos)

export default Photos
