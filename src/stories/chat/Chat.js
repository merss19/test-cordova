import React from 'react'

const Chat = ({ chat, userId }) => (
  <div>
    <h2 className="h1">Чаты</h2>
    <div className="chat" style={{overflow: 'auto', height: '400px'}}>
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
            <img src="/tmp/ava-small.png" alt=""/>
            <span className="chat-info__ava-status"></span>
          </div>
          <div className="chat-info__user">
            <p className="chat-info__user-name">Олег Алексеев <span>тренер 1 категории</span></p>
            <p className="chat-info__user-status">В сети</p>
          </div>
        </div>
      </div>

      <ul className="chat-content">
        {chat.map((message, index) => (
          <li key={index} className={`chat-msg chat-msg--${userId === message.user.id ? 'you' : 'someone'}`}>
            <div className="chat-msg__ava">
              <img src={message.user.photo} alt=""/>
            </div>
            <div className="chat-msg__content">
              <p className="chat-msg__name">{`${message.user.firstName} ${message.user.lastName}`}</p>
              <div className="chat-msg__text">{message.text}</div>
            </div>
          </li>
        ))}

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
  </div>
)

Chat.propTypes = {
  children: React.PropTypes.string.isRequired,
  onClick: React.PropTypes.func,
}

export default Chat
