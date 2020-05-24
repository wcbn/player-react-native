import React from 'react'

interface Theme {
  name: string
  opposite: string
  primary: string
  secondary: string
  textColor: string
  accent: string
  muted: string
  blackOrNull: string
  listHeaderBackground: string
  listHeaderText: string
  primaryOrSecondary: string
  activeTintColor: string
  inactiveTintColor: string
  activeBackgroundColor: string
  anchorColor: string
  onAirBackgroundColor: string
}

export const themes: { light: Theme; dark: Theme } = {
  light: {
    name: 'light',
    opposite: 'dark',
    primary: 'white',
    secondary: 'black',
    textColor: 'black',
    accent: 'black',
    muted: 'black',
    blackOrNull: 'black',
    listHeaderBackground: 'black',
    listHeaderText: 'white',
    primaryOrSecondary: 'white',
    activeTintColor: 'white',
    inactiveTintColor: 'black',
    activeBackgroundColor: 'black',
    anchorColor: '#db3334',
    onAirBackgroundColor: '#ffe5e5',
  },
  dark: {
    name: 'dark',
    opposite: 'light',
    primary: '#212733',
    secondary: '#5ccfe6',
    textColor: '#D3D7CE',
    accent: '#bae67e',
    muted: '#2d333f',
    blackOrNull: null,
    listHeaderBackground: '#2d333f',
    listHeaderText: '#D3D7CE',
    primaryOrSecondary: '#5ccfe6',
    activeTintColor: '#5ccfe6',
    inactiveTintColor: '#D3D7CE',
    activeBackgroundColor: '#053e62',
    anchorColor: '#5ccfe6',
    onAirBackgroundColor: '#053e62',
  },
}

// purple: '#a068ce',
// red: '#f44336',

export const ThemeContext = React.createContext({
  theme: themes.light,
  toggleTheme: () => {},
})
