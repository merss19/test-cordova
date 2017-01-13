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
      waitingFromChat
    } = this.props

    waitingFromChat(id)
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
      userId,
      isWindow = true,
      isFetching
    } = this.props

    return (
      isOpen ? (
        isWindow ? <ChatWindow
          // Data
          userId={userId}
          comments={comments}
          sendButtonText={isForwarding ? 'Переадресовать' : 'Ответить'}
          placeholderText={isForwarding ? 'Сообщение суперадмину' : 'Сообщение пользователю'}
          // Flags
          isFetching={isFetching || id === undefined}
          isForwarding={isForwarding}
          isMessageValid={isMessageValid}
          showAdminPanel={true}
          // Callbacks
          onClose={() => this.closeChat()}
          onWaiting={() => this.waiting()}
          onForwarding={() => this.toggleForwarding()}
          onMessageChanged={(e) => this.checkMessageLength(e)}
          onMessageSend={(message) => this.sendMessage(message)}
        /> : <ChatBlock
            // Data
            userId={userId}
            comments={comments}
            sendButtonText={'Отправить'}
            placeholderText={'Текст сообщения'}
            // Flags
            isFetching={isFetching || id === undefined}
            isMessageValid={isMessageValid}
            // Callbacks
            onMessageChanged={(e) => this.checkMessageLength(e)}
            onMessageSend={(message) => this.sendMessage(message)}
          />
        ) : null
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