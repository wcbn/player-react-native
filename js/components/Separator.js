import { StyleSheet, View } from 'react-native'
import React from 'react'

export default (Separator = props => (
  <View
    style={{
      height: StyleSheet.hairlineWidth,
      backgroundColor: props.color
    }}
  />
))
