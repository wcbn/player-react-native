import React, { ReactNode } from 'react'
import { Text, StyleSheet, StyleProp, TextStyle } from 'react-native'
import { useTheme } from '../styles/theming'

interface ThemedTextProps {
  children: ReactNode,
  color?: string,
  style?: StyleProp<TextStyle>
}

const ThemedText = (props: ThemedTextProps) => {
  const theme = useTheme()

  const styles = StyleSheet.create({
    text: { color: theme[props.color] || theme.textColor }
  })

  return (
    <Text {...props} style={[styles.text, props.style]}>
      {props.children}
    </Text>
  )
}

export default ThemedText
