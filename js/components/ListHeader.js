import React from 'react'
import { View, StyleSheet } from 'react-native'
import ThemedText from './ThemedText'
import { useTheme } from '../styles/theming'

export default (ListHeader = props => {
  const theme = useTheme()

  return (
    <View style={[{ backgroundColor: theme.listHeaderBackground}, styles.container]}>
      <ThemedText style={styles.text} color={'listHeaderText'}>{props.text}</ThemedText>
    </View>
  )
})

const styles = StyleSheet.create({
  container: {
    paddingLeft: 10,
    padding: 4,
    justifyContent: 'center'
  },
  text: {
    fontWeight: 'bold'
  }
})
