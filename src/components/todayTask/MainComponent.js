import React, { PropTypes } from 'react';
import TaskButton from '../../stories/TaskButton';
import Welcome from '../../stories/Welcome';
import ExerciseTitle from '../../stories/task/ExerciseTitle';
import TaskTitle from '../../stories/task/TaskTitle';
import Calendar from '../../stories/task/Calendar';
import MenuButton from '../../stories/MenuButton';
import Profile from '../../stories/Profile';
import TextDarkBlue from '../../stories/TextDarkBlue';
import TextExercise from '../../stories/task/TextExercise';
import ChatTab from '../../stories/chat/ChatTab';
import Chat from '../../stories/chat/Chat';
import CalendarDayModal from '../../stories/task/CalendarDayModal';
import CalendarFinal from '../../stories/task/CalendarFinal';
import TasksAccordion from '../../stories/TasksAccordion';
import ModalReport from '../../stories/task/ModalReport';
import TasksAccordionHeader from '../../stories/TasksAccordionHeader';
import TasksAccordionContent from '../../stories/TasksAccordionContent';
import ButtonPoll from '../../stories/poll/ButtonPoll';
import ButtonPollSend from '../../stories/poll/ButtonPollSend';
import TextPoll from '../../stories/poll/TextPoll';
import Poll from '../../stories/poll/Poll';
import Header from '../../stories/Header';
import RemainTimeTitle from '../../stories/task/RemainTimeTitle';
import ExerciseHeader from '../../stories/task/ExerciseHeader';
import ExerciseHowTitle from '../../stories/task/ExerciseHowTitle';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import { Grid, Row, Col, Button } from 'react-bootstrap';
import { action } from '@kadira/storybook';

const MainComponent = taskDay => (
  <div style={{backgroundColor: '#FCFDFD'}}>
    <Grid>
      <Header>Header</Header>
      <Row>

        <Col md={2}>
          <MenuButton>Задания</MenuButton>
          <MenuButton>Зачетная книжка</MenuButton>
          <MenuButton>Питание</MenuButton>
          <MenuButton>ЧАВО</MenuButton>
          <hr/>
        {/* <Profile>{children.firstName} {children.lastName}</Profile> */}
          <hr/>
          //ads
        </Col>

        <Col md={1}>
          <Calendar onClick={action('clicked')} number='1' complete='failed'>Пн</Calendar>
          <Calendar onClick={action('clicked')} number='2' complete='complete'>Вт</Calendar>
          <Calendar onClick={action('clicked')} number='3'>Ср</Calendar>
          <Calendar onClick={action('clicked')} number='4' complete='failed'>Чт</Calendar>
          <Calendar onClick={action('clicked')} number='5' complete='complete'>Пт</Calendar>
          <Calendar onClick={action('clicked')} number='6'>Сб</Calendar>
          <Calendar onClick={action('clicked')} number='7' complete='failed'>Вс</Calendar>
          <Calendar onClick={action('clicked')} number='8' complete='complete'>Пн</Calendar>
          <Calendar onClick={action('clicked')} number='9'>Вт</Calendar>
          <Calendar onClick={action('clicked')} number='10'>Ср</Calendar>
        </Col>

        {console.log(taskDay)}
        <Col md={9} style={{backgroundColor: '#FFFFFF'}}>
          <b>
            <TaskTitle>{taskDay.taskDay.description}</TaskTitle>
          </b>

          <hr/>
          <RemainTimeTitle>Осталось 3 дня до зачета.</RemainTimeTitle>
          <TextDarkBlue center={true}>{taskDay.taskDay.task.description}</TextDarkBlue>
          <br/>
          <ExerciseHeader onClick={action('clicked')}>{taskDay.taskDay.task.name}</ExerciseHeader>
          <br/>
          <ExerciseHowTitle>{taskDay.taskDay.task.description}</ExerciseHowTitle>
          <br/>
          <TextExercise number='1'>Test test test test test test test test test.</TextExercise>
          <TextExercise number='2'>Test test test test test test test test test.</TextExercise>
          <TextExercise number='3'>Test test test test test test test test test.</TextExercise>
          <Row>
            <Col md={3}></Col>
            <Col md={6}>
              <div style={{margin: '0px 50px'}}>
                <TaskButton onClick={action('clicked')} complete='true'>ВЫПОЛНИЛ, ДАВАЙ СЛЕДУЮЩЕЕ!</TaskButton>
              </div>
            </Col>
            <Col md={3}></Col>
          </Row>

          <hr/>
          <b>
            <TaskTitle>Подведем итоги?</TaskTitle>
          </b>
          <TextDarkBlue center={true}>
            Молодец! На сегодня программа выполнена!
            Это конечно не максимум того, что мы могли бы сделать вместе,
            но у нас еще есть немного времени впедери.
          </TextDarkBlue>
          <Row>
            <Col md={4}></Col>
            <Col md={4}>
              <div style={{margin: '0px 25px'}}>
                <TaskButton onClick={action('clicked')} complete='true'>ЗАПОЛНИТЬ ОТЧЕТ!</TaskButton>
              </div>
            </Col>
            <Col md={4}></Col>
          </Row>

          <hr/>
          <b>
            <TaskTitle>Делись результатами</TaskTitle>
          </b>
          <br/>
          <Row>
            <Col md={2}></Col>
            <Col md={2}>
              <TaskButton onClick={action('clicked')}>ВКОНТАКТЕ</TaskButton>
            </Col>
            <Col md={1}></Col>
            <Col md={2}>
              <TaskButton onClick={action('clicked')}>ОДНОКЛАССНИКИ</TaskButton>
            </Col>
            <Col md={1}></Col>
            <Col md={2}>
              <TaskButton onClick={action('clicked')}>FACEBOOK</TaskButton>
            </Col>
            <Col md={2}></Col>
          </Row>
          <br/>
          <Poll fields={taskDay.taskDay.task.poll.fields}>
            {taskDay.taskDay.task.poll.description}
          </Poll>
        </Col>
      </Row>
    </Grid>
  </div>
);

MainComponent.propTypes = {
  taskDay: PropTypes.object.isRequired
};

export default MainComponent;
