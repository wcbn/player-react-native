import { createTheming } from '@callstack/react-theme-provider'

export const themes = {
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
    anchorColor: '#db3334'
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
    anchorColor: '#5ccfe6'
    // purple: '#a068ce',
    // red: '#f44336',
  }
}

export const { ThemeProvider, withTheme, useTheme } = createTheming(themes.dark)
