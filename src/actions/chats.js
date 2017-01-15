import cookie from 'react-cookie'
import {api} from '../config.js'
import moment from 'moment'

moment.locale('ru')

export const PUBLIC_CHAT_ID = 1;
export const PRIVATE_CHAT_ID = 2;
export const PROFILE_CHAT_ID = 3;
export const INSURANCE_CHAT_ID = 4;
export const PROFILE_PHOTO_CHAT_ID = 5;
export const EXAM_CHAT_ID = 6;

export const CLOSE_CHAT = 'CLOSE_CHAT'
export const REQUEST_CHAT = 'REQUEST_CHAT'
export const RECEIVE_CHAT = 'RECEIVE_CHAT'
export const REQUEST_CHATS = 'REQUEST_CHATS'
export const RECEIVE_CHATS = 'RECEIVE_CHATS'

// CHAT LIST ACTIONS

const commentGetInfo = (authToken, data) => {
  return fetch(`${api}/user/comment-get-info`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({
      data,
      authToken,
    })
  })
    .then(response => response.json())
    .then(json => json.data)
    .catch(console.error)
}

export const requestChats = () => ({
  type: REQUEST_CHATS
})

export const receiveChats = payload => ({
  type: RECEIVE_CHATS,
  payload
})

const getChatTitle = ({name, isPublic, userStarter}) => {
  let title

  if (isPublic) {
    title = name
  } else {
    const {firstName, lastName, programName} = userStarter

    title = `${firstName} ${lastName}`

    if (programName) {
      title += ` / ${programName}`
    }

    if (name) {
      title += ` / ${name}`
    }
  }

  return title
}

export const fetchChats = (...types) => () => (dispatch, getState) => {
  dispatch(requestChats())

  const {userToken} = getState()
  const token = userToken.token || cookie.load('token')

  return Promise
    .all(types.map(type => commentGetInfo(token, {type})))
    .then((chatsArray) => {
      const flatChats = Array.prototype.concat.apply([], chatsArray)
        .map(({userStarter, ...chat}) => ({...chat, userStarter: userStarter || {}})) // Баг с null в userStarter
        .map(chat => {
          const title = getChatTitle(chat)
          const unread = chat.comments.length // TODO: Убрать когда придумаем способ чекать прочитанные
          const lastComment = chat.comments[unread - 1]
          const lastCommentDate = moment(lastComment.date)

          return {
            ...chat,
            title,
            unread,
            updateTs: lastCommentDate.valueOf(),
            timePassed: lastComment ? lastCommentDate.fromNow(true) : '-'
          }
        })
        .sort((a, b) => a.updateTs > b.updateTs)

      dispatch(receiveChats(flatChats))
    })
}

export const fetchPublicChats = fetchChats(PUBLIC_CHAT_ID)
export const fetchPrivateChats = fetchChats(PRIVATE_CHAT_ID)
export const fetchProfileChats = fetchChats(PROFILE_CHAT_ID)
export const fetchInsuranceChats = fetchChats(INSURANCE_CHAT_ID)
export const fetchProfilePhotoChats = fetchChats(PROFILE_PHOTO_CHAT_ID)

// CHAT MESSAGES ACTIONS

export const requestChat = () => ({
  type: REQUEST_CHAT
})

export const receiveChat = payload => ({
  type: RECEIVE_CHAT,
  payload
})

export const closeChat = () => (dispatch, getState) => {
  dispatch({
    type: CLOSE_CHAT
  })
}

export const fetchChat = (type, typeId = null) => (dispatch, getState) => {
  dispatch(requestChat())

  const {token} = getState().userToken
  const data = typeId ? {type, typeId} : {type}

  return commentGetInfo(token || cookie.load('token'), data)
    .then((chats) => dispatch(chats[0] ? receiveChat(chats[0]) : closeChat()))
}

// CHAT METHODS

const chatMessageCreate = (authToken, data) => {
  return fetch(`${api}/user/chatmessage-create`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({
      data,
      authToken,
    })
  })
    .then(response => response.json())
    .catch(console.error)
}

export const createWithMessage = (type, typeId = null, text) => (dispatch, getState) => {
  const {token} = getState().userToken
  const authToken = token || cookie.load('token')
  const data = typeId ? {type, typeId, text} : {type, text}

  return chatMessageCreate(authToken, data)
}

export const answerToChat = (group, text) => (dispatch, getState) => {
  const {token} = getState().userToken
  const authToken = token || cookie.load('token')

  return chatMessageCreate(authToken, {group, text})
}

export const addToChat = (type, typeId = null, text) => (dispatch, getState) => {
  const {token} = getState().userToken
  const authToken = token || cookie.load('token')

  const data = typeId ? {type, typeId, text} : {type, text}

  return fetch(`${api}/user/chat-adduser`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({
      data,
      authToken,
    })
  })
    .then(response => response.json())
    .catch(console.error)
}

export const waitingFromChat = (group) => (dispatch, getState) => {
  const {token} = getState().userToken
  const authToken = token || cookie.load('token')

  return chatMessageCreate(authToken, {group, status: 1})
}
