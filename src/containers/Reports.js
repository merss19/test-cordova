import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../actions'
import Menu from '../components/todayTask/Menu'
import CalendarList from '../components/todayTask/CalendarList'
import Header from '../stories/Header'
import Chat from '../stories/chat/Chat'

import MainComponent from '../components/todayTask/MainComponent'

class Reports extends Component {

  render() {
    return (
      <div className="layout">
        <Header/>
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

              <div className="stage-box stage-box--no-padding">

                <h1 className="h1">Отчеты за все дни</h1>

                <ul className="accordion accordion--reports">
                  <li className="accordion__item accordion__item--active">
                    <div className="accordion__header">
                      <div className="accordion__state accordion__state--done">Зачет</div>
                      <div className="accordion__date">12/12/17</div>
                      <div className="accordion__name">Олег Алексеев</div>
                      <div className="accordion__qty-msg">
                        <svg className="svg-icon ico-msg">
                          <use xlinkHref="#ico-msg"></use>
                        </svg>
                        <span className="num">5</span>
                      </div>
                      <div className="accordion__btn">
                        <div className="accordion__btn-title">свернуть</div>
                        <svg className="svg-icon ico-arrow-accordion">
                          <use xlinkHref="#ico-arrow-accordion"></use>
                        </svg>
                      </div>
                    </div>
                    <div className="accordion__content">
                      <ul className="chat-content">
                        <li className="chat-msg chat-msg--you chat-msg--system">
                          <div className="chat-msg__content">
                            <div className="chat-msg__text">Выполнила! Состояние: Отлично!</div>
                          </div>
                          <div className="chat-msg__ava">
                            <img src="tmp/ava-you.png" alt=""/>
                          </div>
                        </li>
                        <li className="chat-msg chat-msg--someone">
                          <div className="chat-msg__ava">
                            <img src="tmp/ava-t-big.png" alt=""/>
                          </div>
                          <div className="chat-msg__content">
                            <p className="chat-msg__name">Олег Алексеев</p>
                            <div className="chat-msg__text">Умница, Анна! Я рад, что все идет по плану. Помните, что все зависит только от вас, и с каждым выполненным упражнением вы становитесь легче :)</div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li className="accordion__item">
                    <div className="accordion__header">
                      <div className="accordion__state accordion__state--done">Зачет</div>
                      <div className="accordion__date">12/12/17</div>
                      <div className="accordion__name">Олег Алексеев</div>
                      <div className="accordion__qty-msg">
                        <svg className="svg-icon ico-msg">
                          <use xlinkHref="#ico-msg"></use>
                        </svg>
                        <span className="num">5</span>
                      </div>
                      <div className="accordion__btn">
                        <div className="accordion__btn-title">развернуть</div>
                        <svg className="svg-icon ico-arrow-accordion">
                          <use xlinkHref="#ico-arrow-accordion"></use>
                        </svg>
                      </div>
                    </div>
                    <div className="accordion__content">
                      <ul className="chat-content">
                        <li className="chat-msg chat-msg--you chat-msg--system">
                          <div className="chat-msg__content">
                            <div className="chat-msg__text">Выполнила! Состояние: Отлично!</div>
                          </div>
                          <div className="chat-msg__ava">
                            <img src="tmp/ava-you.png" alt=""/>
                          </div>
                        </li>
                        <li className="chat-msg chat-msg--someone">
                          <div className="chat-msg__ava">
                            <img src="tmp/ava-t-big.png" alt=""/>
                          </div>
                          <div className="chat-msg__content">
                            <p className="chat-msg__name">Олег Алексеев</p>
                            <div className="chat-msg__text">Умница, Анна! Я рад, что все идет по плану. Помните, что все зависит только от вас, и с каждым выполненным упражнением вы становитесь легче :)</div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li className="accordion__item">
                    <div className="accordion__header">
                      <div className="accordion__state accordion__state--cross">Не сдан</div>
                      <div className="accordion__date">12/12/17</div>
                      <div className="accordion__name">Олег Алексеев</div>
                      <div className="accordion__qty-msg">
                        <svg className="svg-icon ico-msg">
                          <use xlinkHref="#ico-msg"></use>
                        </svg>
                        <span className="num">5</span>
                      </div>
                      <div className="accordion__btn">
                        <div className="accordion__btn-title">развернуть</div>
                        <svg className="svg-icon ico-arrow-accordion">
                          <use xlinkHref="#ico-arrow-accordion"></use>
                        </svg>
                      </div>
                    </div>
                    <div className="accordion__content">
                      <ul className="chat-content">
                        <li className="chat-msg chat-msg--you chat-msg--system">
                          <div className="chat-msg__content">
                            <div className="chat-msg__text">Выполнила! Состояние: Отлично!</div>
                          </div>
                          <div className="chat-msg__ava">
                            <img src="tmp/ava-you.png" alt=""/>
                          </div>
                        </li>
                        <li className="chat-msg chat-msg--someone">
                          <div className="chat-msg__ava">
                            <img src="tmp/ava-t-big.png" alt=""/>
                          </div>
                          <div className="chat-msg__content">
                            <p className="chat-msg__name">Олег Алексеев</p>
                            <div className="chat-msg__text">Умница, Анна! Я рад, что все идет по плану. Помните, что все зависит только от вас, и с каждым выполненным упражнением вы становитесь легче :)</div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li className="accordion__item">
                    <div className="accordion__header">
                      <div className="accordion__state accordion__state--waiting">Проверка</div>
                      <div className="accordion__date">12/12/17</div>
                      <div className="accordion__name">Олег Алексеев</div>
                      <div className="accordion__qty-msg">
                        <svg className="svg-icon ico-msg">
                          <use xlinkHref="#ico-msg"></use>
                        </svg>
                        <span className="num">5</span>
                      </div>
                      <div className="accordion__btn">
                        <div className="accordion__btn-title">развернуть</div>
                        <svg className="svg-icon ico-arrow-accordion">
                          <use xlinkHref="#ico-arrow-accordion"></use>
                        </svg>
                      </div>
                    </div>
                    <div className="accordion__content">
                      <ul className="chat-content">
                        <li className="chat-msg chat-msg--you chat-msg--system">
                          <div className="chat-msg__content">
                            <div className="chat-msg__text">Выполнила! Состояние: Отлично!</div>
                          </div>
                          <div className="chat-msg__ava">
                            <img src="tmp/ava-you.png" alt=""/>
                          </div>
                        </li>
                        <li className="chat-msg chat-msg--someone">
                          <div className="chat-msg__ava">
                            <img src="tmp/ava-t-big.png" alt=""/>
                          </div>
                          <div className="chat-msg__content">
                            <p className="chat-msg__name">Олег Алексеев</p>
                            <div className="chat-msg__text">Умница, Анна! Я рад, что все идет по плану. Помните, что все зависит только от вас, и с каждым выполненным упражнением вы становитесь легче :)</div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li className="accordion__item">
                    <div className="accordion__header">
                      <div className="accordion__state accordion__state--cross">Не сдан</div>
                      <div className="accordion__date">12/12/17</div>
                      <div className="accordion__name">Олег Алексеев</div>
                      <div className="accordion__qty-msg">
                        <svg className="svg-icon ico-msg">
                          <use xlinkHref="#ico-msg"></use>
                        </svg>
                        <span className="num">5</span>
                      </div>
                      <div className="accordion__btn">
                        <div className="accordion__btn-title">развернуть</div>
                        <svg className="svg-icon ico-arrow-accordion">
                          <use xlinkHref="#ico-arrow-accordion"></use>
                        </svg>
                      </div>
                    </div>
                    <div className="accordion__content">
                      <ul className="chat-content">
                        <li className="chat-msg chat-msg--you chat-msg--system">
                          <div className="chat-msg__content">
                            <div className="chat-msg__text">Выполнила! Состояние: Отлично!</div>
                          </div>
                          <div className="chat-msg__ava">
                            <img src="tmp/ava-you.png" alt=""/>
                          </div>
                        </li>
                        <li className="chat-msg chat-msg--someone">
                          <div className="chat-msg__ava">
                            <img src="tmp/ava-t-big.png" alt=""/>
                          </div>
                          <div className="chat-msg__content">
                            <p className="chat-msg__name">Олег Алексеев</p>
                            <div className="chat-msg__text">Умница, Анна! Я рад, что все идет по плану. Помните, что все зависит только от вас, и с каждым выполненным упражнением вы становитесь легче :)</div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li className="accordion__item">
                    <div className="accordion__header">
                      <div className="accordion__state accordion__state--done">Зачет</div>
                      <div className="accordion__date">12/12/17</div>
                      <div className="accordion__name">Олег Алексеев</div>
                      <div className="accordion__qty-msg">
                        <svg className="svg-icon ico-msg">
                          <use xlinkHref="#ico-msg"></use>
                        </svg>
                        <span className="num">5</span>
                      </div>
                      <div className="accordion__btn">
                        <div className="accordion__btn-title">развернуть</div>
                        <svg className="svg-icon ico-arrow-accordion">
                          <use xlinkHref="#ico-arrow-accordion"></use>
                        </svg>
                      </div>
                    </div>
                    <div className="accordion__content">
                      <ul className="chat-content">
                        <li className="chat-msg chat-msg--you chat-msg--system">
                          <div className="chat-msg__content">
                            <div className="chat-msg__text">Выполнила! Состояние: Отлично!</div>
                          </div>
                          <div className="chat-msg__ava">
                            <img src="tmp/ava-you.png" alt=""/>
                          </div>
                        </li>
                        <li className="chat-msg chat-msg--someone">
                          <div className="chat-msg__ava">
                            <img src="tmp/ava-t-big.png" alt=""/>
                          </div>
                          <div className="chat-msg__content">
                            <p className="chat-msg__name">Олег Алексеев</p>
                            <div className="chat-msg__text">Умница, Анна! Я рад, что все идет по плану. Помните, что все зависит только от вас, и с каждым выполненным упражнением вы становитесь легче :)</div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>

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

export default Reports
