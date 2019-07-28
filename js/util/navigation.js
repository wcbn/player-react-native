export const getDefaultNavigationOptions = theme => {
  return {
    headerStyle: {
      elevation: 0,
      backgroundColor: theme.primary,
      borderBottomColor: 'transparent'
    },
    // headerTitleStyle: { fontFamily: 'Futura' },
    headerTintColor: theme.textColor,
    // headerBackTitleStyle: {
    //   fontFamily: 'Futura'
    // }
  }
}
