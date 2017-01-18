import React, {Component} from 'react'
import EmojiPicker from 'emojione-picker'

const findSurrogatePair = (point) => {
  const offset = point - 0x10000
  const lead = 0xd800 + (offset >> 10)
  const trail = 0xdc00 + (offset & 0x3ff)

  return [lead.toString(16), trail.toString(16)]
}

export default class ChatBlock extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showEmojiPopup: false
    }
  }

  toggleEmojiPopup() {
    this.setState({showEmojiPopup: !this.state.showEmojiPopup})
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

  appendEmoji(unicode) {
    this.refs.message.value += this.getEmoji(unicode)
  }

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
    const {
      showEmojiPopup
    } = this.state

    return (

      <div className="chat__inner-block">
        <div className="chat__spinner">
          <div className="spinner"></div>
        </div>

        <div className="chat-content">
          <ul className="chat-messages">
            {
              comments.map(({text, user, isSystem}, index) => (
                <li key={index} className={`chat-msg
                                            ${isSystem ? 'chat-msg--system' : ''}
                                            chat-msg--${userId === user.id ? 'you' : 'someone'}
                                          `}>
                  {/*<div className="chat-msg__ava">*/}
                  {/*<img src={user.photo} alt=""/>*/}
                  {/*</div>*/}
                  <div className="chat-msg__content">
                    <p className="chat-msg__name">
                      {isSystem ? 'Системное сообщение' : `${user.firstName || ''} ${user.lastName || ''}`}
                    </p>
                    <div className="chat-msg__text">{text}</div>
                  </div>
                </li>
              ))
            }
          </ul>
        </div>

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
    )
  }
}
