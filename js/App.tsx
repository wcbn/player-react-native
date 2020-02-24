import React, { useState, useEffect } from 'react'
import { StatusBar, AsyncStorage, StatusBarStyle } from 'react-native'
import { ThemeContext, themes } from './styles/theming'
import { AppContainer } from './components/navigation'
import { Provider } from 'react-redux'
import { ConfigureStore } from './redux/configureStore'
import PlaylistPoll from './components/PlaylistPoll'

const store = ConfigureStore()

// TODO remove this
// create an UnvirtualizedList component
// console.disableYellowBox = true

export default function App() {
  const [theme, setTheme] = useState(themes.dark)

  // immediately get stored theme config,  default to dark
  useEffect(() => {
    async function doAsync() {
      const themeName = (await AsyncStorage.getItem('THEME')) || 'dark'
      setTheme(themes[themeName])
    }
    doAsync()
  }, [])

  const toggleTheme = () => {
    const themeName = theme.opposite
    setTheme(themes[themeName])
    AsyncStorage.setItem('THEME', themeName)
  }

  const barStyle: StatusBarStyle =
    theme.opposite === 'light' ? `light-content` : 'dark-content'

  return (
    <Provider store={store}>
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <StatusBar barStyle={barStyle} />
        <PlaylistPoll>
          <AppContainer />
        </PlaylistPoll>
      </ThemeContext.Provider>
    </Provider>
  )
}
