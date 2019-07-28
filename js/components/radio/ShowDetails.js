import React from 'react'
import { View, StyleSheet } from 'react-native'
import ThemedText from '../ThemedText'
import { spacing } from '../../styles/main'

export default (ShowDetails = props => {
  return (
    !!props.djName && (
      <View
        style={[styles.showDetailsContainer, { height: props.sectionHeight }]}
      >
        <ThemedText
          numberOfLines={1}
          style={{
            fontSize: Math.min(props.sectionHeight / 2, 23)
          }}
        >
          {props.showName}
        </ThemedText>
        <ThemedText
          color={'secondary'}
          numberOfLines={1}
          style={[
            styles.showDetailsHost,
            { fontSize: Math.min(props.sectionHeight / 5, 20) }
          ]}
        >
          {`with ${props.djName}`}
        </ThemedText>
      </View>
    )
  )
})
const styles = StyleSheet.create({
  //TODO theres a weird bug here if you try paddingTop: x, the background img shifts up
  // probs something to do with flex
  showDetailsContainer: {
    width: '100%',
    maxWidth: '100%',
    flex: 0,
    marginTop: spacing.md
  },
  showDetailsHost: { fontStyle: 'italic' }
})
