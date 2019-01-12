import { StyleSheet, View } from 'react-native'
import React from 'react'

export default class Separator extends React.PureComponent {
  render() {
    return (
      <View
        style={{
          height: StyleSheet.hairlineWidth,
          backgroundColor: this.props.color
        }}
      />
    )
  }
}
