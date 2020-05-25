import { PlaylistAPI } from '../types'

export const PLAYLIST_LOADING = 'PLAYLIST_LOADING'
export const PLAYLIST_FAILED = 'PLAYLIST_FAILED'
export const UPDATE_PLAYLIST = 'UPDATE_PLAYLIST'

interface PlaylistLoadingAction {
  type: typeof PLAYLIST_LOADING
}

interface PlaylistFailedAction {
  type: typeof PLAYLIST_FAILED
  payload: string
}

interface UpdatePlaylistAction {
  type: typeof UPDATE_PLAYLIST
  payload: PlaylistState['on_air']
}

export type ActionType =
  | PlaylistLoadingAction
  | PlaylistFailedAction
  | UpdatePlaylistAction

export interface PlaylistState {
  errMess: string | null
  isLoading: boolean
  on_air: PlaylistAPI['on_air']
}
