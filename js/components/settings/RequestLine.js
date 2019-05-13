import React from 'react'
import { StyleSheet, Text, View, Linking, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { colors } from '../../styles/main'

export default (Review = props => (
  <TouchableOpacity
    style={styles.container}
    onPress={() => Linking.openURL(`tel:17347633500`)}
  >
    <Icon name={'md-call'} size={30} color={colors.active} />
    <View style={styles.textContainer}>
      <Text style={styles.text}>Studio Request Line{'\n'}(734) 763-3500</Text>
    </View>
  </TouchableOpacity>
))

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
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
