import { StyleSheet, Dimensions } from 'react-native'

export const dimensions = {
  fullHeight: Dimensions.get('window').height,
  fullWidth: Dimensions.get('window').width
}

export const colors = {
  primary: '#212733',
  active: '#5ccfe6',
  inactive: '#D3D7CE',
  highlight: '#053e62',
  accent: '#ffae57',
  grayHighlight: '#2d333f',
  lightGreen: '#bae67e',
  purple: '#a068ce',
  red: '#f44336',
  darkPink: 'rgb(217,84,89)',
  pink: 'rgb(255, 183, 188)',

  stackNav: {
    backgroundColor: '#242b38',
    headerTintColor: '#d3d7ce'
  }
}

//TODO should probably do something like this
// export const padding = {
//   sm: 10,
//   md: 20,
//   lg: 30,
//   xl: 40
// }

// export const fonts = {
//   sm: 12,
//   md: 18,
//   lg: 28,
//   primary: 'Cochin'
// }

