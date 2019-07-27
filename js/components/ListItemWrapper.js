import React from 'react'
import { View, StyleSheet } from 'react-native'

export default (ListItemWrapper = props => {
  return <View style={ListItemWrapperStyles.view}>{props.children}</View>
})

export const ListItemWrapperStyles = StyleSheet.create({
  view: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    marginLeft: 5,
    marginRight: 5,
    fontSize: 22
  }
})
