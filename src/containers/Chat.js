import React, {Component} from 'react'
import {connect} from 'react-redux'

import ChatBlock from '../components/Chat/ChatBlock'
import ChatWindow from '../components/Chat/ChatWindow'

import {
  fetchChat,
  closeChat,
  addToChat,
  answerToChat,
  waitingFromChat,
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

  waiting() {
    const {
      id,
      onWaiting,
      waitingFromChat
    } = this.props

    const promise = waitingFromChat(id)

    if (onWaiting) {
      onWaiting(id, promise)
    }
  }

  sendMessage(text) {
    const {
      id,
      type,
      typeId,
      userId,
      addToChat,
      fetchChat,
      answerToChat,
    } = this.props
    const {
      comments,
      isForwarding
    } = this.state

    if (isForwarding) {
      addToChat(type, typeId, text)
        .then(() => fetchChat(type, typeId))

      this.setState({isForwarding: false})
    } else {
      answerToChat(id, text)
        .then(() => fetchChat(type, typeId))

      this.setState({
        comments: comments.concat({
          text,
          user: {id: userId}
        })
      })
    }
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
      id,
      isOpen,
      isTaskChat,
      userId,
      isWindow = true,
      isFetching,
      showAdminPanel = true
    } = this.props



    const chat = <ChatBlock
      // Data
      userId={userId}
      comments={comments}
      sendButtonText={isForwarding ? 'Переадресовать' : 'Ответить'}
      placeholderText={isForwarding ? 'Сообщение суперадмину' : 'Сообщение пользователю'}
      // Flags
      isFetching={isFetching || id === undefined}
      isForwarding={isForwarding}
      isMessageValid={isMessageValid}
      // Callbacks
      onMessageChanged={(e) => this.checkMessageLength(e)}
      onMessageSend={(message) => this.sendMessage(message)}
    />

    return isOpen ? (
        <div>
          {isTaskChat && <h2 className="h1">Чат</h2>}
          <div className={`chat
                            ${isWindow ? 'chat_window' : ''}
                            ${isFetching ? 'chat_fetching' : ''}
                            ${isForwarding ? 'chat_forwarding' : ''}
                          `}>
            <svg
              onClick={() => this.closeChat()}
              className="minion-chat__close svg-icon ico-close">
              <use xlinkHref="#ico-close"></use>
            </svg>

            {
              !isFetching && showAdminPanel ? (
                  <div className="chat__admin-panel">
                    {
                      !isForwarding ? (
                          <button
                            onClick={() => this.waiting()}
                            className="chat__admin-panel-button btn btn--secondary">
                            Жду ответа
                          </button>
                        ) : null
                    }
                    <button
                      onClick={() => this.toggleForwarding()}
                      className="chat__admin-panel-button btn btn--action">
                      {isForwarding ? 'Отмена' : 'Переадресовать'}
                    </button>
                  </div>
                ) : null
            }

            {chat}
          </div>
        </div>
      ) : null
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
