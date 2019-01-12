import React from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'
import { windowStyles, listStyles } from '../styles/components'
import { colors } from '../styles/main'

function Label(props) {
  if (props.label && props.year) {
    return (
      <Text style={styles.label}>
        {props.label} ({props.year})
      </Text>
    )
  }
  else return <Text />
}

export default class Song extends React.PureComponent {

  render() {
    return (
      <View style={windowStyles.container}>
        <View style={{ ...listStyles.item, ...styles.listItem }}>
          <Text style={styles.songInfo}>
            <Text style={styles.artist}>{this.props.data.artist}: </Text>
            <Text style={styles.name}>
              “{this.props.data.name}”{'\n'}
            </Text>
            <Text style={styles.label}>{this.props.label}</Text>
            <Label label={this.props.data.label} year={this.props.data.year} />
          </Text>

          <Text style={styles.time}>{this.props.data.at}</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  listItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  songInfo: {
    flexWrap: 'wrap',
    maxWidth: '85%',
    color: colors.inactive
  },
  artist: {
    fontWeight: 'bold'
  },
  label: {
    fontStyle: 'italic',
    fontSize: 13
  },
  time: {
    fontSize: 10,
    color: colors.lightGreen,
    marginRight: -10,
    marginTop: -5
  }
})
