import React, {Component} from 'react'
import {connect} from 'react-redux'

import {
  fetchChat,
  closeChat,
  addToChat,
  answerToChat,
  waitingFromChat
} from '../actions'

export class Chat extends Component {
  constructor(props) {
    super(props)

    this.state = {
      comments: [],
      isForwarding: false,
    }
  }

  checkMessageLength(e) {
    this.setState({
      isMessageValid: e.target && e.target.value.length
    })
  }

  closeChat() {
    const {closeChat} = this.props

    closeChat()
  }

  waiting () {
    const {
      id,
      waitingFromChat
    } = this.props

    waitingFromChat(id)
  }

  sendMessage() {
    const {
      id,
      type,
      typeId,
      userId,
      addToChat,
      answerToChat,
    } = this.props
    const {
      comments,
      isForwarding
    } = this.state

    const {
      message
    } = this.refs

    if (isForwarding) {
      addToChat(type, typeId, message.value)
        .then(() => fetchChat(type, typeId))

      this.setState({isForwarding: false})
    } else {
      answerToChat(id, message.value)
        .then(() => fetchChat(type, typeId))

      this.setState({
        comments: comments.concat({
          text: message.value,
          user: {id: userId}
        })
      })
    }

    message.value = ''
  }

  toggleForwarding() {
    this.setState({
      isForwarding: !this.state.isForwarding
    })
  }

  componentWillMount() {
    const {type, typeId, isOpen, fetchChat} = this.props

    if (isOpen && type && typeId) {
      fetchChat(type, typeId)
    }
  }

  componentWillReceiveProps({type, isFetching, typeId, isOpen, comments = [], fetchChat}) {
    this.setState({comments})
  }

  render() {
    const {
      comments,
      isForwarding,
      isMessageValid,
    } = this.state
    const {
      isOpen,
      userId,
      isFetching
    } = this.props

    return (
      isOpen ?
        <div className={`minion-chat minion-chat_${isFetching ? 'fetching' : (isForwarding ? 'forwarding' : '')}`}>
          <svg
            onClick={() => this.closeChat()}
            className="minion-chat__close svg-icon ico-close">
            <use xlinkHref="#ico-close"></use>
          </svg>

          <div className="minion-chat__spinner spinner"></div>

          <div className="minion-chat__buttons">
            <button
              onClick={() => this.waiting()}
              className="minion-chat__button-waiting btn btn--secondary">
              Жду ответа
            </button>
            <button
              onClick={() => this.toggleForwarding()}
              className="minion-chat__button-forward btn btn--action">
              {isForwarding ? 'Отмена' : 'Переадресовать'}
            </button>
          </div>

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

          <div className="minion-chat__answer-box">
          <textarea
            ref="message"
            onKeyUp={(e) => this.checkMessageLength(e)}
            placeholder={isForwarding ? 'Сообщение суперадмину' : 'Сообщение пользователю'}
            className="minion-chat__answer-area"/>
            <button
              disabled={!isMessageValid}
              onClick={() => this.sendMessage()}
              className={`minion-chat__answer-button btn btn--${isMessageValid ? 'primary' : 'disabled'}`}>
              {isForwarding ? 'Переадресовать' : 'Ответить'}
            </button>
          </div>
        </div> : null
    )
  }
}

const mapStateToProps = state => state.chat

const mapDispatchToProps = {
  fetchChat,
  closeChat,
  addToChat,
  answerToChat,
  waitingFromChat
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chat);