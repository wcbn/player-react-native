import React from 'react'
import { StyleSheet, View } from 'react-native'
import ThemedText from './ThemedText'
import ListItemTime from './ListItemTime'
import ListItemWrapper from './ListItemWrapper'
import { SongAPI } from '../types'

const SongName = (props: { name: string }) => (
  <ThemedText style={styles.songName} numberOfLines={1}>
    {props.name}
  </ThemedText>
)

const SongDetails = (props: { artist: string; album: string }) => (
  <ThemedText style={styles.songDetails} numberOfLines={1}>
    {`${props.artist}${props.artist && props.album && ' • '}${props.album}`}
  </ThemedText>
)

const Song = (props: { data: SongAPI }) => (
  <ListItemWrapper>
    <View style={styles.textWrapper}>
      <SongName name={props.data.name} />
      <SongDetails
        artist={props.data.artist}
        album={props.data.album}
        // label={props.data.label}
        // year={props.data.year}
      />
    </View>
    <ListItemTime at={props.data.at} />
  </ListItemWrapper>
)

const styles = StyleSheet.create({
  textWrapper: {
    maxWidth: '85%',
  },
  songName: {
    fontWeight: '600',
    fontSize: 15,
    marginBottom: 3,
  },
  songDetails: {
    fontWeight: '300',
    fontSize: 13,
  },
})

export default Song
