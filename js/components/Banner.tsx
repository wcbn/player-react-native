import React, { useContext } from 'react'
import {
  TouchableOpacity,
  StyleSheet,
  GestureResponderEvent
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import ThemedText from './ThemedText'
import { ThemeContext } from '../styles/theming'

interface BannerProps {
  onPress: (event: GestureResponderEvent) => void
  text: string
  host: string
  disabled?: boolean
}

const Banner = (props: BannerProps) => {
  const { theme } = useContext(ThemeContext)

  return (
    <TouchableOpacity
      disabled={props.disabled}
      style={styles.view}
      onPress={props.onPress}
    >
      <ThemedText style={styles.text}>{`${props.text} `}</ThemedText>
      <ThemedText
        style={[styles.host, styles.text]}
        color={'secondary'}
        numberOfLines={1}
      >
        {props.host}
      </ThemedText>
      <Icon
        style={styles.icon}
        name={'md-arrow-forward'}
        size={16}
        color={theme.accent}
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  view: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 16
  },
  host: {
    maxWidth: '50%'
  },
  icon: {
    marginLeft: 5
  }
})

export default Banner

//NOTE could sandwich between two <Separator /> components but looked congested to me
