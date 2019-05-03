import React from 'react'
import { Text, View } from 'react-native'
import { listStyles } from '../styles/components'

export default (ListHeader = props => (
  <View style={listStyles.sectionHeader}>
    <Text style={listStyles.sectionHeaderText}>{props.text}</Text>
  </View>
))
