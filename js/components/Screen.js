import React from 'react'
import { View } from 'react-native'
import { useTheme } from '../styles/theming'

export default (Screen = props => {
  const theme = useTheme()
  return (
    <View style={[props.style, { flex: 1, backgroundColor: theme.primary }]}>
      {props.children}
    </View>
  )
})
