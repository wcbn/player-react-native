import React from 'react'
import { StyleSheet, Text, View, Share, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { colors } from '../../styles/main'

export default (ShareLink = props => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        Share.share({
          message: `I'm listening to WCBN-FM Ann Arbor!`
        })
      }
    >
      <Icon name={'md-share'} size={30} color={colors.active} />
      <View style={styles.textContainer}>
        <Text style={styles.text}>Share on social media</Text>
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
    color: colors.inactive
  }
})
