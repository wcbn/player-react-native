import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, View, AsyncStorage } from 'react-native'
import SegmentedControlTab from 'react-native-segmented-control-tab'
import ThemedText from '../ThemedText'
import { ThemeContext } from '../../styles/theming'
import { STREAMS } from '../../config'

const StreamSelection = () => {
  const { theme } = useContext(ThemeContext);
  const [selectedStreamIndex, setSelectedStreamIndex] = useState(2) // fetch ASAP, default to high qual
  const setStreamSetting = (index: 0 | 1 | 2) => {
    setSelectedStreamIndex(index)
    AsyncStorage.setItem('STREAM_URL', STREAMS[index])
  }

  useEffect(() => {
    const doAsync = async () => {
      const streamUrl = (await AsyncStorage.getItem('STREAM_URL')) || STREAMS[2]

      setSelectedStreamIndex(STREAMS.indexOf(streamUrl))
    }
    doAsync()
  }, [])

  return (
    <View>
      <ThemedText style={styles.title}>Stream Quality</ThemedText>
      <SegmentedControlTab
        values={['Low', 'Medium', 'High']}
        selectedIndex={selectedStreamIndex}
        onTabPress={(i: 0 | 1 | 2) => setStreamSetting(i)}
        activeTabStyle={{
          backgroundColor: theme.activeBackgroundColor
        }}
        tabStyle={{
          backgroundColor: 'transparent',
          borderColor: theme.secondary
        }}
        activeTabTextStyle={{
          color: theme.activeTintColor
        }}
        tabTextStyle={{ color: theme.textColor }}
      />
      <View style={styles.captionView}>
        <ThemedText style={styles.captionText}>64 kbps</ThemedText>
        <ThemedText style={styles.captionText}>128 kbps</ThemedText>
        <ThemedText style={styles.captionText}>320 kbps</ThemedText>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    marginBottom: 3,
    fontSize: 16
  },
  captionView: {
    flexDirection: 'row'
  },
  captionText: {
    flex: 1,
    padding: 3,
    fontSize: 11
  }
})

export default StreamSelection
