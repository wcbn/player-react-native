import React, { ReactNode } from 'react'
import { View, StyleSheet } from 'react-native'
import { spacing } from '../styles/main'

const ListItemWrapper = (props: {children: ReactNode}) => {
  return <View style={ListItemWrapperStyles.view}>{props.children}</View>
}

export default ListItemWrapper

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
