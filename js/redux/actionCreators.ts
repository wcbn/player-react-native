import * as ActionTypes from './ActionTypes'
import { BASE_URL } from '../config'
import { humanizeTime } from '../util/datetime'

export const fetchPlaylist = () => dispatch => {
  dispatch(playlistLoading())

  return fetch(BASE_URL + 'playlist.json')
    .then(
      response => {
        if (response.ok) {
          return response
        } else {
          const error = new Error(
            `Error ${response.status}: ${response.statusText}`
          )
          throw error
        }
      },
      error => {
        const errMess = new Error(error.message)
        throw errMess
      }
    )
    .then(response => response.json())
    .then(data => {
      data.on_air.songs.forEach(song => {
        song.at = humanizeTime(song.at)
      })
      dispatch(updatePlaylist(data.on_air))
    })
    .catch(error => dispatch(playlistFailed(error.message)))
}

export const playlistLoading = () => ({
  type: ActionTypes.PLAYLIST_LOADING
})

export const updatePlaylist = payload => ({
  type: ActionTypes.UPDATE_PLAYLIST,
  payload
})

export const playlistFailed = errMess => ({
  type: ActionTypes.PLAYLIST_FAILED,
  payload: errMess
})
