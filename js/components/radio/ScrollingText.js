import React from 'react'
import { Easing } from 'react-native'
import TextTicker from 'react-native-text-ticker'
import { colors } from '../../styles/main'

export default (ScrollingText = props => {
  return (
    <TextTicker
      style={{
        color: colors.inactive,
        lineHeight: Math.min(props.lineHeight, 31),
        fontSize: Math.min(props.lineHeight - 10, 21)
      }}
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
