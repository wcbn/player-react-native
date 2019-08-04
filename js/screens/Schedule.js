import React from 'react'
import { StyleSheet, TouchableOpacity, View, SectionList } from 'react-native'
import ListHeader from '../components/ListHeader'
import Separator from '../components/Separator'
import Screen from '../components/Screen'
import ThemedText from '../components/ThemedText'
import ListItemTime from '../components/ListItemTime'
import { getDefaultNavigationOptions } from '../util/navigation'
import { humanizeTime } from '../util/datetime'
import { ListItemWrapperStyles } from '../components/ListItemWrapper'

const WEEEKDAYS = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
]

// 6 hr offset
// const weekdayIndex = new Date(new Date().getTime() - 21600000).getDay()
// const TODAY = weekdayIndex == 0 ? 6 : weekdayIndex - 1

class Schedule extends React.PureComponent {
  static navigationOptions = ({ navigation, screenProps }) => {
    return {
      title: 'WCBN Schedule',
      ...getDefaultNavigationOptions(screenProps.theme)
    }
  }

  state = {
    sections: []
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
        let fetched = WEEEKDAYS.map((day, i) => {
          data[i + 1].forEach(show => {
            show.beginning = humanizeTime(show.beginning)
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

  renderItem = ({ item, index, section }) => (
    <TouchableOpacity
      key={index}
      style={ListItemWrapperStyles.view}
      onPress={() =>
        this.props.navigation.navigate('Show', {
          url: item.url,
          title: item.name
        })
      }
    >
      <View style={styles.showText}>
        <ThemedText>{item.name}</ThemedText>
        <ThemedText style={styles.showHost} color={'secondary'}>
          {item.with}
        </ThemedText>
      </View>
      <ListItemTime at={item.beginning} />
    </TouchableOpacity>
  )

  render() {
    return (
      <Screen>
        <SectionList
          renderItem={this.renderItem}
          renderSectionHeader={({ section: { title } }) => (
            <ListHeader text={title} />
          )}
          sections={this.state.sections}
          keyExtractor={(item, index) => index}
          overScrollMode={'never'}
          ItemSeparatorComponent={() => (
            <Separator color={this.props.screenProps.theme.muted} />
          )}
        />
      </Screen>
    )
  }
}

const styles = StyleSheet.create({
  showText: {
    maxWidth: '85%'
  },
  showHost: {
    fontStyle: 'italic'
  }
})

export default Schedule
