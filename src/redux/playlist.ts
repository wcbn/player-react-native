import * as ActionTypes from './ActionTypes'
import { PlaylistState, ActionType } from './ActionTypes'

const initialState: PlaylistState = {
  errMess: null,
  isLoading: true,
  on_air: {
    name: '',
    dj: 'unknown',
    dj_url: '',
    beginning: '',
    ending: '',
    times: '',
    show_notes: null,
    songs: [],
    semester_id: -1,
  },
}

export const playlist = (state = initialState, action: ActionType) => {
  switch (action.type) {
    case ActionTypes.UPDATE_PLAYLIST:
      return {
        errMess: null,
        isLoading: false,
        on_air: action.payload,
      }

    case ActionTypes.PLAYLIST_LOADING:
      return { ...state, isLoading: true, errMess: null }

    case ActionTypes.PLAYLIST_FAILED:
      return { ...state, isLoading: false, errMess: action.payload }

    default:
      return state
  }
}
