import cookie from 'react-cookie'
import {api} from '../config.js'
import moment from 'moment'

moment.locale('ru')

export const REQUEST_PENDING_PHOTO = 'REQUEST_PENDING_PHOTO'
export const RECEIVE_PENDING_PHOTO = 'RECEIVE_PENDING_PHOTO'
export const REQUEST_PENDING_PHOTOS = 'REQUEST_PENDING_PHOTOS'
export const RECEIVE_PENDING_PHOTOS = 'RECEIVE_PENDING_PHOTOS'

export const requestPendingPhotos = () => ({
  type: REQUEST_PENDING_PHOTOS
})

export const receivePendingPhotos = payload => ({
  type: RECEIVE_PENDING_PHOTOS,
  payload
})

const getUserPhoto = (authToken, data = {}) => {
  return fetch(`${api}/user/userPhoto-get`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({
      authToken,
      data
    })
  })
    .then(response => response.json())
    .then(json => json.data)
}

export const fetchPendingPhotos = () => (dispatch, getState) => {
  dispatch(requestPendingPhotos())

  const {token} = getState().userToken
  const authToken = token ? token : cookie.load('token')

  return getUserPhoto(authToken)
    .then(data => {
      const list = (data || [])
        .map(item => {
          const link = `/userReports/photos/${item.user}/${item.program}`
          const fullName = `${item.userInfo.firstName} ${item.userInfo.lastName}`

          return {
            ...item,
            link,
            fullName
          }
        })

      dispatch(receivePendingPhotos(list))
    })
    .catch(console.error)

}

export const requestPendingPhoto = () => ({
  type: REQUEST_PENDING_PHOTO
})

export const receivePendingPhoto = payload => ({
  type: RECEIVE_PENDING_PHOTO,
  payload
})

export const fetchPendingPhoto = (user, program) => (dispatch, getState) => {
  dispatch(requestPendingPhoto())

  const {token} = getState().userToken
  const authToken = token ? token : cookie.load('token')

  return getUserPhoto(authToken, {user, program})
    .then(data => dispatch(receivePendingPhoto(data[0])))
    .catch(console.error)
}

const switchPhotoVerification = isChecked => (user, program) => (dispatch, getState) => {
  const {token} = getState().userToken

  return fetch(`${api}/user/userPhoto-update`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({
      authToken: token ? token : cookie.load('token'),
      data: {user, program, isChecked}
    })
  })
    .then(response => response.json())
    .catch(console.error)
}

export const rejectPhoto = switchPhotoVerification(false)
export const approvePhoto = switchPhotoVerification(true)
