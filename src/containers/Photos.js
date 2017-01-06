import React, { Component } from 'react'
// import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../actions'
import { api } from '../config.js'
import cookie from 'react-cookie'
import Menu from '../components/todayTask/Menu'
import CalendarList from '../components/todayTask/CalendarList'
import Header from '../stories/Header'

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
    const isEmpty = !photos || !photos.data
    if (!isEmpty) {
      photoBeforeFrontUrl = photos.data.photoBeforeFrontUrl
      photoBeforeBackUrl = photos.data.photoBeforeBackUrl
      photoBeforeLeftUrl = photos.data.photoBeforeLeftUrl
      photoBeforeRightUrl = photos.data.photoBeforeRightUrl
      photoAfterFrontUrl = photos.data.photoAfterFrontUrl
      photoAfterBackUrl = photos.data.photoAfterBackUrl
      photoAfterLeftUrl = photos.data.photoAfterLeftUrl
      photoAfterRightUrl = photos.data.photoAfterRightUrl

      photoBeforeVideoUrl = photos.data.photoBeforeVideoUrl
      photoAfterVideoUrl = photos.data.photoAfterVideoUrl
    }
    // const galleries = {
    //   before: {
    //     photos: ['tmp/photo-before.png', '', '', ''],
    //     text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat blanditiis quo porro nesciunt consequuntur est dolore accusamus commodi dolorem. Vel nobis architecto perspiciatis eligendi libero odit nisi iure natus, repellendus laboriosam voluptates excepturi magni vero, dolorum reiciendis. Iusto, excepturi tenetur, quisquam unde voluptatibus adipisci iure, impedit modi ipsa consequatur iste.'
    //   },
    //   after: {
    //     photos: ['', '', '', ''],
    //     text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat blanditiis quo porro nesciunt consequuntur est dolore accusamus commodi dolorem. Vel nobis architecto perspiciatis eligendi libero odit nisi iure natus, repellendus laboriosam voluptates excepturi magni vero, dolorum reiciendis. Iusto, excepturi tenetur, quisquam unde voluptatibus adipisci iure, impedit modi ipsa consequatur iste.'
    //   },
    // }

    //const { before, after } = galleries

    return (
      <div className="layout">

        <Header closeMobMenu={() => {}}/>

        <div className="layout__inner">
          <div className="grid">
            <div className="1/4--desk grid__cell layout__menu">
              <div className="grid layout__menu-inner">
                <Menu/>
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

                <h1 className="h1">Фото</h1>

                <hr/>

                <p className="base-parag">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat blanditiis quo porro nesciunt consequuntur est dolore accusamus commodi dolorem. Vel nobis architecto perspiciatis eligendi libero odit nisi iure natus, repellendus laboriosam voluptates excepturi magni vero, dolorum reiciendis. Iusto, excepturi tenetur, quisquam unde voluptatibus adipisci iure, impedit modi ipsa consequatur iste.</p>

                <p className="base-parag">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat blanditiis quo porro nesciunt consequuntur est dolore accusamus commodi dolorem. Vel nobis architecto perspiciatis eligendi libero odit nisi iure natus, repellendus laboriosam voluptates excepturi magni vero, dolorum reiciendis. Iusto, excepturi tenetur, quisquam unde voluptatibus adipisci iure, impedit modi ipsa consequatur iste.</p>

                <ul className="upload-gallery">
                  <li ref="liBeforeFront" className="upload-gallery__item">
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
                            //upload(photoBeforeFront, target.files[0].name)
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
                  <li ref="liBeforeBack" className="upload-gallery__item">
                    <span className="upload-gallery__item-inner">
                      <input ref="inputBeforeBack" type="file" accept="image/*" className="upload-file__input" onChange={input => {
                        const { target } = input
                        if (target.files && target.files[0]) {
                          var reader = new FileReader()

                          reader.onload = e => {
                            this.refs.liBeforeBack.className='upload-gallery__item upload-gallery__item--uploaded'
                            this.refs.beforeBack.src = e.target.result
                            photoBeforeBack = reader.result.replace(/data:image\/\w+;base64,/, '')
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
                  <li ref="liBeforeLeft" className="upload-gallery__item">
                    <span className="upload-gallery__item-inner">
                      <input ref="inputBeforeLeft" type="file" accept="image/*" className="upload-file__input" onChange={input => {
                        const { target } = input
                        if (target.files && target.files[0]) {
                          var reader = new FileReader()

                          reader.onload = e => {
                            this.refs.liBeforeLeft.className='upload-gallery__item upload-gallery__item--uploaded'
                            this.refs.beforeLeft.src = e.target.result
                            photoBeforeLeft = reader.result.replace(/data:image\/\w+;base64,/, '')
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

                  <li ref="liBeforeRight" className="upload-gallery__item">
                    <span className="upload-gallery__item-inner">
                      <input ref="inputBeforeRight" type="file" accept="image/*" className="upload-file__input" onChange={input => {
                        const { target } = input
                        if (target.files && target.files[0]) {
                          var reader = new FileReader()

                          reader.onload = e => {
                            this.refs.liBeforeRight.className='upload-gallery__item upload-gallery__item--uploaded'
                            this.refs.beforeRight.src = e.target.result
                            photoBeforeRight = reader.result.replace(/data:image\/\w+;base64,/, '')
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
                      photoBeforeVideoUrl,
                      photoAfterVideoUrl
                    }
                  }

                  let url = `${api}/user/userPhoto-update`

                  if (isEmpty)
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
                    console.log(json)
                  })
                }}>
                  Отправить на проверку
                </div>

                <hr/>

                <p className="base-parag">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat blanditiis quo porro nesciunt consequuntur est dolore accusamus commodi dolorem. Vel nobis architecto perspiciatis eligendi libero odit nisi iure natus, repellendus laboriosam voluptates excepturi magni vero, dolorum reiciendis. Iusto, excepturi tenetur, quisquam unde voluptatibus adipisci iure, impedit modi ipsa consequatur iste.</p>

                <p className="base-parag">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat blanditiis quo porro nesciunt consequuntur est dolore accusamus commodi dolorem. Vel nobis architecto perspiciatis eligendi libero odit nisi iure natus, repellendus laboriosam voluptates excepturi magni vero, dolorum reiciendis. Iusto, excepturi tenetur, quisquam unde voluptatibus adipisci iure, impedit modi ipsa consequatur iste.</p>

                <ul className="upload-gallery">
                  {/* {before.map(gallery => {

                  })} */}
                  <li ref="liAfterFront" className="upload-gallery__item">
                    <span className="upload-gallery__item-inner">
                      <input ref="inputAfterFront" type="file" accept="image/*" className="upload-file__input" onChange={input => {
                        const { target } = input
                        if (target.files && target.files[0]) {
                          var reader = new FileReader()

                          reader.onload = e => {
                            this.refs.liAfterFront.className='upload-gallery__item upload-gallery__item--uploaded'
                            this.refs.afterFront.src = e.target.result
                            photoAfterFront = reader.result.replace(/data:image\/\w+;base64,/, '')
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
                  <li ref="liAfterBack" className="upload-gallery__item">
                    <span className="upload-gallery__item-inner">
                      <input ref="inputAfterBack" type="file" accept="image/*" className="upload-file__input" onChange={input => {
                        const { target } = input
                        if (target.files && target.files[0]) {
                          var reader = new FileReader()

                          reader.onload = e => {
                            this.refs.liAfterBack.className='upload-gallery__item upload-gallery__item--uploaded'
                            this.refs.afterBack.src = e.target.result
                            photoAfterBack = reader.result.replace(/data:image\/\w+;base64,/, '')
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
                  <li ref="liAfterLeft" className="upload-gallery__item">
                    <span className="upload-gallery__item-inner">
                      <input ref="inputAfterLeft" type="file" accept="image/*" className="upload-file__input" onChange={input => {
                        const { target } = input
                        if (target.files && target.files[0]) {
                          var reader = new FileReader()

                          reader.onload = e => {
                            this.refs.liAfterLeft.className='upload-gallery__item upload-gallery__item--uploaded'
                            this.refs.afterLeft.src = e.target.result
                            photoAfterLeft = reader.result.replace(/data:image\/\w+;base64,/, '')
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

                  <li ref="liAfterRight" className="upload-gallery__item">
                    <span className="upload-gallery__item-inner">
                      <input ref="inputAfterRight" type="file" accept="image/*" className="upload-file__input" onChange={input => {
                        const { target } = input
                        if (target.files && target.files[0]) {
                          var reader = new FileReader()

                          reader.onload = e => {
                            this.refs.liAfterRight.className='upload-gallery__item upload-gallery__item--uploaded'
                            this.refs.afterRight.src = e.target.result
                            photoAfterRight = reader.result.replace(/data:image\/\w+;base64,/, '')
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
                  {/* <div className="btn btn--secondary">Прикрепить файл</div> */}
                </div>

                <div className="btn btn--primary">Отправить на проверку</div>

                <hr/>

                <p className="base-parag">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat blanditiis quo porro nesciunt consequuntur est dolore accusamus commodi dolorem. Vel nobis architecto perspiciatis eligendi libero odit nisi iure natus, repellendus laboriosam voluptates excepturi magni vero, dolorum reiciendis. Iusto, excepturi tenetur, quisquam unde voluptatibus adipisci iure, impedit modi ipsa consequatur iste.</p>

                <p className="base-parag">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat blanditiis quo porro nesciunt consequuntur est dolore accusamus commodi dolorem. Vel nobis architecto perspiciatis eligendi libero odit nisi iure natus, repellendus laboriosam voluptates excepturi magni vero, dolorum reiciendis. Iusto, excepturi tenetur, quisquam unde voluptatibus adipisci iure, impedit modi ipsa consequatur iste.</p>

              </div>

            </div>
          </div>
        </div>

        <ul className="menu-mob-bottom">
          <li className="menu-mob-bottom__item menu-mob-bottom__item--active">
            <a href="#" className="menu-mob-bottom__item-inner">
              <span className="menu-mob-bottom__ico">
                <svg className="svg-icon ico-m-tasks">
                  <use xlinkHref="#ico-m-tasks"></use>
                </svg>
              </span>
              <span className="menu-mob-bottom__title">Задания</span>
            </a>
          </li>
          <li className="menu-mob-bottom__item">
            <a href="#" className="menu-mob-bottom__item-inner">
              <span className="menu-mob-bottom__ico">
                <svg className="svg-icon ico-m-book">
                  <use xlinkHref="#ico-m-book"></use>
                </svg>
              </span>
              <span className="menu-mob-bottom__title">Зачетка</span>
            </a>
          </li>
          <li className="menu-mob-bottom__item">
            <a href="#" className="menu-mob-bottom__item-inner">
              <span className="menu-mob-bottom__ico">
                <svg className="svg-icon ico-m-food">
                  <use xlinkHref="#ico-m-food"></use>
                </svg>
              </span>
              <span className="menu-mob-bottom__title">Питание</span>
            </a>
          </li>
          <li className="menu-mob-bottom__item">
            <a href="#" className="menu-mob-bottom__item-inner">
              <span className="menu-mob-bottom__ico">
                <svg className="svg-icon ico-m-faq">
                  <use xlinkHref="#ico-m-faq"></use>
                </svg>
              </span>
              <span className="menu-mob-bottom__title">ЧАВО</span>
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
                  <span className="main-nav__title">ЧАВО</span>
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
