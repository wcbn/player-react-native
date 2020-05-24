import React from 'react'
import { Image, View, StyleSheet, Linking } from 'react-native'
import ThemedText from '../ThemedText'
import { spacing } from '../../styles/main'
import LazyPlaceholder from '../LazyPlaceholder'

interface DjCoverProps {
  image_url: string
  dj_name: string
  real_name?: string
  website: string
  public_email: string
}

export default function DjCover(props: DjCoverProps) {
  return (
    <View style={styles.cover}>
      {props.image_url.length > 0 ? (
        <Image style={styles.coverAvatar} source={{ uri: props.image_url }} />
      ) : (
        <View style={styles.spinnerContainer}>
          <LazyPlaceholder />
        </View>
      )}

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
}

const styles = StyleSheet.create({
  cover: {
    flexDirection: 'row',
    marginBottom: spacing.md,
  },
  coverAvatar: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: 10,
  },
  coverContact: {
    flexDirection: 'column',
    paddingLeft: spacing.md,
    flex: 3.5,
  },
  coverText: {
    lineHeight: 20,
  },
  coverRealName: {
    fontSize: 20,
  },
  spinnerContainer: {
    height: 75,
    width: 75,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
