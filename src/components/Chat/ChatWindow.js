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
      <div className={`minion-chat minion-chat_${isFetching ? 'fetching' : (isForwarding ? 'forwarding' : '')}`}>
        <svg
          onClick={() => onClose()}
          className="minion-chat__close svg-icon ico-close">
          <use xlinkHref="#ico-close"></use>
        </svg>

        <div className="minion-chat__spinner spinner"></div>

        {
          showAdminPanel ? (
              <div className="minion-chat__buttons">
                <button
                  onClick={() => onWaiting()}
                  className="minion-chat__button-waiting btn btn--secondary">
                  Жду ответа
                </button>
                <button
                  onClick={() => onForwarding()}
                  className="minion-chat__button-forward btn btn--action">
                  {isForwarding ? 'Отмена' : 'Переадресовать'}
                </button>
              </div>
            ) : null
        }

        {
          showMessages ? (
              <div className={`minion-chat__messages ${!comments.length ? 'minion-chat__messages_empty' : ''}`}>
                <div className="minion-chat__messages-box">
                  {
                    comments.length ? comments.map(({text, user}, index) => (
                        <div
                          key={index}
                          className={`minion-chat__message minion-chat__message_${user.id != userId ? 'left' : 'right'}`}>
                          {text}
                        </div>
                      )) : 'Нет сообщений'
                  }
                </div>
              </div>
            ) : null
        }

        <div className="minion-chat__answer-box">
          <textarea
            ref="message"
            onChange={(e) => onMessageChanged(e)}
            placeholder={placeholderText}
            className="minion-chat__answer-area"/>

          <button
            disabled={!isMessageValid}
            onClick={() => onMessageSend(this.refs.message.value)}
            className={`minion-chat__answer-button btn btn--${isMessageValid ? 'primary' : 'disabled'}`}>
            {sendButtonText}
          </button>
        </div>
      </div>
    )
  }
}
