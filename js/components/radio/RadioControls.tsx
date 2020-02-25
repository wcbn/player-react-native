import React, { useContext } from 'react'
import {
  ActivityIndicator,
  View,
  TouchableOpacity,
  StyleSheet
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { dimensions } from '../../styles/main'
import { ThemeContext } from '../../styles/theming'

export default function RadioControls({ disabled, toggleRadio, showPlayBtn }) {
  const { theme } = useContext(ThemeContext)
  let x
  if (disabled) {
    x = <ActivityIndicator size="large" color={theme.textColor} />
  } else if (showPlayBtn) {
    x = (
      <Icon
        name={'md-play'}
        size={60}
        color={theme.textColor}
        style={{ marginLeft: 5 }}
      />
    )
  } else {
    x = <Icon name={'md-square'} size={60} color={theme.textColor} />
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
    flexGrow: 1,
    width: dimensions.fullWidth,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
