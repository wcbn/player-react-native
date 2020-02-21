import React, { useState, useEffect } from 'react'
import { StatusBar, AsyncStorage, StatusBarStyle } from 'react-native'
import { ThemeProvider, themes } from './styles/theming'
import OnAirPoll from './components/OnAirPoll'
import { AppContainer } from './components/navigation'

// TODO remove this
// create an UnvirtualizedList component
// migrate flux to redux pub/sub
console.disableYellowBox = true

export default function App() {
  const [theme, setTheme] = useState(themes.dark)

  useEffect(() => {
    async function doAsync() {
      const themeName = (await AsyncStorage.getItem('THEME')) || 'dark'
      setTheme(themes[themeName])
    }
    doAsync()
  }, [])

  const handleThemeChange = () => {
    const themeName = theme.opposite
    setTheme(themes[themeName])
    AsyncStorage.setItem('THEME', themeName)
  }

  var barStyle: StatusBarStyle =
    theme.opposite === 'light' ? `light-content` : 'dark-content'

  return (
    <ThemeProvider theme={theme}>
      <StatusBar barStyle={barStyle} />
      <OnAirPoll />
      <AppContainer screenProps={{ handleThemeChange, theme }} />
    </ThemeProvider>
  )
}
