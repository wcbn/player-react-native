import { StackNavigationProp } from '@react-navigation/stack'

export type ScheduleStackParamList = {
  Schedule: undefined
  Show: { url: string }
  Profile: { url: string }
  Episode: undefined
}

export type PlaylistStackParamList = {
  Playlist: undefined
  Profile: { url: string }
}


//// ScheduleStackParamList Screens ////
export type ScheduleScreenNavigationProp = StackNavigationProp<
  ScheduleStackParamList,
  'Schedule'
>
export type ShowScreenNavigationProp = StackNavigationProp<
  ScheduleStackParamList,
  'Show'
>
export type ProfileScreenNavigationProp = StackNavigationProp<
  ScheduleStackParamList,
  'Profile'
>
export type EpisodeScreenNavigationProp = StackNavigationProp<
  ScheduleStackParamList,
  'Episode'
>

//// PlaylistStackParamList Screens ////
export type PlaylistScreenNavigationProp = StackNavigationProp<
  PlaylistStackParamList,
  'Playlist'
>
