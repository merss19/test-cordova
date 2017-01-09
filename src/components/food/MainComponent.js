import React, { Component } from 'react'
import Menu from '../todayTask/Menu'
import CalendarList from '../todayTask/CalendarList'
import Header from '../../stories/Header'
import Chat from '../../stories/chat/Chat'
import TaskIntro from '../todayTask/TaskIntro'

class MainComponent extends Component {
  render() {
    const { food } = this.props
    console.log('FOOOOOOOOOOOÖd')
    console.log(food)
    const introJSON = food && food.content ? JSON.parse(food.content) : null
    return (
      <div className="layout">
        <Header/>
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

              <TaskIntro json={introJSON} />

              {/* {food.chat && food.chat[0] &&
                <Chat chat={food.chat} userId={1} />
              } */}

            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MainComponent
