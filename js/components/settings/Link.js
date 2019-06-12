import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { colors } from '../../styles/main'

export default (Link = props => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={props.onPress}
    >
      <Icon name={props.icon} size={30} color={colors.active} />
      <View style={styles.textContainer}>
        <Text style={styles.text}>{props.text}</Text>
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
  text: {
    color: colors.inactive
  }
})
