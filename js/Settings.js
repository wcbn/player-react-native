import React from 'react'
import { StyleSheet, Text, View, Switch, AsyncStorage } from 'react-native'
import SegmentedControlTab from 'react-native-segmented-control-tab'
import { windowStyles, headerStyles } from './styles/components'
import { colors } from './styles/main'
import Separator from './components/Separator'
import Share from './components/settings/ShareLink'
import SmsExpo from './components/settings/SmsExpo'
import ExternalLink from './components/settings/ExternalLink'

const STREAMS = [
  'http://floyd.wcbn.org:8000/wcbn-mid.mp3',
  'http://floyd.wcbn.org:8000/wcbn-hi.mp3',
  'http://floyd.wcbn.org:8000/wcbn-hd.mp3'
]

export default class Settings extends React.Component {
  static navigationOptions = {
    title: 'Settings',
    ...headerStyles
  }

  constructor() {
    super()
    this.state = {
      selectedStreamIndex: null // fetch ASAP in async componentDidMount ¯\_(ツ)_/¯
    }
  }

  async componentDidMount() {
    const streamUrl = (await AsyncStorage.getItem('STREAM_URL')) || STREAMS[2]

    this.setState({
      selectedStreamIndex: STREAMS.indexOf(streamUrl)
    })
  }

  setStreamSetting = index => {
    AsyncStorage.setItem('STREAM_URL', STREAMS[index])
    this.setState({ selectedStreamIndex: index })
    // AsyncStorage.getItem('STREAM_URL').then(resp => console.log(resp))
  }

  renderStreamOption() {
    return (
      <View style={styles.option}>
        <Text style={styles.optionLabel}>Stream Quality</Text>
        <SegmentedControlTab
          values={['Low', 'Medium', 'High']}
          thumbColor={colors.active}
          selectedIndex={this.state.selectedStreamIndex}
          onTabPress={this.setStreamSetting}
          activeTabStyle={{ backgroundColor: colors.active }}
          tabStyle={{
            backgroundColor: colors.primary,
            borderColor: colors.active
          }}
          activeTabTextStyle={{ color: colors.primary }}
          tabTextStyle={{ color: colors.active }}
        />
        <View style={styles.streamInfoView}>
          <Text style={styles.streamInfoText}>64 kbps</Text>
          <Text style={styles.streamInfoText}>128 kbps</Text>
          <Text style={styles.streamInfoText}>320 kbps</Text>
        </View>
        <View style={styles.streamInfoView}>
          <Text style={styles.streamInfoText}>
            If you're experiencing buffering, try a lower data rate.
          </Text>
        </View>
      </View>
    )
  }

  renderThemeOption() {
    return (
      <View style={styles.option}>
        <Text style={styles.optionLabel}>Dark Mode</Text>
        <Switch
          value={this.state.darkMode}
          disabled={true}
          trackColor={{ true: colors.active }}
          onValueChange={() => {
            const newVal = !this.state.darkMode
            this.setState({
              darkMode: newVal
            })
            AsyncStorage.setItem('DARK_MODE', JSON.stringify(newVal))
          }}
        />
      </View>
    )
  }

  renderWidgetsList() {
    return (
      <View style={styles.LinkList}>
        <ExternalLink
          url={'tel:17347633500'}
          text={`Studio Request Line${'\n'}(734) 763-3500`}
          icon={'md-call'}
        />
        <Separator color={colors.active} />
        <SmsExpo />
        <Separator color={colors.active} />
        <ShareLink />
        <Separator color={colors.active} />
        {/* <ExternalLink
          url={'appstore.com/wcbn/review'}
          text={'Write a Review!'}
          icon={'md-thumbs-up'}
        />
        <Separator color={colors.active} /> */}
        <ExternalLink
          url={
            'https://leadersandbest.umich.edu/find/#!/give/basket/fund/361991'
          }
          text={'Give to WCBN'}
          icon={'md-cash'}
        />
      </View>
    )
  }

  render() {
    return (
      <View style={windowStyles.container}>
        <View style={styles.content}>
          {this.renderStreamOption()}
          {this.renderWidgetsList()}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  content: {
    padding: 20
  },
  option: {
    marginBottom: 10
  },
  optionLabel: { color: colors.active, marginBottom: 4, fontSize: 16 },
  streamInfoView: { flexDirection: 'row' },
  streamInfoText: { flex: 1, padding: 3, color: colors.active },
  LinkList: {
    marginTop: 25
  }
})

//componentdidmount
// let darkMode = JSON.parse(await AsyncStorage.getItem('DARK_MODE'))

// if (darkMode == null) {
//   darkMode = true // DEFAULT TO TRUE TODO: FLIP ONCE LIGHT MODE IS IMPLEMENTED
// }

// https://leadersandbest.umich.edu/find/#!/give/basket/fund/361991
