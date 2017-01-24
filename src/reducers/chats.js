import {
  REQUEST_CHAT, RECEIVE_CHAT, CLOSE_CHAT,
  REQUEST_CHATS, RECEIVE_CHATS,
} from '../actions'

export const showGlobalMessage = (state = false, action) => {
  switch (action.type) {
    case 'SHOW_GLOBAL_MESSAGE':
      return action.showGlobalMessage
    default:
      return state
  }
}

export const chat = (state = {isOpen: false}, action) => {
  switch (action.type) {
    case REQUEST_CHAT:
      return {
        isOpen: true,
        isFetching: true
      }
    case RECEIVE_CHAT:
      return {
        isOpen: true,
        isFetching: false,
        ...action.payload
      }
    case CLOSE_CHAT:
      return {
        isOpen: false
      }
    default:
      return state
  }
}

export const chats = (state = [], action) => {
  switch (action.type) {
    case REQUEST_CHATS:
      return {
        isFetching: true
      }
    case RECEIVE_CHATS:
      console.log('TRINITY')
      console.log(action)
      return {
        chats: [ ...action.payload ],
        pageCount: action.pageCount,
        isFetching: false
      }
    default:
      return state
  }
}
