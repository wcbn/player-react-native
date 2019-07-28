import React from 'react'
import { View, StyleSheet } from 'react-native'
import ThemedText from '../ThemedText'
import { spacing } from '../../styles/main'
import ScrollingText from './ScrollingText'

export default (SongDetails = props => {
  let x = props.song || {
    name: '',
    artist: '',
    album: '',
    label: '',
    year: ''
  }

  //NOTE: TEST HARDCODED SONG HERE
  // x = {
  //   name: "Magician's Success",
  //   artist: 'Vanishing Twin',
  //   album: 'The Age Of Immunology',
  //   label: 'Fire',
  //   year: '2019'
  // }

  return (
    <View style={[styles.songDetails, { height: props.sectionHeight }]}>
      <ScrollingText
        text={x.name || '—'}
        lineHeight={props.sectionHeight / 2}
      />
      <ScrollingText
        text={
          `${x.artist}${x.artist && x.album && ' — '}${x.album}${x.label &&
            x.year &&
            ' (' + x.label + ', ' + x.year + ')'}` || '—'
        }
        lineHeight={props.sectionHeight / 2}
      />
    </View>
  )
})

const styles = StyleSheet.create({
  songDetails: {
    flex: 0,
    alignItems: 'center',
    width: '100%',
    maxWidth: '100%',
    margin: spacing.sm
  }
})
