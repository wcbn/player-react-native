import React, { ReactNode } from 'react'
import { Text, StyleSheet, StyleProp, TextStyle, TextProps } from 'react-native'
import { useTheme } from '../styles/theming'

interface ThemedTextProps extends TextProps {
  children: ReactNode,
  color?: string
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
