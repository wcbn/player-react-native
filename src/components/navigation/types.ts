import { SongAPI } from '../../types'
import { StackNavigationProp } from '@react-navigation/stack'
import { RouteProp } from '@react-navigation/native'

export type ScheduleStackParamList = {
  Schedule: undefined
  Show: { url: string; title: string }
  Profile: { url: string; title: string }
  Episode: {
    songs: SongAPI[]
    title: string
    dj: string
    dj_url: string
    date: string
  }
}

export type PlaylistStackParamList = {
  Playlist: undefined
  Profile: { url: string; title: string }
}

// Show screen
export type ShowNavigationProp = StackNavigationProp<
  ScheduleStackParamList,
  'Show'
>
export type ShowRouteProp = RouteProp<ScheduleStackParamList, 'Show'>

// Episode screen
export type EpisodeNavProp = StackNavigationProp<
  ScheduleStackParamList,
  'Episode'
>
export type EpisodeRouteProp = RouteProp<ScheduleStackParamList, 'Episode'>

// Profile screen
export type ProfileNavProp = StackNavigationProp<
  ScheduleStackParamList | PlaylistStackParamList,
  'Profile'
>
export type ProfileRouteProp = RouteProp<
  ScheduleStackParamList | PlaylistStackParamList,
  'Profile'
>

// Playlist screen
export type PlaylistNavProp = StackNavigationProp<
  PlaylistStackParamList,
  'Playlist'
>
