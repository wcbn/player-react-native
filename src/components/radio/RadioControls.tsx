import React, { useContext } from 'react'
import {
  ActivityIndicator,
  View,
  TouchableOpacity,
  StyleSheet,
  GestureResponderEvent,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { spacing } from '../../styles/main'
import { ThemeContext } from '../../styles/theming'

const ICON_SIZE = 60

interface RadioControlsProps {
  disabled: boolean
  toggleRadio: (event: GestureResponderEvent) => void
  showPlayBtn: boolean
}

export default function RadioControls({
  disabled,
  toggleRadio,
  showPlayBtn,
}: RadioControlsProps) {
  const { theme } = useContext(ThemeContext)
  let x
  if (disabled) {
    x = <ActivityIndicator size="large" color={theme.textColor} />
  } else if (showPlayBtn) {
    x = (
      <Ionicons
        name={'md-play'}
        size={ICON_SIZE}
        color={theme.textColor}
        style={{ marginLeft: 5 }}
      />
    )
  } else {
    x = <Ionicons name={'md-square'} size={ICON_SIZE} color={theme.textColor} />
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
    margin: spacing.xl,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
})
