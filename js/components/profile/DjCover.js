import React from 'react'
import { Image, View, StyleSheet, Linking } from 'react-native'
import ThemedText from '../ThemedText'
import { spacing } from '../../styles/main'

export default (DjCover = props => {
  return (
    <View style={styles.cover}>
      <Image style={styles.coverAvatar} source={{ uri: props.image_url }} />
      <View style={styles.coverContact}>
        {!!props.real_name && (
          <ThemedText
            color={'secondary'}
            style={styles.coverRealName}
            numberOfLines={1}
          >
            {props.real_name}
          </ThemedText>
        )}

        {!!props.website && (
          <ThemedText
            color={'anchorColor'}
            style={styles.coverText}
            numberOfLines={1}
            onPress={() => {
              Linking.openURL(props.website)
            }}
          >
            {props.website}
          </ThemedText>
        )}

        {!!props.public_email && (
          <ThemedText
            color={'anchorColor'}
            style={styles.coverText}
            numberOfLines={1}
            onPress={() => {
              Linking.openURL(`mailto:${props.public_email}`)
            }}
          >
            {props.public_email}
          </ThemedText>
        )}
      </View>
    </View>
  )
})

const styles = StyleSheet.create({
  cover: {
    flexDirection: 'row',
    marginBottom: spacing.md
  },
  coverAvatar: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: 10
  },
  coverContact: {
    flexDirection: 'column',
    paddingLeft: spacing.md,
    flex: 3.5
  },
  coverText: {
    lineHeight: 20
  },
  coverRealName: {
    fontSize: 20
  }
})
