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
import { action } from '@kadira/storybook';

const MainComponent = taskDay => (
  <div>
  </div>
);

MainComponent.propTypes = {
  taskDay: PropTypes.object.isRequired
};

export default MainComponent;
