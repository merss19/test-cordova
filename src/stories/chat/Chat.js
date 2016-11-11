import React from 'react';

const chatStyles = {};

const Chat = ({ children, messages }) => (
  <div className="chat">
    <ul className="chat__tabs">
      <li className="chat__tab">
        <span className="chat__tab-title">Общий</span>
        <span className="chat__tab-msg">(2)</span>
      </li>
      <li className="chat__tab chat__tab--active">
        <span className="chat__tab-title">С тренером</span>
        <span className="chat__tab-msg"></span>
      </li>
    </ul>

    <div className="chat-info">
      <div className="chat-info__inner">
        <div className="chat-info__ava">
          <img src="tmp/ava-small.png" alt=""/>
          <span className="chat-info__ava-status"></span>
        </div>
        <div className="chat-info__user">
          <p className="chat-info__user-name">Олег Алексеев <span>тренер 1 категории</span></p>
          <p className="chat-info__user-status">В сети</p>
        </div>
      </div>
    </div>

    <ul className="chat-content">

      <li className="chat-msg chat-msg--someone">
        <div className="chat-msg__ava">
          <img src="assets/img/png/user-placeholder.png" alt=""/>
        </div>
        <div className="chat-msg__content">
          <p className="chat-msg__name">Олег Алексеев</p>
          <div className="chat-msg__text">Скажите, Вы читали правила по выполнению данного упражнения?</div>
        </div>
      </li>

      <li className="chat-msg chat-msg--you">
        <div className="chat-msg__content">
          <div className="chat-msg__text">Да, я прочла все, но не поняла как правильно расположить локти?</div>
        </div>
        <div className="chat-msg__ava">
          <img src="tmp/ava-you.png" alt=""/>
        </div>
      </li>

      <li className="chat-content__date"><span>1 Октября, 2016</span></li>

      <li className="chat-msg chat-msg--you">
        <div className="chat-msg__content">
          <div className="chat-msg__text">Добрый день, Олег! Я не уверена, что выполняла сегодня правильно 2 задание</div>
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
          <div className="chat-msg__text">Добрый день, Анна! Давайте попробуем разобраться. Скажите, Вы читали правила по выполнению данного упражнения?</div>
        </div>
      </li>

    </ul>

    <div className="chat-form">
      <div className="chat-form__inner">
        <textarea className="textarea__field chat-form__field"></textarea>
        <div className="btn-chat">
          <div className="btn-chat__title">Отправить</div>
          <div className="btn-chat__ico">
            <svg className="svg-icon ico-arrow-up">
              <use xlinkHref="#ico-arrow-up"/>
            </svg>
          </div>
        </div>
      </div>
    </div>

  </div>
);

Chat.propTypes = {
  children: React.PropTypes.string.isRequired,
  onClick: React.PropTypes.func,
};

export default Chat;
