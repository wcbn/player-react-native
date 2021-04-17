import React, { useState, useEffect, useContext } from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import Screen from '../components/Screen'
import ScheduleDay from './ScheduleDay'
import { humanizeTime } from '../util/datetime'
import MaterialTopTabBarWrapper from '../components/navigation/MaterialTopTabBarWrapper'
import LazyPlaceholder from '../components/LazyPlaceholder'
import { BASE_URL } from '../config'
import { ThemeContext } from '../styles/theming'
import { ShowAPI, SemesterAPI } from '../types'

const WEEEKDAYS = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sundday',
] as const
type Weekday = typeof WEEEKDAYS[number]
type WeekdayToShows = Record<Weekday, ShowAPI[]>

//6 hr offset //TODO verify this makes sense outside of EST
const WEEKDAYINDEX = new Date(new Date().getTime() - 21600000).getDay()
const TODAY = WEEKDAYINDEX === 0 ? 6 : WEEKDAYINDEX - 1

const Tab = createMaterialTopTabNavigator()

export default function Schedule() {
  const [state, setState] = useState({ data: {} } as {
    data: WeekdayToShows
  })
  const { theme } = useContext(ThemeContext)

  useEffect(() => {
    fetch(`${BASE_URL}/semesters`, {
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json()
        }
        throw new Error(`Error ${response.status}: cannot fetch schedule`)
      })
      .then((response: SemesterAPI) => response['shows'])
      .then((data) => {
        const fetched: Partial<WeekdayToShows> = {}
        WEEEKDAYS.forEach((day, i) => {
          data[i + 1].forEach((show: ShowAPI) => {
            show.beginning = humanizeTime(show.beginning)
          })

          fetched[day] = data[i + 1]
        })
        setState({
          data: fetched as WeekdayToShows, // since all days are now filled in
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  return (
    <Screen>
      <Tab.Navigator
        sceneContainerStyle={{ backgroundColor: theme.primary }}
        initialRouteName={WEEEKDAYS[TODAY]}
        lazy
        lazyPlaceholder={() => <LazyPlaceholder />}
        tabBar={(params) => <MaterialTopTabBarWrapper {...params} />}
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
