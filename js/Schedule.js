import React from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  SectionList
} from 'react-native'
import { colors } from './styles/main'
import { windowStyles, headerStyles, listStyles } from './styles/components'
import dayjs from 'dayjs'
import ListHeader from './components/ListHeader'

const WEEEKDAYS = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
]

const weekdayIndex = new Date().getDay()
const TODAY = weekdayIndex == 0 ? 6 : weekdayIndex - 1

const ITEM_HEIGHT = 50
const HEADER_HEIGHT = 22

//pure component for better performance(?)
class ScheduleList extends React.PureComponent {
  constructor() {
    super()

    this.state = {
      sections: []
    }
  }

  componentDidMount() {
    this.fetchSchedule()
  }

  renderItem = ({ item, index, section }) => (
    <TouchableOpacity
      key={index}
      style={listStyles.item}
      onPress={() =>
        this.props.navigation.navigate('Show', {
          url: item.url,
          title: item.name
        })
      }
    >
      <View style={styles.showText}>
        <Text style={styles.showName}>{item.name}</Text>
        <Text style={styles.showHost}>{item.with}</Text>
      </View>
      <Text style={styles.showTime}>{item.beginning}</Text>
    </TouchableOpacity>
  )

  renderSectionHeader = ({ section: { title } }) => <ListHeader text={title} />

  fetchSchedule() {
    fetch(this.props.url, {
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json'
      })
    })
      .then(response => response.json())
      .then(response => response['shows'])
      .then(data => {
        let fetched = WEEEKDAYS.map((day, i) => {
          data[i + 1].forEach(show => {
            show.beginning = dayjs(show.beginning).format('h:mm A')
          })
          return {
            title: day,
            data: data[i + 1]
          }
        })
        this.setState({
          sections: fetched
        })
      })
    // .then(() => {
    //   this.sectionListRef.scrollToLocation({
    //     animated: true,
    //     sectionIndex: TODAY,
    //     itemIndex: 0,
    //     viewPosition: 0,
    //     viewOffset: 22
    //   })
    // })
  }

  renderSeparator = () => {
    return (
      <View
        style={{
          height: StyleSheet.hairlineWidth,
          backgroundColor: colors.grayHighlight
        }}
      />
    )
  }

  render() {
    return (
      <SectionList
        renderItem={this.renderItem}
        renderSectionHeader={this.renderSectionHeader}
        sections={this.state.sections}
        keyExtractor={(item, index) => index}
        ItemSeparatorComponent={this.renderSeparator}
      />
    )
  }
}

export default class Schedule extends React.PureComponent {
  static navigationOptions = {
    title: 'WCBN Schedule',
    ...headerStyles
  }

  render() {
    return (
      <View style={windowStyles.container}>
        <ScheduleList
          url="https://app.wcbn.org/semesters"
          navigation={this.props.navigation}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  showText: {
    maxWidth: '85%'
  },
  showName: {
    color: colors.inactive
  },
  showHost: {
    fontStyle: 'italic',
    color: colors.active
  },
  showTime: {
    fontSize: 10,
    color: colors.lightGreen,
    marginRight: -10,
    marginTop: -5
  }
})
