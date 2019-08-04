import React from 'react'
import { BottomTabBar } from 'react-navigation-tabs'
import { useTheme } from '../../styles/theming'

export default (TabBarComponent = props => {
  const theme = useTheme()

  return (
    <BottomTabBar
      {...props}
      activeTintColor={theme.activeTintColor}
      inactiveTintColor={theme.inactiveTintColor}
      inactiveBackgroundColor={theme.primary}
      activeBackgroundColor={theme.activeBackgroundColor}
      safeAreaInset={{ bottom: 'never', top: 'never' }}
    />
  )
})
