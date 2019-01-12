import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { windowStyles, headerStyles } from './styles/components';

export default class Favorites extends React.Component {
  static navigationOptions = {
    title: 'Favorites',
    ...headerStyles
  }

  render() {
    return (
      <View style={windowStyles.container}>
        <Text>List of favorites coming soon!</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  
})
