import React from 'react'
import { createAppContainer } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createStackNavigator } from 'react-navigation-stack'
import TabBarComponent from './TabBarComponent'
import Icon from 'react-native-vector-icons/Ionicons'
import {
  Episode,
  Playlist,
  Profile,
  Radio,
  Schedule,
  Settings,
  Show
} from '../../screens'
import { getDefaultNavigationOptions } from '../../util/navigation'

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
  Radio: {
    screen: Radio,
    navigationOptions: ({ navigation, screenProps }) => ({
      title: 'WCBN-FM Ann Arbor',
      ...getDefaultNavigationOptions(screenProps.theme)
    })
  }
})

const SettingsStack = createStackNavigator({
  Settings: {
    screen: Settings,
    navigationOptions: ({ navigation, screenProps }) => ({
      title: 'Settings',
      ...getDefaultNavigationOptions(screenProps.theme)
    })
  }
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
    tabBarComponent: props => <TabBarComponent {...props} />,
    initialRouteName: 'Radio'
  }
)

export default createAppContainer(AppNavigator)
