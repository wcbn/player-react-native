import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { colors, dimensions } from '../styles/main'
import Icon from 'react-native-vector-icons/Ionicons'
import { useTheme } from '../styles/theming'
import ThemedText from './ThemedText';

export default (Banner = props => {
  const theme = useTheme()

  return (
    <TouchableOpacity style={styles.view} onPress={props.onPress}>
      <ThemedText>{`${props.text} `}</ThemedText>
      <Text style={[styles.host, {color: theme.secondary}]} numberOfLines={1}>
        {props.host}
      </Text>
      <Icon
        style={styles.icon}
        name={'md-arrow-forward'}
        size={12}
        color={theme.accent}
      />
    </TouchableOpacity>
  )
})

const styles = StyleSheet.create({
  view: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  host: {
    fontFamily: 'Futura',
    maxWidth: dimensions.fullWidth / 1.75
  },
  icon: {
    marginLeft: 5
  }
})
