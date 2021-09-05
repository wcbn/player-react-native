import React, { useContext } from 'react'
import { StyleSheet, useWindowDimensions } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { ThemeContext } from '../../styles/theming'

export default function FadeIntoHeader() {
  const { theme } = useContext(ThemeContext)
  const { width } = useWindowDimensions()
  const styles = StyleSheet.create({
    lg: {
      position: 'absolute',
      width,
      height: '100%',
      top: 0,
      left: 0,
    },
  })

  return (
    <LinearGradient colors={[theme.primary, 'transparent']} style={styles.lg} />
  )
}
