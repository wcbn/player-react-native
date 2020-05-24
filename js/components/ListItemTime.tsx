import React from 'react'
import ThemedText from './ThemedText'
import { StyleSheet } from 'react-native'

const ListItemTime = (props: { at: string }) => (
  <ThemedText style={styles.time} color={'accent'}>
    {props.at}
  </ThemedText>
)

const styles = StyleSheet.create({
  time: {
    fontSize: 11,
    marginRight: -10,
    marginTop: -5,
  },
})

export default ListItemTime
