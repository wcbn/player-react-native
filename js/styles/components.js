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

export const bannerStyles = {
  height: 50,
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  // borderBottomColor: colors.inactive,
  // borderBottomWidth: StyleSheet.hairlineWidth,
  text: {
    color: colors.inactive
  },
  host: {
    color: colors.active
  },
  arrow: {
    color: colors.lightGreen
  }
}

export const basicInfoBoxStyles = {
  height: 50,
  justifyContent: 'center',
  alignItems: 'center'
}

export const episodeStyles = {
  listing: {
    date: {
      color: colors.inactive,
      lineHeight: 22
    },
    numSongs: {
      color: colors.lightGreen,
      lineHeight: 22
    }
  }
}
