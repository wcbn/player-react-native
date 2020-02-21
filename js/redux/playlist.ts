import * as ActionTypes from './ActionTypes'

export const playlist = (
  state = {
    errMess: null,
    isLoading: true,
    on_air: {
      name: '',
      dj: '',
      dj_url: '',
      beginning: '',
      ending: '',
      times: '',
      show_notes: null,
      songs: [{ name: '', artist: '', album: '', label: '', year: '' }],
      semester_id: -1
    }
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.UPDATE_PLAYLIST:
      return {
        errMess: null,
        isLoading: false,
        on_air: action.payload
      }

    case ActionTypes.PLAYLIST_LOADING:
      return { ...state, isLoading: true, errMess: null }

    case ActionTypes.PLAYLIST_FAILED:
      return { ...state, isLoading: false, errMess: action.payload }

    default:
      return state
  }
}
