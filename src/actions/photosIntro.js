import cookie from 'react-cookie'
import { api } from '../config.js'
import moment from 'moment'

export const REQUEST_PHOTOS_INTRO = 'REQUEST_PHOTOS_INTRO'
export const RECEIVE_PHOTOS_INTRO = 'RECEIVE_PHOTOS_INTRO'
export const SELECT_PHOTOS_INTRO = 'SELECT_PHOTOS_INTRO'
export const INVALIDATE_PHOTOS_INTRO = 'INVALIDATE_PHOTOS_INTRO'

export const selectPhotosIntro = photosIntro => ({
  type: SELECT_PHOTOS_INTRO,
  photosIntro
})

export const invalidatePhotosIntro = photosIntro => ({
  type: INVALIDATE_PHOTOS_INTRO,
  photosIntro
})

export const requestPhotosIntro = photosIntro => ({
  type: REQUEST_PHOTOS_INTRO,
  photosIntro
})

export const receivePhotosIntro = (photosIntro, json) => {
  console.log(json)
  return ({
    type: RECEIVE_PHOTOS_INTRO,
    photosIntro,
    json
  })
}

const fetchPhotosIntro = partialState => dispatch => {
  const { token, photosIntro, profile, selectedDayDate, selectedDayId } = partialState
  dispatch(requestPhotosIntro(photosIntro))
  let payload = {
    authToken: token ? token : cookie.load('token'),
    data: { paramName: "UserPhotoCaption" }
  }

  let data = new FormData()
  data.append("json", JSON.stringify(payload))
  return fetch(`${api}/data/siteParam-get`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(payload)
  })
  .then(response => response.json())
  .then(json => dispatch(receivePhotosIntro(photosIntro, json)))
}

const shouldFetchPhotosIntro = (state, photosIntro) => {
  const ph = state.photosIntro

  if (!ph)
    return true

  if (ph.isFetching)
    return false

  return ph.didInvalidate
}

export const fetchPhotosIntroIfNeeded = photosIntro => (dispatch, getState) => {
  if (shouldFetchPhotosIntro(getState(), photosIntro)) {
    return dispatch(fetchPhotosIntro({
      token: getState().userToken.token,
      photosIntro
    }))
  }
}
