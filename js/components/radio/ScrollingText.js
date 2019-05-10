import React from 'react'
import { StyleSheet, Text, View, Share, Easing } from 'react-native'
import TextTicker from 'react-native-text-ticker'
import { colors, dimensions } from '../../styles/main'

export default (ScrollingText = props => {
  return (
    <TextTicker
      style={styles.nowPlayingText}
      easing={Easing.linear}
      duration={8000}
      scrollingSpeed={30}
      marqueeDelay={3500}
      bounce={false}
    >
      {props.text}
    </TextTicker>
  )
})

const styles = StyleSheet.create({
  nowPlayingText: {
    color: colors.inactive,
    fontSize: 20,
    lineHeight: 30
  }
})
