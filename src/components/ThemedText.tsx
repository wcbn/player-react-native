import React, { useContext, ReactNode } from 'react'
import { Text, StyleSheet, TextProps } from 'react-native'
import { ThemeContext, Theme } from '../styles/theming'

interface ThemedTextProps extends TextProps {
  children: ReactNode
  color?: keyof Theme
}

const ThemedText = (props: ThemedTextProps) => {
  const { theme } = useContext(ThemeContext)

  const styles = StyleSheet.create({
    text: { color: props.color ? theme[props.color] : theme.textColor },
  })

  return (
    <Text {...props} style={[styles.text, props.style]}>
      {props.children}
    </Text>
  )
}

export default ThemedText
