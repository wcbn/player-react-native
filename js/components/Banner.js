import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { colors, dimensions } from '../styles/main'
import Icon from 'react-native-vector-icons/Ionicons'

export default (Banner = props => (
  <TouchableOpacity style={styles.view} onPress={props.onPress}>
    <Text style={styles.text}>{`${props.text} `}</Text>
    <Text style={styles.host} numberOfLines={1}>{props.host}</Text>
    <Icon
      style={styles.icon}
      name={'md-arrow-forward'}
      size={12}
      color={colors.lightGreen}
    />
  </TouchableOpacity>
))

const styles = StyleSheet.create({
  view: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: colors.inactive
  },
  host: {
    color: colors.active,
    maxWidth: dimensions.fullWidth / 1.75
  },
  icon: {
    marginLeft: 5
  }
})
