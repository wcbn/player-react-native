import React from 'react'
import { StyleSheet, Text, View, AsyncStorage } from 'react-native'
import SegmentedControlTab from 'react-native-segmented-control-tab'
import { windowStyles } from './styles/components'

const STREAMS = [
  'http://floyd.wcbn.org:8000/wcbn-lo.mp3',
  'http://floyd.wcbn.org:8000/wcbn-mid.mp3',
  'http://floyd.wcbn.org:8000/wcbn-hi.mp3'
]

export default class Settings extends React.Component {
  static navigationOptions = {
    title: 'Settings'
  }

  constructor() {
    super()
    this.state = {
      selectedStreamIndex: null // fetch ASAP in async componentDidMount ¯\_(ツ)_/¯
    }
  }

  async componentDidMount() {
    const result = await AsyncStorage.getItem('STREAM_URL')
    this.setState({ selectedStreamIndex: STREAMS.indexOf(result) })
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
          <Text>Stream Quality</Text>
          <SegmentedControlTab
            values={['Low', 'Medium', 'High']}
            selectedIndex={this.state.selectedStreamIndex}
            onTabPress={this.setStreamSetting}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  content: {
    paddingTop: 100,
    padding: 20,
  }
})
