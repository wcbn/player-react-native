import React from 'react'
import { StyleSheet, Text, View, AsyncStorage } from 'react-native'
import SegmentedControlTab from 'react-native-segmented-control-tab'
import { colors } from '../../styles/main'

const STREAMS = [
  'http://floyd.wcbn.org:8000/wcbn-mid.mp3',
  'http://floyd.wcbn.org:8000/wcbn-hi.mp3',
  'http://floyd.wcbn.org:8000/wcbn-hd.mp3'
]

export default class StreamSelection extends React.PureComponent {
  constructor() {
    super()
    this.state = {
      selectedStreamIndex: null // fetch ASAP in componentDidMount ¯\_(ツ)_/¯
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
  }

  render() {
    return (
      <View>
        <Text style={styles.title}>Stream Quality</Text>
        <SegmentedControlTab
          values={['Low', 'Medium', 'High']}
          thumbColor={colors.active}
          selectedIndex={this.state.selectedStreamIndex}
          onTabPress={this.setStreamSetting}
          activeTabStyle={{ backgroundColor: colors.highlight }}
          tabStyle={{
            backgroundColor: colors.primary,
            borderColor: colors.active
          }}
          activeTabTextStyle={{ color: colors.active }}
          tabTextStyle={{ color: colors.inactive }}
        />
        <View style={styles.infoView}>
          <Text style={styles.tabCaption}>64 kbps</Text>
          <Text style={styles.tabCaption}>128 kbps</Text>
          <Text style={styles.tabCaption}>320 kbps</Text>
        </View>
        <View style={styles.infoView}>
          <Text style={styles.infoText}>
            Experiencing buffering? Try a lower data rate.
          </Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  title: { color: colors.inactive, marginBottom: 4, fontSize: 16 },
  tabCaption: {
    flex: 1,
    padding: 4,
    fontSize: 11,
    color: colors.inactive
  },
  infoView: { flexDirection: 'row' },
  infoText: { flex: 1, padding: 4, color: colors.inactive }
})
