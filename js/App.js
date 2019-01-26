import React from 'react'
import {
  createAppContainer,
  createBottomTabNavigator,
  createStackNavigator
} from 'react-navigation'
import Icon from 'react-native-vector-icons/Ionicons'
import Schedule from './Schedule'
import Radio from './Radio'
import Favorites from './Favorites'
import Settings from './Settings'
import Show from './Show'
import Profile from './Profile'
import Episode from './Episode'
import Playlist from './Playlist'
import {colors} from './styles/main'



const getIconName = routeName => {
  switch (routeName) {
    case 'Schedule':
      return 'calendar'
    case 'Playlist':
      return 'musical-notes'
    case 'Radio':
      return 'radio'
    case 'Favorites':
      return 'heart'
    case 'Settings':
      return 'settings'
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
    Radio: Radio,
    // Favorites: Favorites,
    // Settings: Settings
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state
        const iconName = 'ios-' + getIconName(routeName)
        return <Icon name={iconName} size={25} color={tintColor} />
      }
    }),
    tabBarOptions: {
      activeTintColor: colors.active,
      inactiveTintColor: colors.inactive,
      inactiveBackgroundColor: colors.primary,
      activeBackgroundColor: colors.highlight
    },
    initialRouteName: 'Playlist'
  }
)



export default createAppContainer(AppNavigator)
