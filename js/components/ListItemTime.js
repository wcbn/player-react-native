import React from 'react'
import ThemedText from './ThemedText'
import { StyleSheet } from 'react-native'

export default (ListItemTime = props => (
  <ThemedText style={styles.time} color={'accent'}>
    {props.at}
  </ThemedText>
))

const styles = StyleSheet.create({
  time: {
    fontSize: 11,
    marginRight: -10,
    marginTop: -5
  }
})
