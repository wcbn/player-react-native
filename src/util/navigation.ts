import { spacing } from '../styles/main'
import { Theme } from '../styles/theming'

export const useScreenOptions = (theme: Theme) => {
  return {
    headerStyle: {
      backgroundColor: theme.primary,
      borderBottomWidth: 0,
      elevation: 0,
      shadowOpacity: 0,
    },
    headerHideShadow: true,
    headerTintColor: theme.textColor,

    tabBarStyle: { backgroundColor: theme.primary },
    tabBarIndicatorStyle: {
      backgroundColor: theme.linkColor,
    },
    tabBarActiveTintColor: theme.activeTintColor,
    tabBarInactiveTintColor: theme.inactiveTintColor,
    tabBarInactiveBackgroundColor: theme.primary,
    tabBarActiveBackgroundColor: theme.activeBackgroundColor,
    tabBarItemStyle: { padding: spacing.xs },
  }
}
