import React from 'react'
import { Text } from 'react-native'
import { useTheme } from '../styles/theming'

export default (ThemedText = props => {
  const theme = useTheme()
  return <Text style={[props.style, { color: theme.textColor, fontFamily: 'Futura' }]}>{props.children}</Text>
})
