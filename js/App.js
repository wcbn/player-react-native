import React from 'react'
import { StatusBar, AsyncStorage } from 'react-native'
import { SafeAreaView } from 'react-navigation'
import { ThemeProvider, themes } from './styles/theming'
import OnAirPoll from './components/OnAirPoll'
import { AppContainer } from './components/navigation'

export default class App extends React.PureComponent {
  state = {
    theme: themes.dark
  }

  componentDidMount = async () => {
    const themeName = (await AsyncStorage.getItem('THEME')) || 'dark'
    this.setState({ theme: themes[themeName] })
  }

  handleThemeChange = () => {
    const themeName = this.state.theme.opposite
    this.setState({ theme: themes[themeName] })
    AsyncStorage.setItem('THEME', themeName)
  }

  render() {
    return (
      <ThemeProvider theme={this.state.theme}>
        <SafeAreaView
          style={{ flex: 1, backgroundColor: this.state.theme.primary }}
          forceInset={{ top: 'never' }}
        >
          <StatusBar barStyle={`${this.state.theme.opposite}-content`} />
          <OnAirPoll />
          <AppContainer
            screenProps={{
              handleThemeChange: this.handleThemeChange,
              theme: this.state.theme
            }}
          />
        </SafeAreaView>
      </ThemeProvider>
    )
  }
}
