import React, { useContext } from 'react'
import { NavigationContainer } from '@react-navigation/native'
// import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons'
import {
  // Episode,
  // Playlist,
  // Profile,
  Radio,
  // Schedule,
  Settings,
  // Show,
} from '../../screens'
import { useScreenOptions } from '../../util/navigation'
import { ThemeContext } from '../../styles/theming'
// import { ScheduleStackParamList, PlaylistStackParamList } from './types'

// const ScheduleStack = createNativeStackNavigator<ScheduleStackParamList>()
// const PlaylistStack = createNativeStackNavigator<PlaylistStackParamList>()
const Tab = createBottomTabNavigator()

const getIcon = (
  name: React.ComponentProps<typeof Ionicons>['name'],
  color: string
) => <Ionicons name={name} size={23} color={color} />

export default function AppContainer() {
  const { theme } = useContext(ThemeContext)
  const screenOptions = useScreenOptions(theme)

  // function ScheduleStackScreen() {
  //   return (
  //     <ScheduleStack.Navigator screenOptions={screenOptions}>
  //       <ScheduleStack.Screen
  //         name="Schedule"
  //         component={Schedule}
  //         options={{ title: 'WCBN Schedule' }}
  //       />
  //       <ScheduleStack.Screen name="Show" component={Show} />
  //       <ScheduleStack.Screen name="Profile" component={Profile} />
  //       <ScheduleStack.Screen name="Episode" component={Episode} />
  //     </ScheduleStack.Navigator>
  //   )
  // }

  // function PlaylistStackScreen() {
  //   return (
  //     <PlaylistStack.Navigator screenOptions={screenOptions}>
  //       <PlaylistStack.Screen name="Playlist" component={Playlist} />
  //       <PlaylistStack.Screen name="Profile" component={Profile} />
  //     </PlaylistStack.Navigator>
  //   )
  // }

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Radio"
        sceneContainerStyle={{ backgroundColor: theme.primary }}
        screenOptions={screenOptions}
      >
        {/* <Tab.Screen
          name="ScheduleScreen"
          component={ScheduleStackScreen}
          options={{
            tabBarLabel: 'Schedule',
            tabBarIcon: ({ color }) => getIcon('calendar', color),
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="PlaylistScreen"
          component={PlaylistStackScreen}
          options={{
            tabBarLabel: 'Playlist',
            tabBarIcon: ({ color }) => getIcon('musical-notes', color),
            headerShown: false,
          }}
        /> */}
        <Tab.Screen
          name="Radio"
          component={Radio}
          options={{
            headerTitle: 'WCBN-FM Ann Arbor',
            tabBarIcon: ({ color }) => getIcon('radio-outline', color),
          }}
        />
        <Tab.Screen
          name="Settings"
          component={Settings}
          options={{
            tabBarIcon: ({ color }) => getIcon('settings-sharp', color),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
}
