import React from 'react'
import { Easing } from 'react-native'
import TextTicker from './TextTicker'
import { useTheme } from '../../styles/theming';

export default (ScrollingText = props => {
  const theme = useTheme()
  return (
    <TextTicker
      style={{
        color: theme.textColor,
        lineHeight: Math.min(props.lineHeight, 31),
        fontSize: Math.min(props.lineHeight - 10, 21),
        alignSelf: 'stretch',
        textAlign: 'center'
      }}
      easing={Easing.linear}
      duration={20000}
      scrollingSpeed={30}
      marqueeDelay={3500}
      bounce={false}
      marqueeOnMount={true}
    >
      {props.text}
    </TextTicker>
  )
})
