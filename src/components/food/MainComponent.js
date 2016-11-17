import React, { PropTypes } from 'react'
import Menu from '../todayTask/Menu'
import CalendarList from '../todayTask/CalendarList'
import Header from '../../stories/Header'
import Chat from '../../stories/chat/Chat'

const MainComponent = () => (
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

          <div className="stage-box stage-box--small-padding">

            <h2 className="h1">Питание</h2>

            <div className="tabs">
              <ul className="tabs__nav">
                <li className="tabs__nav-item tabs__nav-item--active">Меню</li>
                <li className="tabs__nav-item">Партнеры</li>
                <li className="tabs__nav-item">Таблица</li>
              </ul>
              <div className="tabs__content">
                <h4 className="h2 text-left">Соте из морепродуктов и овощей</h4>
                <div className="grid">
                  <div className="1/1--pocket 1/2--lap 1/2--desk grid__cell">
                    <div className="img-wrap">
                      <img src="tmp/food-pic.png" alt=""/>
                    </div>
                  </div>
                  <div className="1/1--pocket 1/2--lap 1/2--desk grid__cell">
                    <table className="base-table">
                      <tr>
                        <th>Продукты</th>
                        <th>Калорийность</th>
                      </tr>
                      <tr>
                        <td>Морская капуста</td>
                        <td className="base-table__cell-center">5</td>
                      </tr>
                      <tr>
                        <td>Салат латук</td>
                        <td className="base-table__cell-center">12</td>
                      </tr>
                      <tr>
                        <td>Зелень (петрушка, укроп)</td>
                        <td className="base-table__cell-center">13</td>
                      </tr>
                    </table>
                    <h6 className="h3 text-left">Как готовить</h6>
                    <p>Продукты промыть, почистить овощи. Лук нарезать ... <a href="#">дальше</a></p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          <h2 className="h1">Чаты</h2>

          <Chat>Test</Chat>

        </div>
      </div>
    </div>
  </div>
)

export default MainComponent
