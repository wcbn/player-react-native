import React, { useContext, useState } from 'react'
import {
  ActivityIndicator,
  View,
  TouchableOpacity,
  StyleSheet,
  TouchableOpacityProps,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useTrackPlayerEvents, Event, State } from 'react-native-track-player'
import { spacing } from '../../styles/main'
import { ThemeContext } from '../../styles/theming'

const ICON_SIZE = 60

export default function RadioControls(props: TouchableOpacityProps) {
  const { theme } = useContext(ThemeContext)
  const [playerState, setPlayerState] = useState(State.None)
  let x

  useTrackPlayerEvents([Event.PlaybackState], (event) =>
    setPlayerState(event.state)
  )

  const waiting = [
    State.Buffering, // buffering in play mode
    State.Connecting, // buffering in pause state
    State.Ready,
  ].includes(playerState)

  if (playerState === State.Playing) {
    x = <Ionicons name={'md-square'} size={ICON_SIZE} color={theme.textColor} />
  } else if (waiting) {
    x = <ActivityIndicator size="large" color={theme.textColor} />
  } else {
    x = (
      <Ionicons
        name={'md-play'}
        size={ICON_SIZE}
        color={theme.textColor}
        style={{ marginLeft: 5 }}
      />
    )
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity disabled={waiting} {...props}>
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
