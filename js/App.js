import React from 'react'
import {
  createAppContainer,
  createBottomTabNavigator,
  createStackNavigator,
  SafeAreaView
} from 'react-navigation'

import { StatusBar } from 'react-native'
import OnAirPoll from './components/OnAirPoll'

import { windowStyles } from './styles/components'

import Icon from 'react-native-vector-icons/Ionicons'
import Schedule from './Schedule'
import Radio from './Radio'
import Settings from './Settings'
import Show from './Show'
import Profile from './Profile'
import Episode from './Episode'
import Playlist from './Playlist'
import { colors } from './styles/main'

const getIconName = routeName => {
  switch (routeName) {
    case 'Schedule':
      return 'md-calendar'
    case 'Playlist':
      return 'md-musical-notes'
    case 'Radio':
      return 'md-radio'
    case 'Settings':
      return 'md-settings'
  }
}

const ScheduleStack = createStackNavigator({
  Schedule,
  Show,
  Profile,
  Episode
})

const PlaylistStack = createStackNavigator({
  Playlist,
  Profile
})

const RadioStack = createStackNavigator({
  Radio
})

const SettingsStack = createStackNavigator({
  Settings
})

const AppNavigator = createBottomTabNavigator(
  {
    Schedule: ScheduleStack,
    Playlist: PlaylistStack,
    Radio: RadioStack,
    Settings: SettingsStack
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
    initialRouteName: 'Radio'
  }
)

const AppContainer = createAppContainer(AppNavigator)

export default () => (
  <SafeAreaView style={windowStyles.container} forceInset={{ top: 'never' }}>
    <StatusBar barStyle="light-content" />
    <OnAirPoll />
    <AppContainer />
  </SafeAreaView>
)
