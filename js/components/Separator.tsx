import { StyleSheet, View } from 'react-native'
import React from 'react'

const Separator = (props: { color?: string }) => (
  <View
    style={{
      height: StyleSheet.hairlineWidth,
      backgroundColor: props.color
    }}
  />
)

export default Separator
