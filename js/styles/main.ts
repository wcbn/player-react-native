import { Dimensions } from 'react-native'

export const dimensions = {
  fullHeight: Dimensions.get('window').height,
  fullWidth: Dimensions.get('window').width
}

// padding, margin etc
export const spacing = {
  xs: 5,
  sm: 10,
  md: 15,
  lg: 30,
  xl: 40
}

// weird idea I had
// export const colorClass = classname =>
//   StyleSheet.create({
//     classname: {
//       colors[classname]
//     }
//   })

//TODO should probably do something like this
// export const padding = {
//   sm: 10,
//   md: 20,
//   lg: 30,
//   xl: 40
// }

//TODO and this
// export const fonts = {
//   sm: 12,
//   md: 18,
//   lg: 28,
//   primary: 'Cochin'
// }
