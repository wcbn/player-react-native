import React from 'react'
import { Text, StyleSheet } from 'react-native'
import { useTheme } from '../styles/theming'

export default (ThemedText = props => {
  const theme = useTheme()

  const styles = StyleSheet.create({
    text: { color: theme[props.color] || theme.textColor }
  })

  return (
    <Text {...props} style={[styles.text, props.style]}>
      {props.children}
    </Text>
  )
})
