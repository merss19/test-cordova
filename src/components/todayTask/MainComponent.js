import React, { PropTypes } from 'react'
import TaskButton from '../../stories/TaskButton'
import Welcome from '../../stories/Welcome'
import ExerciseTitle from '../../stories/task/ExerciseTitle'
import TaskTitle from '../../stories/task/TaskTitle'
import Calendar from '../../stories/task/Calendar'
import Profile from '../../stories/Profile'
import TextDarkBlue from '../../stories/TextDarkBlue'
import TextExercise from '../../stories/task/TextExercise'
import ChatTab from '../../stories/chat/ChatTab'
import Chat from '../../stories/chat/Chat'
import CalendarDayModal from '../../stories/task/CalendarDayModal'
import CalendarFinal from '../../stories/task/CalendarFinal'
import TasksAccordion from '../../stories/TasksAccordion'
import ModalReport from '../../stories/task/ModalReport'
import TasksAccordionHeader from '../../stories/TasksAccordionHeader'
import TasksAccordionContent from '../../stories/TasksAccordionContent'
import ButtonPoll from '../../stories/poll/ButtonPoll'
import ButtonPollSend from '../../stories/poll/ButtonPollSend'
import TextPoll from '../../stories/poll/TextPoll'
import Poll from '../../stories/poll/Poll'
import Header from '../../stories/Header'
import RemainTimeTitle from '../../stories/task/RemainTimeTitle'
import ExerciseHeader from '../../stories/task/ExerciseHeader'
import ExerciseHowTitle from '../../stories/task/ExerciseHowTitle'
import CalendarList from './CalendarList'
import TaskIntro from './TaskIntro'
import Menu from './Menu'
import Exercises from './Exercises'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap-theme.css'
import { Grid, Row, Col, Button } from 'react-bootstrap'
import { action } from '@kadira/storybook'

const MainComponent = taskDay => (
  <div className="layout">
    {console.log(taskDay)}
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
          <TaskIntro>Test</TaskIntro>
          <Exercises/>

          <Poll fields={taskDay.taskDay.task.poll.fields}>
            {taskDay.taskDay.task.poll.description}
          </Poll>

          <h2 class="h1">Чаты</h2>
          <Chat>Test</Chat>
        </div>
      </div>
    </div>
  </div>
)

MainComponent.propTypes = {
  taskDay: PropTypes.object.isRequired
}

export default MainComponent
