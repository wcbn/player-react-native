import React from 'react'
import { StyleSheet } from 'react-native'
import ThemedText from '../ThemedText'
import { spacing } from '../../styles/main'

export default (ShowDescription = props => {
  const styles = StyleSheet.create({
    text: {
      padding: spacing.md,
      fontStyle: 'italic'
    }
  })

  return (
    !!props.text && (
      <ThemedText style={styles.text} numberOfLines={6}>
        {props.text}
      </ThemedText>
    )
  )
})
