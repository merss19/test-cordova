import React from 'react';
import TextDarkBlue from '../TextDarkBlue';
import ButtonGreen from '../ButtonGreen';
import LinkClose from '../LinkClose';
import TaskTitle from './TaskTitle';

const modalViewStyles = {};
const reportStyles = {};
const problemStyles = {};

function sendReport(e) {
  e.preventDefault();
}

function close() {
}

const ModalReport = ({ children, exam }) => {
  if (exam) {
    return (
      <div style={modalViewStyles}>
        <form action={sendReport}>
          <LinkClose onClick={close}>Закрыть</LinkClose>
          <hr/>
          <TaskTitle>Отчет миньону</TaskTitle>
          <TextDarkBlue>Напиши ниже, что ты все сделал.</TextDarkBlue>
          <textarea style={reportStyles} placeholder={'Сообщение о выполнении задания'}/>
          <textarea style={problemStyles} placeholder={'Сообщение о возникших проблемах'}/>
          <input type={'text'} placeholder={'Вставьте сюда ссылку на видео'}/>
          <ButtonGreen onClick={sendReport}>ОТПРАВИТЬ ОТЧЕТ</ButtonGreen>
        </form>
      </div>
    );
  } else {
    return (
      <div style={modalViewStyles}>
        <form>
          <LinkClose onClick={close}>Закрыть</LinkClose>
          <hr/>
          <TaskTitle>Отчет миньону</TaskTitle>
          <TextDarkBlue>Напиши ниже, что ты все сделал.</TextDarkBlue>
          <textarea style={reportStyles} placeholder={'Сообщение о выполнении задания'}/>
          <textarea style={problemStyles} placeholder={'Сообщение о возникших проблемах'}/>
          <ButtonGreen onClick={sendReport}>ОТПРАВИТЬ ОТЧЕТ</ButtonGreen>
        </form>
      </div>
    );
  }
};

ModalReport.propTypes = {
  children: React.PropTypes.string.isRequired,
  onClick: React.PropTypes.func,
};

export default ModalReport;
