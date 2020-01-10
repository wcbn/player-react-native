import React from 'react'
import { View, ActivityIndicator } from 'react-native'
import { useTheme } from '../../styles/theming'

export default function LazyPlaceholder() {
  const theme = useTheme()
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <ActivityIndicator size="large" color={theme.textColor} />
    </View>
  )
}
