import React from 'react'

export interface Theme {
  name: keyof Themes
  opposite: keyof Themes
  primary: string
  secondary: string
  textColor: string
  accent: string
  muted: string
  listHeaderBackground: string
  listHeaderText: string
  primaryOrSecondary: string
  activeTintColor: string
  inactiveTintColor: string
  activeBackgroundColor: string
  anchorColor: string
  onAirBackgroundColor: string
}

export interface Themes {
  light: Theme
  dark: Theme
}

export const themes: Themes = {
  light: {
    name: 'light',
    opposite: 'dark',
    primary: 'white',
    secondary: 'black',
    textColor: 'black',
    accent: 'black',
    muted: 'black',
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
