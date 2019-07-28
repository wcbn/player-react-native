import React from 'react'
import { View, StyleSheet } from 'react-native'
import { spacing } from '../styles/main'

export default (ListItemWrapper = props => {
  return <View style={ListItemWrapperStyles.view}>{props.children}</View>
})

export const ListItemWrapperStyles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: spacing.md,
    paddingRight: spacing.md,
    paddingTop: spacing.sm,
    paddingBottom: spacing.sm,
    fontSize: 22
  }
})
