import React from 'react'
import { useTheme } from '../../styles/theming'
import { MaterialTopTabBar } from 'react-navigation-tabs'
import { MaterialTabBarProps } from 'react-navigation-tabs/lib/typescript/src/types'

export default function MaterialTopTabBarWrapper(props: MaterialTabBarProps) {
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
