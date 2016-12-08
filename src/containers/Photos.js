import React, { Component } from 'react'
// import { bindActionCreators } from 'redux'
// import { connect } from 'react-redux'
// import * as actions from '../actions'
import Menu from '../components/todayTask/Menu'
import CalendarList from '../components/todayTask/CalendarList'
import Header from '../stories/Header'

class Photos extends Component {

  render() {
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
                <CalendarList calendar={[{
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
                }]}/>
              </div>
            </div>
            <div className="3/4--desk 1/1--pocket grid__cell layout__content">

              <div className="stage-box stage-box--small-padding">

                <h1 className="h1">Фото</h1>

                <hr/>

                <p className="base-parag">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat blanditiis quo porro nesciunt consequuntur est dolore accusamus commodi dolorem. Vel nobis architecto perspiciatis eligendi libero odit nisi iure natus, repellendus laboriosam voluptates excepturi magni vero, dolorum reiciendis. Iusto, excepturi tenetur, quisquam unde voluptatibus adipisci iure, impedit modi ipsa consequatur iste.</p>

                <p className="base-parag">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat blanditiis quo porro nesciunt consequuntur est dolore accusamus commodi dolorem. Vel nobis architecto perspiciatis eligendi libero odit nisi iure natus, repellendus laboriosam voluptates excepturi magni vero, dolorum reiciendis. Iusto, excepturi tenetur, quisquam unde voluptatibus adipisci iure, impedit modi ipsa consequatur iste.</p>

                <ul className="upload-gallery">
                  {/* {before.map(gallery => {

                  })} */}
                  <li className="upload-gallery__item upload-gallery__item--uploaded">
                    <span className="upload-gallery__item-inner">
                      <span className="upload-gallery__ico">
                        <svg className="svg-icon ico-gallery">
                          <use xlinkHref="#ico-gallery"></use>
                        </svg>
                      </span>
                      <span className="upload-gallery__title">Спереди</span>
                      <span className="upload-gallery__img_wrap">
                        <img className="upload-gallery__img" src="tmp/photo-before.png" alt=""/>
                      </span>
                    </span>
                    <a href="#">Удалить</a>
                  </li>
                  <li className="upload-gallery__item">
                    <span className="upload-gallery__item-inner">
                      <span className="upload-gallery__ico">
                        <svg className="svg-icon ico-gallery">
                          <use xlinkHref="#ico-gallery"></use>
                        </svg>
                      </span>
                      <span className="upload-gallery__title">Сзади</span>
                      <span className="upload-gallery__img_wrap">
                        <img className="upload-gallery__img" src="" alt=""/>
                      </span>
                    </span>
                    <a href="#">Загрузить</a>
                  </li>
                  <li className="upload-gallery__item">
                    <span className="upload-gallery__item-inner">
                      <span className="upload-gallery__ico">
                        <svg className="svg-icon ico-gallery">
                          <use xlinkHref="#ico-gallery"></use>
                        </svg>
                      </span>
                      <span className="upload-gallery__title">Слева</span>
                      <span className="upload-gallery__img_wrap">
                        <img className="upload-gallery__img" src="" alt=""/>
                      </span>
                    </span>
                    <a href="#">Загрузить</a>
                  </li>
                  <li className="upload-gallery__item">
                    <span className="upload-gallery__item-inner">
                      <span className="upload-gallery__ico">
                        <svg className="svg-icon ico-gallery">
                          <use xlinkHref="#ico-gallery"></use>
                        </svg>
                      </span>
                      <span className="upload-gallery__title">Справа</span>
                      <span className="upload-gallery__img_wrap">
                        <img className="upload-gallery__img" src="" alt=""/>
                      </span>
                    </span>
                    <a href="#">Загрузить</a>
                  </li>
                </ul>

                <div className="input input--box input--btn mb30">
                  <input type="text" className="input__field" placeholder="http://youtube.com"/>
                  <div className="btn btn--secondary">Прикрепить файл</div>
                </div>

                <div className="btn btn--primary">Отправить на проверку</div>

                <hr/>

                <p className="base-parag">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat blanditiis quo porro nesciunt consequuntur est dolore accusamus commodi dolorem. Vel nobis architecto perspiciatis eligendi libero odit nisi iure natus, repellendus laboriosam voluptates excepturi magni vero, dolorum reiciendis. Iusto, excepturi tenetur, quisquam unde voluptatibus adipisci iure, impedit modi ipsa consequatur iste.</p>

                <p className="base-parag">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat blanditiis quo porro nesciunt consequuntur est dolore accusamus commodi dolorem. Vel nobis architecto perspiciatis eligendi libero odit nisi iure natus, repellendus laboriosam voluptates excepturi magni vero, dolorum reiciendis. Iusto, excepturi tenetur, quisquam unde voluptatibus adipisci iure, impedit modi ipsa consequatur iste.</p>

                <ul className="upload-gallery">
                  <li className="upload-gallery__item upload-gallery__item--uploaded">
                    <span className="upload-gallery__item-inner">
                      <span className="upload-gallery__ico">
                        <svg className="svg-icon ico-gallery">
                          <use xlinkHref="#ico-gallery"></use>
                        </svg>
                      </span>
                      <span className="upload-gallery__title">Спереди</span>
                      <span className="upload-gallery__img_wrap">
                        <img className="upload-gallery__img" src="tmp/photo-before.png" alt=""/>
                      </span>
                    </span>
                    <a href="#">Удалить</a>
                  </li>
                  <li className="upload-gallery__item">
                    <span className="upload-gallery__item-inner">
                      <span className="upload-gallery__ico">
                        <svg className="svg-icon ico-gallery">
                          <use xlinkHref="#ico-gallery"></use>
                        </svg>
                      </span>
                      <span className="upload-gallery__title">Сзади</span>
                      <span className="upload-gallery__img_wrap">
                        <img className="upload-gallery__img" src="" alt=""/>
                      </span>
                    </span>
                    <a href="#">Загрузить</a>
                  </li>
                  <li className="upload-gallery__item">
                    <span className="upload-gallery__item-inner">
                      <span className="upload-gallery__ico">
                        <svg className="svg-icon ico-gallery">
                          <use xlinkHref="#ico-gallery"></use>
                        </svg>
                      </span>
                      <span className="upload-gallery__title">Слева</span>
                      <span className="upload-gallery__img_wrap">
                        <img className="upload-gallery__img" src="" alt=""/>
                      </span>
                    </span>
                    <a href="#">Загрузить</a>
                  </li>
                  <li className="upload-gallery__item">
                    <span className="upload-gallery__item-inner">
                      <span className="upload-gallery__ico">
                        <svg className="svg-icon ico-gallery">
                          <use xlinkHref="#ico-gallery"></use>
                        </svg>
                      </span>
                      <span className="upload-gallery__title">Справа</span>
                      <span className="upload-gallery__img_wrap">
                        <img className="upload-gallery__img" src="" alt=""/>
                      </span>
                    </span>
                    <a href="#">Загрузить</a>
                  </li>
                </ul>

                <div className="input input--box input--btn mb30">
                  <input type="text" className="input__field" placeholder="http://youtube.com"/>
                  <div className="btn btn--secondary">Прикрепить файл</div>
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

export default Photos
