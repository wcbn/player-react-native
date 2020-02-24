import React, {useContext} from 'react'
import { ThemeContext } from '../../styles/theming'
import {
  MaterialTopTabBar,
  MaterialTopTabBarProps
} from '@react-navigation/material-top-tabs'

export default function MaterialTopTabBarWrapper(
  props: MaterialTopTabBarProps
) {
  const { theme } = useContext(ThemeContext);
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
