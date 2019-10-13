import React from 'react'
import { useTheme } from '../../styles/theming'
import { MaterialTopTabBar } from 'react-navigation-tabs'

export default MaterialTopTabBarWrapper = props => {
  const theme = useTheme()
  return (
    <MaterialTopTabBar
      {...props}
      style={{ backgroundColor: theme.primary }}
      activeTintColor={theme.secondary}
      inactiveTintColor={theme.textColor}
      indicatorStyle={{ backgroundColor: theme.anchorColor }}
      pressColor={theme.primary}
    />
  )
}
