import React, { useContext } from 'react'
import { View, ActivityIndicator } from 'react-native'
import { ThemeContext } from '../styles/theming'

export default function LazyPlaceholder() {
  const { theme } = useContext(ThemeContext)
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.primary,
      }}
    >
      <ActivityIndicator size="large" color={theme.textColor} />
    </View>
  )
}
