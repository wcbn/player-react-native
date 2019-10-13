import React from 'react'
import { createMaterialTopTabNavigator } from 'react-navigation-tabs'
import Screen from '../components/Screen'
import ScheduleDay from './ScheduleDay'
import { getDefaultNavigationOptions } from '../util/navigation'
import { humanizeTime } from '../util/datetime'
import MaterialTopTabBarWrapper from '../components/navigation/MaterialTopTabBarWrapper'

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

const MONDAY = <ScheduleDay />

const SimpleTabs = createMaterialTopTabNavigator(
  {
    Monday: {
      screen: ScheduleDay,
      navigationOptions: {
        tabBarLabel: 'M'
      }
    },
    Tuesday: {
      screen: ScheduleDay,
      navigationOptions: {
        tabBarLabel: 'T'
      }
    },
    Wednesday: {
      screen: ScheduleDay,
      navigationOptions: {
        tabBarLabel: 'W'
      }
    },
    Thursday: {
      screen: ScheduleDay,
      navigationOptions: {
        tabBarLabel: 'H'
      }
    },
    Friday: {
      screen: ScheduleDay,
      navigationOptions: {
        tabBarLabel: 'F'
      }
    },
    Saturday: {
      screen: ScheduleDay,
      navigationOptions: {
        tabBarLabel: 'S'
      }
    },
    Sunday: {
      screen: ScheduleDay,
      navigationOptions: {
        tabBarLabel: 'S'
      }
    }
  },
  {
    initialRouteName: WEEEKDAYS[TODAY],
    lazy: true,
    // lazyPlaceholderComponent //TODO
    tabBarComponent: MaterialTopTabBarWrapper
  }
)

export default class Schedule extends React.Component {
  static navigationOptions = ({ navigation, screenProps }) => {
    return {
      title: 'WCBN Schedule',
      ...getDefaultNavigationOptions(screenProps.theme)
    }
  }

  static router = SimpleTabs.router

  state = {
    data: {}
  }

  componentDidMount() {
    fetch('https://app.wcbn.org/semesters', {
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
        this.setState({
          data: fetched
        })
      })
  }

  render() {
    const { navigation } = this.props
    const theme = this.props.screenProps.theme
    const { routes, index } = navigation.state
    const activeRoute = routes[index]
    return (
      <Screen>
        <SimpleTabs
          navigation={navigation}
          screenProps={{ scheduleData: this.state.data, theme }}
        />
      </Screen>
    )
  }
}
