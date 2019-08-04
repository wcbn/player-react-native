export const getDefaultNavigationOptions = theme => {
  return {
    headerStyle: {
      elevation: 0,
      backgroundColor: theme.primary,
      borderBottomColor: 'transparent'
    },
    headerTintColor: theme.textColor
  }
}
