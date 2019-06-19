import { StyleSheet } from 'react-native'
import { colors } from './main'

export const windowStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary
  }
})

export const headerStyles = {
  headerStyle: {
    backgroundColor: colors.stackNav.backgroundColor
  },
  headerTintColor: colors.stackNav.headerTintColor
}

export const listStyles = StyleSheet.create({
  item: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    marginLeft: 5,
    marginRight: 5,
    fontSize: 22
  }
})

