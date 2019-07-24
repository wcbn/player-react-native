import React from 'react'
import { StyleSheet, View, AsyncStorage } from 'react-native'
import SegmentedControlTab from 'react-native-segmented-control-tab'
import ThemedText from '../ThemedText'
import { withTheme } from '../../styles/theming'

const STREAMS = [
  'http://floyd.wcbn.org:8000/wcbn-mid.mp3',
  'http://floyd.wcbn.org:8000/wcbn-hi.mp3',
  'http://floyd.wcbn.org:8000/wcbn-hd.mp3'
]

class StreamSelection extends React.PureComponent {
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
    this.setState({ selectedStreamIndex: index })
    AsyncStorage.setItem('STREAM_URL', STREAMS[index])
  }

  render() {
    return (
      <View>
        <ThemedText style={styles.title}>Stream Quality</ThemedText>
        <SegmentedControlTab
          values={['Low', 'Medium', 'High']}
          thumbColor={this.props.theme.secondary}
          selectedIndex={this.state.selectedStreamIndex}
          onTabPress={this.setStreamSetting}
          activeTabStyle={{
            backgroundColor: this.props.theme.secondary
          }}
          tabStyle={{
            backgroundColor: 'transparent',
            borderColor: this.props.theme.secondary
          }}
          activeTabTextStyle={{ color: this.props.theme.primary }}
          tabTextStyle={{ color: this.props.theme.textColor }}
        />
        <View style={styles.captionView}>
          <ThemedText style={styles.captionText}>64 kbps</ThemedText>
          <ThemedText style={styles.captionText}>128 kbps</ThemedText>
          <ThemedText style={styles.captionText}>320 kbps</ThemedText>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  title: {
    marginBottom: 4,
    fontSize: 16
  },
  captionView: {
    flexDirection: 'row'
  },
  captionText: {
    flex: 1,
    padding: 4,
    fontSize: 11
  }
})

export default withTheme(StreamSelection)
