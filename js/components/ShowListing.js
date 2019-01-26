import React from 'react'
import { Text, View } from 'react-native'
import { listStyles } from '../styles/components'
import { colors } from '../styles/main'

export default (ShowListing = props => (
  <View style={listStyles.item}>
    <Text style={{ color: colors.inactive }}>{props.data.name}</Text>
  </View>
))
