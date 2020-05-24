import React from 'react'
import { StyleSheet } from 'react-native'
import ThemedText from '../ThemedText'
import { spacing } from '../../styles/main'

const ShowDescription = (props: { text: string }) => {
  const styles = StyleSheet.create({
    text: {
      padding: spacing.md,
      fontStyle: 'italic',
    },
  })

  return (
    <>
      {!!props.text && (
        <ThemedText style={styles.text} numberOfLines={6}>
          {props.text}
        </ThemedText>
      )}
    </>
  )
}

export default ShowDescription
