import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { StatusBar, StatusBarStyle } from 'expo-status-bar'
import { ThemeContext, themes, Themes } from './styles/theming'
import { AppContainer } from './components/navigation'
import { Provider } from 'react-redux'
import { ConfigureStore } from './redux/configureStore'

const store = ConfigureStore()
export type StoreState = ReturnType<typeof store.getState>

export default function App() {
  const [theme, setTheme] = useState(themes.dark)

  // immediately get stored theme config,  default to dark
  useEffect(() => {
    async function doAsync() {
      const themeName = ((await AsyncStorage.getItem('THEME')) ||
        'dark') as keyof Themes
      setTheme(themes[themeName])
    }
    doAsync()
  }, [])

  const toggleTheme = () => {
    const themeName = theme.opposite
    setTheme(themes[themeName])
    AsyncStorage.setItem('THEME', themeName)
  }

  const statusBarStyle: StatusBarStyle =
    theme.opposite === 'dark' ? 'dark' : 'light'

  return (
    <Provider store={store}>
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <StatusBar style={statusBarStyle} />
        {/* <PlaylistPoll> */}
        <AppContainer />
        {/* </PlaylistPoll> */}
      </ThemeContext.Provider>
    </Provider>
  )
}
