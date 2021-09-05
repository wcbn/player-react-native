import { SongAPI } from '../../types'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
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

// Schedule screen
export type ScheduleNavigationProp = NativeStackNavigationProp<
  ScheduleStackParamList,
  'Schedule'
>

// Show screen
export type ShowNavigationProp = NativeStackNavigationProp<
  ScheduleStackParamList,
  'Show'
>
export type ShowRouteProp = RouteProp<ScheduleStackParamList, 'Show'>

// Episode screen
export type EpisodeNavProp = NativeStackNavigationProp<
  ScheduleStackParamList,
  'Episode'
>
export type EpisodeRouteProp = RouteProp<ScheduleStackParamList, 'Episode'>

// Profile screen
export type ProfileNavProp = NativeStackNavigationProp<
  ScheduleStackParamList | PlaylistStackParamList,
  'Profile'
>
export type ProfileRouteProp = RouteProp<
  ScheduleStackParamList | PlaylistStackParamList,
  'Profile'
>

// Playlist screen
export type PlaylistNavProp = NativeStackNavigationProp<
  PlaylistStackParamList,
  'Playlist'
>
