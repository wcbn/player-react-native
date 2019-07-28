import React from 'react'
import { TouchableOpacity, StyleSheet, Linking } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import ThemedText from '../ThemedText'
import { useTheme } from '../../styles/theming'

export default (Colophon = props => {
  const theme = useTheme()

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        Linking.openURL('https://github.com/wcbn/player-react-native')
      }
    >
      <ThemedText style={styles.text}>
        {'Made with '}
        <Icon name={'md-heart-empty'} size={12} color={theme.secondary} />
        {' by students at the University of Michigan'}
      </ThemedText>
    </TouchableOpacity>
  )
})

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    textAlign: 'center'
  }
})
