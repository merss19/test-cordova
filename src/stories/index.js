import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import TaskButton from './TaskButton';
import Welcome from './Welcome';
import ExerciseTitle from './task/ExerciseTitle';
import TaskTitle from './task/TaskTitle';
import Calendar from './task/Calendar';
import MenuButton from './MenuButton';
import Profile from './Profile';
import TextDarkBlue from './TextDarkBlue';
import TextExercise from './task/TextExercise';
import ChatTab from './ChatTab';
import Chat from './Chat';
import CalendarDayModal from './task/CalendarDayModal';
import CalendarFinal from './task/CalendarFinal';
import FAQAccordion from './FAQAccordion';
import TasksAccordion from './TasksAccordion';
import ModalReport from './task/ModalReport';
import TasksAccordionHeader from './TasksAccordionHeader';
import TasksAccordionContent from './TasksAccordionContent';
import ButtonPoll from './poll/ButtonPoll';
import ButtonPollSend from './poll/ButtonPollSend';
import TextPoll from './poll/TextPoll';
import Poll from './poll/Poll';
import Header from './Header';
import RemainTimeTitle from './task/RemainTimeTitle';
import ExerciseHeader from './task/ExerciseHeader';
import ExerciseHowTitle from './task/ExerciseHowTitle';
import styles from '../../node_modules/pills/dist/pills.min.css';

storiesOf('Task', module)
  .add('TaskButton complete', () => (
    <TaskButton onClick={action('clicked')} complete='true'>ГОТОВО! 👍</TaskButton>
  ))
  .add('TaskButton uncomplete', () => (
    <TaskButton onClick={action('clicked')}>ВЫПОЛНИТЬ 😀</TaskButton>
  ))
  .add('ExerciseTitle complete', () => (
    <ExerciseTitle number='1' complete='true'>Первый круг</ExerciseTitle>
  ))
  .add('ExerciseTitle uncomplete', () => (
    <ExerciseTitle number='1'>Первый круг</ExerciseTitle>
  ))
  .add('TaskTitle', () => (
    <TaskTitle>Упражнения</TaskTitle>
  ))
  .add('TextExercise', () => (
    <div>
      <TextExercise number='1'>Test test test test test test test test test.</TextExercise>
      <TextExercise number='2'>Test test test test test test test test test.</TextExercise>
      <TextExercise number='3'>Test test test test test test test test test.</TextExercise>
    </div>
  ))
  .add('Header', () => (
    <div style={{backgroundColor: '#FCFDFD'}}>
      <Header>Header</Header>
      <div className='row'>

        <div className='two columns'>
          <MenuButton>Задания</MenuButton>
          <MenuButton>Зачетная книжка</MenuButton>
          <MenuButton>Питание</MenuButton>
          <MenuButton>ЧАВО</MenuButton>
          <hr/>
          <Profile>Анна Иванова</Profile>
          <hr/>
          //ads
        </div>

        <div className='one columns'>
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
        </div>

        <div className='nine columns' style={{backgroundColor: '#FFFFFF'}}>
          <b>
            <TaskTitle>Привет! Сегодня для тебя подготовлены задания. Выполняй - получай призы и бонусы</TaskTitle>
          </b>

          <hr/>
          <RemainTimeTitle>Осталось 3 дня до зачета.</RemainTimeTitle>
          <TextDarkBlue center={true}>Поторопись выполнить пропущенные дни, иначе немало шансов вылететь насовсем!</TextDarkBlue>
          <br/>
          <ExerciseHeader onClick={action('clicked')}>Первый круг</ExerciseHeader>
          <br/>
          <ExerciseHowTitle>Как правильно выполнять</ExerciseHowTitle>
          <br/>
          <TextExercise number='1'>Test test test test test test test test test.</TextExercise>
          <TextExercise number='2'>Test test test test test test test test test.</TextExercise>
          <TextExercise number='3'>Test test test test test test test test test.</TextExercise>
          <div className='row'>
            <div className='three columns'></div>
            <div className='six columns'>
              <div style={{margin: '0px 50px'}}>
                <TaskButton onClick={action('clicked')} complete='true'>ВЫПОЛНИЛ, ДАВАЙ СЛЕДУЮЩЕЕ!</TaskButton>
              </div>
            </div>
            <div className='three columns'></div>
          </div>

          <hr/>
          <b>
            <TaskTitle>Подведем итоги?</TaskTitle>
          </b>
          <TextDarkBlue center={true}>
            Молодец! На сегодня программа выполнена!
            Это конечно не максимум того, что мы могли бы сделать вместе,
            но у нас еще есть немного времени впедери.
          </TextDarkBlue>
          <div className='row'>
            <div className='four columns'></div>
            <div className='four columns'>
              <div style={{margin: '0px 25px'}}>
                <TaskButton onClick={action('clicked')} complete='true'>ЗАПОЛНИТЬ ОТЧЕТ!</TaskButton>
              </div>
            </div>
            <div className='four columns'></div>
          </div>

          <hr/>
          <b>
            <TaskTitle>Делись результатами</TaskTitle>
          </b>
          <br/>
          <div className='row'>
            <div className='two columns'/>
            <div className='two columns'>
              <TaskButton onClick={action('clicked')}>ВКОНТАКТЕ</TaskButton>
            </div>
            <div className='one columns'/>
            <div className='two columns'>
              <TaskButton onClick={action('clicked')}>ОДНОКЛАССНИКИ</TaskButton>
            </div>
            <div className='one columns'/>
            <div className='two columns'>
              <TaskButton onClick={action('clicked')}>FACEBOOK</TaskButton>
            </div>
            <div className='two columns'/>
          </div>
          <br/>
          <Poll>Какие кросовки ты носишь?</Poll>
        </div>
      </div>
    </div>
  ))

