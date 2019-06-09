import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { colors } from '../styles/main'
import Icon from 'react-native-vector-icons/Ionicons'

export default (Banner = props => (
  <TouchableOpacity style={styles} onPress={props.onPress}>
    <Text style={styles.text}>{`${props.text} `}</Text>
    <Text style={styles.host}>{`${props.host} `}</Text>
    <Text style={styles.arrow}>
      <Icon name={'md-arrow-forward'} size={14} color={colors.lightGreen} />
    </Text>
  </TouchableOpacity>
))

const styles = {
  height: 50,
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  // borderBottomColor: colors.inactive,
  // borderBottomWidth: StyleSheet.hairlineWidth,
  text: {
    color: colors.inactive
  },
  host: {
    color: colors.active
  },
  arrow: {
    color: colors.lightGreen
  }
}
