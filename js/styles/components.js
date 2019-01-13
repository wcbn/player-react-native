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
  sectionHeader: {
    height: 22,
    paddingLeft: 10,
    backgroundColor: colors.grayHighlight,
    color: colors.inactive
  },

  sectionHeaderText: {
    fontWeight: 'bold',
    color: colors.inactive,
    lineHeight: 22
  },

  item: {
    padding: 10,
    marginLeft: 5,
    marginRight: 5
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
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center'
}

export const episodeStyles = {
  listing: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
