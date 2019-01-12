/*
 * @providesModule Song
 * @flow
 */

export type SongT = {
  +id: ?number,
  +name: string,
  +artist: string,
  +album: string,
  +label: string,
  +year: ?number,
  +request: boolean,
  +new: boolean,
  +local: boolean,
  +at: Date
}

export const defaultSongT: SongT = {
  id: null,
  name: '',
  artist: '',
  album: '',
  label: '',
  year: null,
  request: false,
  new: false,
  local: false,
  at: new Date()
}
