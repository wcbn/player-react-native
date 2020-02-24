import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
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
import { useScreenOptions } from '../../util/navigation'
import { useTheme } from '../../styles/theming'
import { ScheduleStackParamList, PlaylistStackParamList } from './types'

export default function AppContainer() {
  const theme = useTheme()
  const screenOptions = useScreenOptions(theme)

  const ScheduleStack = createStackNavigator<ScheduleStackParamList>()
  function ScheduleStackScreen() {
    return (
      <ScheduleStack.Navigator screenOptions={screenOptions}>
        <ScheduleStack.Screen
          name="Schedule"
          component={Schedule}
          options={{ title: 'WCBN-FM Schedule' }}
        />
        <ScheduleStack.Screen name="Show" component={Show} />
        <ScheduleStack.Screen name="Profile" component={Profile} />
        <ScheduleStack.Screen name="Episode" component={Episode} />
      </ScheduleStack.Navigator>
    )
  }

  const PlaylistStack = createStackNavigator<PlaylistStackParamList>()
  function PlaylistStackScreen() {
    return (
      <PlaylistStack.Navigator screenOptions={screenOptions}>
        <PlaylistStack.Screen name="Playlist" component={Playlist} />
        <PlaylistStack.Screen name="Profile" component={Profile} />
      </PlaylistStack.Navigator>
    )
  }

  const RadioStack = createStackNavigator()
  function RadioStackScreen() {
    return (
      <RadioStack.Navigator screenOptions={screenOptions}>
        <RadioStack.Screen
          name="Radio"
          component={Radio}
          options={{ title: 'WCBN-FM Ann Arbor' }}
        />
      </RadioStack.Navigator>
    )
  }

  const SettingsStack = createStackNavigator()
  function SettingsStackScreen() {
    return (
      <SettingsStack.Navigator screenOptions={screenOptions}>
        <SettingsStack.Screen name="Settings" component={Settings} />
      </SettingsStack.Navigator>
    )
  }

  const getIcon = (name: string, color: string) => (
    <Icon name={name} size={25} color={color} />
  )

  const Tab = createBottomTabNavigator()
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Schedule" //TODO radio
        tabBar={props => <TabBarComponent {...props} />}
      >
        <Tab.Screen
          name="Schedule"
          component={ScheduleStackScreen}
          options={{
            tabBarIcon: ({ color }) => getIcon('md-calendar', color)
          }}
        />
        <Tab.Screen
          name="Playlist"
          component={PlaylistStackScreen}
          options={{
            tabBarIcon: ({ color }) => getIcon('md-musical-notes', color)
          }}
        />
        <Tab.Screen
          name="Radio"
          component={RadioStackScreen}
          options={{
            title: 'Radio',
            tabBarIcon: ({ color }) => getIcon('md-radio', color)
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsStackScreen}
          options={{
            tabBarIcon: ({ color }) => getIcon('md-settings', color)
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
}
