import React, {Component} from 'react'
import cookie from 'react-cookie'
import { Field, reduxForm } from 'redux-form'
import {connect} from 'react-redux'
import { api } from '../config.js'
import Modal from 'boron/FadeModal'
import EmojiPicker from 'emojione-picker'
import Textarea from 'react-textarea-autosize'
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

let contentStyle = {
  borderRadius: '18px',
  padding: '30px'
}

class MinionChats extends Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedChat: false,
      showEmojiPopup: false
    }
  }

  toggleEmojiPopup() {
    this.setState({showEmojiPopup: !this.state.showEmojiPopup})
  }

  appendEmoji(unicode) {
    this.refs.message.value += this.getEmoji(unicode)
  }

  getEmoji(unicode) {
    const point = Number('0x' + unicode)
    const offset = point - 0x10000
    const lead = 0xd800 + (offset >> 10)
    const trail = 0xdc00 + (offset & 0x3ff)
    const arr = [lead.toString(16), trail.toString(16)]

    return arr
      .map((el) => parseInt(el, 16))
      .map((el) => String.fromCharCode(el))
      .join('')
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
      list = true,
      showEmojiPopup
    } = this.state

    const {
      chat,
      userId,
      isChatsFetching = true,
      fetchChats,
      showGlobalMessage,
      dispatch
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

                        <div className='btn btn--action' onClick={() => {
                          dispatch({ type: 'SHOW_GLOBAL_MESSAGE', showGlobalMessage: !showGlobalMessage })
                        }}>
                          Отправить сообщение всем пользователям
                        </div>

                        {showGlobalMessage &&
                          <div className="chat-form">
                            <div className="chat-form__inner">
                              {
                                showEmojiPopup ? (
                                    <div className="chat__emoji">
                                      <EmojiPicker onChange={({unicode}) => this.appendEmoji(unicode)}/>
                                    </div>
                                  ) : null
                              }

                              <button
                                onClick={() => this.toggleEmojiPopup()}
                                className="chat__emoji-button">
                                😀
                              </button>

                              <Textarea
                                ref="message"
                                // onChange={(e) => onMessageChanged(e)}
                                placeholder="Сообщение всем пользователям"
                                className="textarea__field chat-form__field"></Textarea>
                              <div className="btn-chat"
                                   onClick={() => {
                                     this.refs.loadingModal.show()
                                     return fetch(`${api}/user/chatmessage-privateSendToEveryone`, {
                                       headers: {
                                         'Accept': 'application/json',
                                         'Content-Type': 'application/json'
                                       },
                                       method: 'POST',
                                       body: JSON.stringify({
                                         data: { text: this.refs.message.value },
                                         authToken: cookie.load('token'),
                                       })
                                     })
                                    .then(response => response.json())
                                    .then(json => {
                                      this.refs.message.value = ''
                                      this.refs.loadingModal.hide()
                                      if (json && json.errorCode === 1) {
                                        this.refs.successModal.show()
                                      } else {
                                        this.refs.errorModal.show()
                                      }
                                    })
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
                        }

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

                        <Modal ref='loadingModal' contentStyle={contentStyle} backdrop={false}>
                          <h2>Подождите может потребоваться несколько минут...</h2>
                        </Modal>
                        <Modal ref='successModal' contentStyle={contentStyle}>
                          <h2>Сообщение отправлено всем-всем-всем!</h2>
                          <br/>
                          <button className="btn btn--action" onClick={() => this.refs.successModal.hide()}>
                            Продолжить
                          </button>
                        </Modal>
                        <Modal ref='errorModal' contentStyle={contentStyle}>
                          <h2>Что-то пошло не так</h2>
                          <br/>
                          <button className="btn btn--action" onClick={() => this.refs.errorModal.hide()}>
                            Продолжить
                          </button>
                        </Modal>
                      </div>
                    ) : <div className="spinner"></div>
                }
              </div>
            </div>
          </div>

        </div>

        <Chat userId={userId} isAnswered={chat.isAnswered} />
      </div>
    )
  }
}

MinionChats = reduxForm({
  form: 'chatsForm'
})(MinionChats)

const mapStateToProps = state => {
  const {chat, showGlobalMessage, chats: { chats, pageCount, isFetching }} = state
  const isChatFetching = chat.isFetching === true
  const isChatsFetching = isFetching

  return {
    showGlobalMessage,
    list: chats,
    pageCount,
    chat,
    userId: Number(cookie.load('user_id')),
    isChatFetching,
    isChatsFetching,
  }
}

const mapDispatchToProps = {
  fetchChat,
  fetchChats,
  answerToChat
}

MinionChats = connect(
  mapStateToProps,
  mapDispatchToProps
)(MinionChats);

export default MinionChats
