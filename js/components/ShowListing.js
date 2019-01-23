import React from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'
import { windowStyles, listStyles } from '../styles/components'
import { colors } from '../styles/main'


export default class ShowListing extends React.PureComponent {
  render() {
    return (
      <View style={windowStyles.container}>
        <View style={{ ...listStyles.item, ...styles.listItem }}>
          <Text style={{color: colors.inactive}}>{this.props.data.name}</Text>
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
  }
})
