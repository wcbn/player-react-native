import React from 'react'
import { StyleSheet, Text, View, Linking, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { colors } from '../../styles/main'

export default (Review = props => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => Linking.openURL('https://google.com/')} //TODO replace with link to app store
    >
      <Icon name={'md-thumbs-up'} size={30} color={colors.active} />
      <View style={styles.textContainer}>
        <Text style={styles.text}>Write a review!</Text>
      </View>
    </TouchableOpacity>
  )
})

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 10
  },
  textContainer: {
    flex: 1,
    marginLeft: 20,
    alignItems: 'center',
    flexDirection: 'row'
  },
  text: {
    color: colors.active
  }
})
