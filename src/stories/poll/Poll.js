import React from 'react';
import ButtonPoll from './ButtonPoll';
import ButtonPollSend from './ButtonPollSend';
import TextPoll from './TextPoll';

function sendPoll(e) {
  e.preventDefault();
}

function select(children) {
}

const Poll = ({ children, fields }) => {
  return (
    <div className="question-form">
      <h4 className="h1 question-form__title">{children}</h4>
      <ul className="options options--black mb60">
        {fields.map((field, index) => (
          <ButtonPoll onClick={select} key={index}>{field.name}</ButtonPoll>
        ))}
        <li className="options__item is-active">другая</li>
      </ul>
      <div className="question-form__own-version">
        <div className="input input--box input--btn">
          <input type="text" className="input__field"/>
          <div className="btn btn--secondary">Отправить</div>
        </div>
      </div>
    </div>
  );
};

Poll.propTypes = {
  children: React.PropTypes.string.isRequired,
  onClick: React.PropTypes.func,
};

export default Poll;
