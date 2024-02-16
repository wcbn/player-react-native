export interface EpisodeAPI {
  name: string
  dj: string
  dj_url: string
  beginning: string
  ending: string
  times: string
  show_notes: string | null
  songs: SongAPI[]
  semester_id: number
}

export interface ProfileAPI {
  dj_name: string
  about: string
  shows: ShowAPI[]
  website: string
  public_email: string
  real_name: string | null
  image_url: string
}

export interface SemesterAPI {
  beginning: string
  end: string
  shows: ShowAPI[][]
}

export interface ShowAPI {
  url: string
  name: string
  description: string
  website: string | null
  djs: { url: string; name: string }[]
  episodes: EpisodeAPI[]
  with?: string
  beginning: string
  ending: string
  semester?: string
  semester_beginning: string
  on_air: boolean
}

export interface SongAPI {
  at: string
  artist: string
  name: string
  request: boolean
  album: string
  label: string
  year: number | null
}

export interface PlaylistAPI {
  on_air: {
    name: string
    dj: string
    dj_url: string
    beginning: string
    ending: string
    times: string
    show_notes: string | null
    songs: SongAPI[]
    semester_id: number
  }
  upcoming_episodes: { name: string; dj: string; times: string }[]
}

export interface SpinAPI {
  id: number
  playlist_id: number
  start: string
  end: null
  duration: null
  timezone: string
  image: string
  classical: boolean
  artist: string
  'artist-custom': null
  composer: string
  release: string
  'release-custom': null
  released: number
  added: null
  medium: null
  va: boolean
  label: string
  'label-custom': null
  song: string
  note: string
  request: boolean
  local: boolean
  new: boolean
  genre: null
  work: null
  conductor: null
  performers: null
  ensemble: null
  'catalog-number': null
  isrc: string
  upc: string
  iswc: null
  _links: {
    self: {
      href: string
    }
    playlist: {
      href: string
    }
  }
}

export interface SpinsAPI {
  items: SpinAPI[]
  _links: {
    self: {
      href: string
    }
    first: {
      href: string
    }
    next: {
      href: string
    }
  }
  _meta: {
    totalCount: boolean
    pageCount: boolean
    currentPage: number
    perPage: number
  }
}
