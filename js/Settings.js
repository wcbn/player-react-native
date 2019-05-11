import React from 'react'
import { StyleSheet, Text, View, Switch, AsyncStorage } from 'react-native'
import SegmentedControlTab from 'react-native-segmented-control-tab'
import { windowStyles, headerStyles } from './styles/components'
import { colors } from './styles/main'

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
      selectedStreamIndex: null, // fetch ASAP in async componentDidMount ¯\_(ツ)_/¯
      darkMode: true
    }
  }

  async componentDidMount() {
    const streamUrl = (await AsyncStorage.getItem('STREAM_URL')) || STREAMS[2]
    let darkMode = JSON.parse(await AsyncStorage.getItem('DARK_MODE'))

    if (darkMode == null) {
      darkMode = true // DEFAULT TO TRUE TODO: FLIP ONCE LIGHT MODE IS IMPLEMENTED
    }

    this.setState({
      selectedStreamIndex: STREAMS.indexOf(streamUrl),
      darkMode: darkMode
    })
  }

  setStreamSetting = index => {
    AsyncStorage.setItem('STREAM_URL', STREAMS[index])
    this.setState({ selectedStreamIndex: index })
    // AsyncStorage.getItem('STREAM_URL').then(resp => console.log(resp))
  }

  render() {
    return (
      <View style={windowStyles.container}>
        <View style={styles.content}>
          <Text style={{ color: colors.active }}>Stream Quality</Text>
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

          <View>
            <Text style={{ color: colors.active, marginTop: 20 }}>
              Dark Mode
            </Text>
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
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  content: {
    padding: 20
  }
})
