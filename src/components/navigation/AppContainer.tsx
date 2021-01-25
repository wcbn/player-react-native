import React, { useContext } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import TabBarComponent from './TabBarComponent'
import { Ionicons } from '@expo/vector-icons'
import {
  Episode,
  Playlist,
  Profile,
  Radio,
  Schedule,
  Settings,
  Show,
} from '../../screens'
import { useScreenOptions } from '../../util/navigation'
import { ThemeContext } from '../../styles/theming'
import { ScheduleStackParamList, PlaylistStackParamList } from './types'

const ScheduleStack = createStackNavigator<ScheduleStackParamList>()
const PlaylistStack = createStackNavigator<PlaylistStackParamList>()
const RadioStack = createStackNavigator()
const SettingsStack = createStackNavigator()
const Tab = createBottomTabNavigator()

const getIcon = (
  name: React.ComponentProps<typeof Ionicons>['name'],
  color: string
) => <Ionicons name={name} size={23} color={color} />

export default function AppContainer() {
  const { theme } = useContext(ThemeContext)
  const screenOptions = useScreenOptions(theme)

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

  function PlaylistStackScreen() {
    return (
      <PlaylistStack.Navigator screenOptions={screenOptions}>
        <PlaylistStack.Screen name="Playlist" component={Playlist} />
        <PlaylistStack.Screen name="Profile" component={Profile} />
      </PlaylistStack.Navigator>
    )
  }

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

  function SettingsStackScreen() {
    return (
      <SettingsStack.Navigator screenOptions={screenOptions}>
        <SettingsStack.Screen name="Settings" component={Settings} />
      </SettingsStack.Navigator>
    )
  }

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Radio"
        tabBar={(props) => <TabBarComponent {...props} />}
      >
        <Tab.Screen
          name="Schedule"
          component={ScheduleStackScreen}
          options={{
            tabBarIcon: ({ color }) => getIcon('calendar', color),
          }}
        />
        <Tab.Screen
          name="Playlist"
          component={PlaylistStackScreen}
          options={{
            tabBarIcon: ({ color }) => getIcon('musical-notes', color),
          }}
        />
        <Tab.Screen
          name="Radio"
          component={RadioStackScreen}
          options={{
            title: 'Radio',
            tabBarIcon: ({ color }) => getIcon('radio-outline', color),
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsStackScreen}
          options={{
            tabBarIcon: ({ color }) => getIcon('settings-sharp', color),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
}
