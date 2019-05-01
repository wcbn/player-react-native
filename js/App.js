import React from 'react'
import {
  createAppContainer,
  createBottomTabNavigator,
  createStackNavigator,
  SafeAreaView
} from 'react-navigation'

import { windowStyles } from './styles/components'

import Icon from 'react-native-vector-icons/Ionicons'
import Schedule from './Schedule'
import Radio from './Radio'
import Favorites from './Favorites'
import Settings from './Settings'
import Show from './Show'
import Profile from './Profile'
import Episode from './Episode'
import Playlist from './Playlist'
import { colors } from './styles/main'

const getIconName = routeName => {
  switch (routeName) {
    case 'Schedule':
      return 'ios-calendar'
    case 'Playlist':
      return 'ios-musical-notes'
    case 'Radio':
      return 'ios-radio'
    case 'Favorites':
      return 'ios-heart'
    case 'Settings':
      return 'ios-settings'
  }
}

const ScheduleStack = createStackNavigator({
  Schedule: Schedule,
  Show: Show,
  Profile: Profile,
  Episode: Episode
})

const PlaylistStack = createStackNavigator({
  Playlist: Playlist,
  Profile: Profile
})

const AppNavigator = createBottomTabNavigator(
  {
    Schedule: ScheduleStack,
    Playlist: PlaylistStack,
    Radio: Radio
    // Favorites: Favorites,
    // Settings: Settings
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state
        const iconName = getIconName(routeName)
        return <Icon name={iconName} size={25} color={tintColor} />
      }
    }),
    tabBarOptions: {
      activeTintColor: colors.active,
      inactiveTintColor: colors.inactive,
      inactiveBackgroundColor: colors.primary,
      activeBackgroundColor: colors.highlight,
      safeAreaInset: { bottom: 'never', top: 'never' }
    },
    initialRouteName: 'Playlist'
  }
)

const AppContainer = createAppContainer(AppNavigator)

export default () => (
  <SafeAreaView style={windowStyles.container} forceInset={{ top: 'never' }}>
    <AppContainer />
  </SafeAreaView>
)
