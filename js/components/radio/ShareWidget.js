import React from 'react'
import { StyleSheet, Text, View, Share } from 'react-native'
import { SMS } from 'expo'
import Icon from 'react-native-vector-icons/Ionicons'
import { colors } from '../../styles/main'

export default (ShareWidget = props => {
  return (
    <View style={styles.test}>
      <Icon
        name={'ios-share'}
        size={37}
        color={colors.active}
        style={styles.icon}
        onPress={() =>
          Share.share({
            message: `I'm listening to WCBN-FM Ann Arbor!`
          })
        }
      />
    </View>
  )
})

const styles = StyleSheet.create({
  test: {
    width: 30,
    height: 30,
    // backgroundColor: 'yellow',
    padding: 30,
    position: 'absolute',
    bottom: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    position: 'absolute'
  }
})
