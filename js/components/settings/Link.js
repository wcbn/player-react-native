import React from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { useTheme } from '../../styles/theming'
import ThemedText from '../ThemedText'

export default (Link = props => {
  const theme = useTheme()
  return (
    <TouchableOpacity style={styles.container} onPress={props.onPress}>
      <Icon name={props.icon} size={30} color={theme.secondary} style={styles.icon} />
      <View style={styles.textContainer}>
        <ThemedText>{props.text}</ThemedText>
      </View>
    </TouchableOpacity>
  )
})

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 10
  },
  textContainer: {
    flex: 1,
    marginLeft: 20,
    alignItems: 'center',
    flexDirection: 'row'
  },
  icon: {
    minWidth: 25
  }
})
