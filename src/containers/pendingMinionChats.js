import React, {Component} from 'react'
import cookie from 'react-cookie'
import { Field, reduxForm } from 'redux-form'
import {connect} from 'react-redux'
import {
  fetchChat,
  fetchChats,
  answerToChat,
  PUBLIC_CHAT_ID,
  PRIVATE_CHAT_ID
} from '../actions'

import ReactPaginate from 'react-paginate'
import Chat from '../containers/Chat'

import ChatGroup from '../components/userReports/ChatGroup'
import UserReportsMenu from '../components/userReports/UserReportsMenu'

const DEFAULT_PAGE = 1
const DEFAULT_PAGE_COUNT = 10
let currentChatType = 2

class MinionChats extends Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedChat: false
    }
  }

  componentWillMount() {
    const {fetchChats} = this.props

    this.state = {
      list: [],
      page: DEFAULT_PAGE,
      pageCount: DEFAULT_PAGE_COUNT
    }

    fetchChats(currentChatType, DEFAULT_PAGE)
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.isChatsFetching && this.props.isChatsFetching) {
      this.setState({
        list: [...nextProps.list],
        pageCount: nextProps.pageCount
      })
    }
  }

  selectChat(type, typeId) {
    const {fetchChat} = this.props

    fetchChat(type, typeId)
  }

  render() {
    const {
      selectedChat,
      list = true
    } = this.state

    const {
      chat,
      userId,
      isChatsFetching = true,
      fetchChats
    } = this.props

    const handlePageClick = data => {
      const nextPage = data.selected + 1

      fetchChats(currentChatType, nextPage)

      this.setState({page: nextPage})
    }

    const chatTypes = [
      { text: 'Публичные', val: 1 },
      { text: 'Приватные', val: 2 }
    ]

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
                  !isChatsFetching || list.length ? (
                      <div className="chats-groups">
                        <ul className="options options--white mtb30" style={{ display: 'inline-block'}}>
                          {chatTypes.map((val, index) => (
                            <label key={index} style={{ display: 'inline-block'}}>
                              <li name="chatTypes" className={ currentChatType === val.val ? "options__item is-active" : "options__item"} id={`chatTypes[${index}]`} onClick={e => {
                                document.getElementById(`chatTypes[${index}]`).className += ' is-active'
                                chatTypes.forEach((v, i) => {
                                  if (index !== i)
                                    document.getElementById(`chatTypes[${i}]`).className = "options__item"
                                })
                              }}>
                                <Field
                                  component='input'
                                  type='radio'
                                  name='chatTypes'
                                  style={{visibility: 'hidden', margin: -5}}
                                  value={val.val}
                                  onClick={() => {
                                    currentChatType = val.val

                                    this.state = {
                                      list: [],
                                      page: DEFAULT_PAGE
                                    }

                                    fetchChats(currentChatType, DEFAULT_PAGE)
                                  }}/>
                                {val.text}
                              </li>
                              <span/>
                            </label>
                          ))}
                        </ul>

                        <ChatGroup
                          title={`${chatTypes[currentChatType-1].text} чаты`}
                          list={list}
                          unread={list.reduce((sum, {isAnswered, hasMessages}) => {
                            return isAnswered || !hasMessages ? sum : sum + 1
                          }, 0)}
                          selectedChat={chat.id}
                          onChatSelect={(type, id) => this.selectChat(type, id)}
                        />

                        <ReactPaginate previousLabel={"<"}
                          nextLabel={">"}
                          breakLabel={<a href="">...</a>}
                          breakClassName={"break-me"}
                          pageCount={this.state.pageCount}
                          marginPagesDisplayed={2}
                          pageRangeDisplayed={5}
                          onPageChange={handlePageClick}
                          containerClassName={"pagination"}
                          subContainerClassName={"pages pagination"}
                          activeClassName={"active"}
                        />

                        {/* <ChatGroup
                          title="Публичные чаты"
                          list={publicChats}
                          unread={publicChats.reduce((sum, {isAnswered, hasMessages}) => {
                            return isAnswered || !hasMessages ? sum : sum + 1
                          }, 0)}
                          selectedChat={chat.id}
                          onChatSelect={(type, typeId) => this.selectChat(type, typeId)}
                        /> */}
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

MinionChats = reduxForm({
  form: 'chatsForm'
})(MinionChats)

const mapStateToProps = state => {
  const {chat, chats: { chats, pageCount, isFetching }} = state
  const isChatFetching = chat.isFetching === true
  const isChatsFetching = isFetching//chats.isFetching === true
  // const publicChats = isChatsFetching ? [] : chats.filter(({type}) => type === PUBLIC_CHAT_ID)
  // const privateChats = isChatsFetching ? [] : chats.filter(({type}) => type === PRIVATE_CHAT_ID)

  return {
    list: chats,
    pageCount,
    chat,
    userId: Number(cookie.load('user_id')),
    // publicChats,
    // privateChats,
    isChatFetching,
    isChatsFetching,
  }
}

const mapDispatchToProps = {
  fetchChat,
  fetchChats,//: fetchChats(PUBLIC_CHAT_ID, PRIVATE_CHAT_ID),
  answerToChat
}

MinionChats = connect(
  mapStateToProps,
  mapDispatchToProps
)(MinionChats);

export default MinionChats
