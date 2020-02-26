import React, { useState, useEffect, useContext } from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import Screen from '../components/Screen'
import ScheduleDay from './ScheduleDay'
import { humanizeTime } from '../util/datetime'
import MaterialTopTabBarWrapper from '../components/navigation/MaterialTopTabBarWrapper'
import LazyPlaceholder from '../components/LazyPlaceholder'
import { BASE_URL } from '../config'
import { ThemeContext } from '../styles/theming'

const WEEEKDAYS = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
]

//6 hr offset //TODO but only on east coast?? need to check this
const WEEKDAYINDEX = new Date(new Date().getTime() - 21600000).getDay()
const TODAY = WEEKDAYINDEX === 0 ? 6 : WEEKDAYINDEX - 1

const Tab = createMaterialTopTabNavigator()

export default function Schedule() {
  const [state, setState] = useState({ data: {} })
  const { theme } = useContext(ThemeContext)

  useEffect(() => {
    fetch(`${BASE_URL}/semesters`, {
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json'
      })
    })
      .then(response => response.json())
      .then(response => response['shows'])
      .then(data => {
        let fetched = {}
        WEEEKDAYS.forEach((day, i) => {
          data[i + 1].forEach(show => {
            show.beginning = humanizeTime(show.beginning)
          })

          fetched[day] = data[i + 1]
        })
        setState({
          data: fetched
        })
      })
  }, [])

  return (
    <Screen>
      <Tab.Navigator
        sceneContainerStyle={{ backgroundColor: theme.primary }}
        initialRouteName={WEEEKDAYS[TODAY]}
        lazy
        lazyPlaceholder={() => <LazyPlaceholder />}
        tabBar={params => <MaterialTopTabBarWrapper {...params} />}
      >
        {WEEEKDAYS.map((name, key) => (
          <Tab.Screen
            key={key.toString()}
            name={name}
            options={{ tabBarLabel: name[0] }}
          >
            {() => <ScheduleDay data={state.data[name]} />}
          </Tab.Screen>
        ))}
      </Tab.Navigator>
    </Screen>
  )
}
