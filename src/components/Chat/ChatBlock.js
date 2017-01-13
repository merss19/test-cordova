import React, {Component} from 'react'

export default class Chat extends Component {
  render() {
    const {
      // Data
      userId,
      comments = [],
      sendButtonText,
      placeholderText,
      // Flags
      isFetching,
      isForwarding,
      isMessageValid,
      showMessages = true,
      showAdminPanel = true,
      // Callbacks
      onClose,
      onWaiting,
      onForwarding,
      onMessageChanged,
      onMessageSend,
    } = this.props

    return (
      <div>
        <h2 className="h1">Чаты</h2>
        <div className="chat" style={{height: '650px'}}>
          <ul className="chat__tabs">
            <li className="chat__tab chat__tab--disabled">
              <span className="chat__tab-title">Общий</span>
              <span className="chat__tab-msg"></span>
            </li>
            <li className="chat__tab chat__tab--active">
              <span className="chat__tab-title">С тренером</span>
              <span className="chat__tab-msg">({comments.length})</span>
            </li>
          </ul>

          {/*<div className="chat-info">*/}
          {/*<div className="chat-info__inner">*/}
          {/*<div className="chat-info__ava">*/}
          {/*<img src="/tmp/ava-small.png" alt=""/>*/}
          {/*<span className="chat-info__ava-status"></span>*/}
          {/*</div>*/}
          {/*<div className="chat-info__user">*/}
          {/*<p className="chat-info__user-name">Олег Алексеев <span>тренер 1 категории</span></p>*/}
          {/*<p className="chat-info__user-status">В сети</p>*/}
          {/*</div>*/}
          {/*</div>*/}
          {/*</div>*/}

          <div className="chat-content">
            <ul className="chat-messages">
              {
                comments.map(({text, user}, index) => (
                  <li key={index} className={`chat-msg chat-msg--${userId === user.id ? 'you' : 'someone'}`}>
                    <div className="chat-msg__ava">
                      <img src={user.photo} alt=""/>
                    </div>
                    <div className="chat-msg__content">
                      <p className="chat-msg__name">{`${user.firstName} ${user.lastName}`}</p>
                      <div className="chat-msg__text">{text}</div>
                    </div>
                  </li>
                ))
              }
            </ul>
          </div>

          <div className="chat-form">
            <div className="chat-form__inner">
            <textarea
              ref="message"
              onChange={(e) => onMessageChanged(e)}
              placeholder={placeholderText}
              className="textarea__field chat-form__field"></textarea>
              <div className="btn-chat"
                   onClick={() => {
                     onMessageSend(this.refs.message.value)

                     this.refs.message.value = ''
                   }}>
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
  }
}
