import React from 'react'
import { Text, TouchableOpacity, StyleSheet, Linking } from 'react-native'
import { colors } from '../../styles/main'
import Icon from 'react-native-vector-icons/Ionicons'

export default (Colophon = props => (
  <TouchableOpacity
    style={styles.container}
    onPress={() =>
      Linking.openURL('https://github.com/wcbn/player-react-native')
    }
  >
    <Text style={styles.text}>
      {'Made with '}
      <Icon name={'md-heart-empty'} size={12} color={colors.active} />
      {' by students at the University of Michigan'}
    </Text>
  </TouchableOpacity>
))

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    color: colors.active,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  },

  text: {
    textAlign: 'center',
    color: colors.inactive
  }
})
