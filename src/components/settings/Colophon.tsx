import React, { useContext } from 'react'
import { TouchableOpacity, StyleSheet, Linking } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import ThemedText from '../ThemedText'
import { ThemeContext } from '../../styles/theming'
import { GITHUB_URL } from '../../config'

export default function Colophon() {
  const { theme } = useContext(ThemeContext)

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => Linking.openURL(GITHUB_URL)}
    >
      <ThemedText style={styles.text}>
        {'Made with '}
        <Ionicons name={'md-heart-empty'} size={12} color={theme.secondary} />
        {' by students at the University of Michigan'}
      </ThemedText>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
  },
})
