import React, { useContext } from 'react'
import {
  ActivityIndicator,
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { spacing } from '../../styles/main'
import { ThemeContext } from '../../styles/theming'

const ICON_SIZE = 60

export default function RadioControls({ disabled, toggleRadio, showPlayBtn }) {
  const { theme } = useContext(ThemeContext)
  let x
  if (disabled) {
    x = <ActivityIndicator size="large" color={theme.textColor} />
  } else if (showPlayBtn) {
    x = (
      <Icon
        name={'md-play'}
        size={ICON_SIZE}
        color={theme.textColor}
        style={{ marginLeft: 5 }}
      />
    )
  } else {
    x = <Icon name={'md-square'} size={ICON_SIZE} color={theme.textColor} />
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleRadio} disabled={disabled}>
        {x}
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    minHeight: ICON_SIZE + 15,
    margin: spacing.md,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
})
