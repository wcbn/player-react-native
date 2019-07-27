export const getDefaultNavigationOptions = theme => {
  return {
    headerStyle: {
      elevation: 0,
      backgroundColor: theme.primary,
      borderBottomColor: 'transparent'
    },
    // headerTitleStyle: { fontFamily: 'Futura' },
    headerTintColor: theme.textColor,
    tabBarOptions: {
      activeTintColor: theme.active,
      inactiveTintColor: theme.textColor,
      inactiveBackgroundColor: theme.primary,
      activeBackgroundColor: theme.highlight
    },
    headerBackTitleStyle: {
      fontFamily: 'Futura'
    }
  }
}
