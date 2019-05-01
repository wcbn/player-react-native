import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { listStyles } from '../styles/components'
import { colors } from '../styles/main'

const Artist = props => <Text style={styles.artist}>{props.artist}</Text>

const SongName = props => (
  <Text style={styles.name}>
    {props.name}
    {'\n'}
  </Text>
)

// const Album = props => (
//   <Text style={styles.album}>
//     {props.album}
//     {'\n'}
//   </Text>
// )

// const Label = props =>
//   props.label && props.year ? (
//     <Text style={styles.label}>
//       {props.label} ({props.year})
//     </Text>
//   ) : null

const Time = props => <Text style={styles.time}>{props.at}</Text>

export default (Song = props => (
  <View style={listStyles.item}>
    <Text style={styles.songText}>
      <SongName name={props.data.name} />
      <Artist artist={props.data.artist} />

      {/* <Album album={props.data.album} />
      <Label label={props.data.label} year={props.data.year} /> */}
    </Text>
    <Time at={props.data.at} />
  </View>
))

const styles = StyleSheet.create({
  songText: {
    maxWidth: '85%',
    color: colors.inactive
  },
  name: {
    fontWeight: 'bold',
    fontSize: 15,
    lineHeight: 27
  },
  artist: {
    fontSize: 13
  },
  label: {
    fontSize: 13
  },
  album: {
    fontStyle: 'italic',
    fontSize: 13
  },
  time: {
    fontSize: 11,
    color: colors.lightGreen,
    marginRight: -10,
    marginTop: -5
  }
})
