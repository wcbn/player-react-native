export const useScreenOptions = (theme) => {
  return {
    headerStyle: {
      backgroundColor: theme.primary,
      borderBottomWidth: 0,
      elevation: 0,
      shadowOpacity: 0,
    },
    headerHideShadow: true,
    headerTintColor: theme.textColor,
  }
}