storiesOf('Calendar', module)
  .add('complete', () => (
    <Calendar onClick={action('clicked')} number='1' complete='complete'>Пн</Calendar>
  ))
  .add('failed', () => (
    <Calendar onClick={action('clicked')} number='1' complete='failed'>Пн</Calendar>
  ))
  .add('uncomplete', () => (
    <Calendar onClick={action('clicked')} number='1'>Пн</Calendar>
  ))
  .add('few cells', () => (
    <div>
      <Calendar onClick={action('clicked')} number='1' complete='failed'>Пн</Calendar>
      <Calendar onClick={action('clicked')} number='2' complete='complete'>Вт</Calendar>
      <Calendar onClick={action('clicked')} number='3'>Ср</Calendar>
    </div>
  ))
  .add('CalendarDayModal', () => (
    <CalendarDayModal date='27/10/16' admin='Миньон'>Зачтено</CalendarDayModal>
  ))
  .add('CalendarFinal', () => (
    <CalendarFinal onClick={action('clicked')} number='28'>Пт</CalendarFinal>
  ))

storiesOf('Left menu', module)
  .add('MenuButton', () => (
    <MenuButton>Задания</MenuButton>
  ))
  .add('Profile', () => (
    <Profile>Анна Иванова</Profile>
  ))

storiesOf('TextDarkBlue', module)
  .add('test', () => (
    <TextDarkBlue>Test test test test test test test test test.</TextDarkBlue>
  ))

storiesOf('Chat', module)
  .add('test', () => (
    <Chat>Test chat</Chat>
  ))
  .add('ChatTab', () => (
    <ChatTab onClick={action('clicked')} count='2'>С тренером</ChatTab>
  ))

storiesOf('FAQ accordion', module)
  .add('FAQAccordion', () => (
    <FAQAccordion>Test</FAQAccordion>
  ))

storiesOf('Tasks accordion', module)
  .add('TasksAccordion', () => (
    <TasksAccordion user='123'>Test</TasksAccordion>
  ))
  .add('TasksAccordionHeader', () => {
    const task = {
      status: 'Зачет',
      date: '12/12/17',
      admin: 'Олег Алексеев',
      comments: ['test']};
    return (
      <TasksAccordionHeader task={task}>
          Success
      </TasksAccordionHeader>
    );
  })
  .add('TasksAccordionContent', () => {
    const comments = [{
      author: 'Олег',
      text: 'Sup girl?',
      photo: 'https://cdn2.iconfinder.com/data/icons/users-6/100/USER10-128.png',
    },{
      author: 'Анна',
      text: 'Все плохо',
      photo: 'https://cdn2.iconfinder.com/data/icons/users-6/100/USER10-128.png',}];
    return (
      <TasksAccordionContent comments={comments}>
          Success
      </TasksAccordionContent>
    );
  })

storiesOf('ModalReport', module)
  .add('not exam', () => (
    <ModalReport>Test</ModalReport>
  ))
  .add('exam', () => (
    <ModalReport exam={true}>Test</ModalReport>
  ))


storiesOf('Poll', module)
  .add('ButtonPoll', () => (
      <div>
        <ButtonPoll onClick={action('clicked')}>Nike</ButtonPoll>
        <ButtonPoll onClick={action('clicked')}>Adidas</ButtonPoll>
        <ButtonPoll onClick={action('clicked')}>Reebok</ButtonPoll>
        <ButtonPoll onClick={action('clicked')}>Asics</ButtonPoll>
      </div>
    )
  )
  .add('ButtonPollSend', () => (
      <ButtonPollSend onClick={action('clicked')}>Отправить</ButtonPollSend>
    )
  )
  .add('TextPoll', () => (
      <TextPoll onClick={action('clicked')}>Какие кросовки ты носишь?</TextPoll>
    )
  )
  .add('Poll', () => (
      <Poll>Какие кросовки ты носишь?</Poll>
    )
  )
