import React from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { useTheme } from '../styles/theming'
import ThemedText from './ThemedText';

export default (Banner = props => {
  const theme = useTheme()

  return (
    <TouchableOpacity style={styles.view} onPress={props.onPress}>
      <ThemedText>{`${props.text} `}</ThemedText>
      <ThemedText style={styles.host} color={'secondary'} numberOfLines={1}>
        {props.host}
      </ThemedText>
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
    maxWidth: '50%'
  },
  icon: {
    marginLeft: 5
  }
})
