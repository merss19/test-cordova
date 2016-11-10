import React from 'react';
import ButtonPoll from './ButtonPoll';
import ButtonPollSend from './ButtonPollSend';
import TextPoll from './TextPoll';

const modalViewStyles = {
  backgroundColor: '#1F447B',
};

const buttonsStyles = {
  margin: 'auto',
  width: '50%',
};
const problemStyles = {};

function sendPoll(e) {
  e.preventDefault();
  console.log('send')
}

function select(children) {
  console.log(children)
}

const Poll = ({ children, fields }) => {
  return (
    <div style={modalViewStyles}>
      <form action={sendPoll}>
        <br/>
        <TextPoll>{children}</TextPoll>
        <hr/>
        {fields.map((field, index) => (
          <ButtonPoll onClick={select} key={index}>{field.name}</ButtonPoll>
        ))}
        <br/>
        <div style={buttonsStyles}>
          <input type={'text'} placeholder={'Другая'}/>
          <ButtonPollSend onClick={sendPoll}>ОТПРАВИТЬ</ButtonPollSend>
        </div>
      </form>
    </div>
  );
};

Poll.propTypes = {
  children: React.PropTypes.string.isRequired,
  onClick: React.PropTypes.func,
};

export default Poll;
