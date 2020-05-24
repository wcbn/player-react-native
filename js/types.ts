export interface Song {
  at?: string
  artist?: string
  name: string
  request?: boolean
  album?: string
  label?: string
  year?: number
}

export const defaultSong = {
  name: '',
  artist: '',
  album: '',
  label: '',
  year: '',
}
