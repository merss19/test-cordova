import React, {Component} from 'react'
import cookie from 'react-cookie'
import {connect} from 'react-redux'
import {
  fetchChat,
  fetchChats,
  answerToChat,
  PUBLIC_CHAT_ID,
  PRIVATE_CHAT_ID
} from '../actions'

import Chat from '../containers/Chat'

import ChatGroup from '../components/userReports/ChatGroup'
import UserReportsMenu from '../components/userReports/UserReportsMenu'

class MinionChats extends Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedChat: false
    }
  }

  componentWillMount() {
    const {fetchChats} = this.props

    fetchChats()
  }

  selectChat(type, typeId) {
    const {fetchChat} = this.props

    fetchChat(type, typeId)
  }

  render() {
    const {
      selectedChat
    } = this.state
    const {
      chat,
      userId,
      publicChats,
      privateChats,
      isChatsFetching
    } = this.props

    return (
      <div className="layout layout--login">

        <div className="header">
          <div className="grid header__inner">
            <h1 className="grid__cell header__logo">
              Ясегодня
              <img src="/assets/img/ys_logo.svg" alt="Ясегодня"/>
            </h1>
          </div>
        </div>

        <div className="user-reports">

          <div className="entry entry--sign-up">
            <div className="entry__inner">
              <div className="entry-info entry-info_top-menu">
                <div className="entry-info__inner">
                  <UserReportsMenu />
                </div>
              </div>

              <div className="entry__box">
                {
                  !isChatsFetching ? (
                      <div className="chats-groups">
                        <ChatGroup
                          title="Приватные чаты"
                          list={privateChats}
                          unread={privateChats.reduce((sum, {unread}) => sum + unread, 0)}
                          selectedChat={chat.id}
                          onChatSelect={(type, id) => this.selectChat(type, id)}
                        />

                        <ChatGroup
                          title="Публичные чаты"
                          list={publicChats}
                          unread={publicChats.reduce((sum, {unread}) => sum + unread, 0)}
                          selectedChat={chat.id}
                          onChatSelect={(type, typeId) => this.selectChat(type, typeId)}
                        />
                      </div>
                    ) : <div className="spinner"></div>
                }
              </div>
            </div>
          </div>

        </div>

        <Chat userId={userId} />
      </div>
    )
  }
}

const mapStateToProps = state => {
  const {chat, chats} = state
  const isChatFetching = chat.isFetching === true
  const isChatsFetching = chats.isFetching === true
  const publicChats = isChatsFetching ? [] : chats.filter(({type}) => type === PUBLIC_CHAT_ID)
  const privateChats = isChatsFetching ? [] : chats.filter(({type}) => type === PRIVATE_CHAT_ID)

  return {
    chat,
    userId: cookie.load('user_id'),
    publicChats,
    privateChats,
    isChatFetching,
    isChatsFetching,
  }
}

const mapDispatchToProps = {
  fetchChat,
  fetchChats: fetchChats(PUBLIC_CHAT_ID, PRIVATE_CHAT_ID),
  answerToChat
}

MinionChats = connect(
  mapStateToProps,
  mapDispatchToProps
)(MinionChats);

export default MinionChats
