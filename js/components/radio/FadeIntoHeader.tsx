import React, { useContext } from 'react'
import { StyleSheet } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { dimensions } from '../../styles/main'
import { ThemeContext } from '../../styles/theming'

export default function FadeIntoHeader() {
  const { theme } = useContext(ThemeContext)
  return (
    <LinearGradient colors={[theme.primary, 'transparent']} style={styles.lg} />
  )
}

const styles = StyleSheet.create({
  lg: {
    position: 'absolute',
    width: dimensions.fullWidth,
    height: '100%',
    top: 0,
    left: 0,
  },
})
