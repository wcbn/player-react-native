import React from 'react'
import { StyleSheet, TouchableOpacity, Linking } from 'react-native'
import ThemedText from '../ThemedText'
import { spacing } from '../../styles/main'

function ShowDescription(props: { text: string; website: string }) {
  return (
    <>
      {!!props.text && (
        <ThemedText style={styles.text} numberOfLines={6}>
          {props.text}
        </ThemedText>
      )}
      {!!props.website && (
        <TouchableOpacity onPress={() => Linking.openURL(props.website)}>
          <ThemedText style={styles.web} numberOfLines={1} color="linkColor">
            {props.website}
          </ThemedText>
        </TouchableOpacity>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  text: {
    padding: spacing.md,
    fontStyle: 'italic',
  },
  web: {
    padding: spacing.md,
    fontStyle: 'italic',
  },
})

export default ShowDescription
