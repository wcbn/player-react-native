import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { colors } from '../styles/main'

export default (ListHeader = props => (
  <View style={styles.container}>
    <Text style={styles.text}>{props.text}</Text>
  </View>
))

const styles = StyleSheet.create({
  container: {
    paddingLeft: 10,
    padding: 4,
    backgroundColor: colors.grayHighlight,
    color: colors.inactive,
    justifyContent: 'center'
  },

  text: {
    fontWeight: 'bold',
    color: colors.inactive
  }
})
