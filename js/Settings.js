import React from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import Screen from './components/Screen'
import StreamSelection from './components/settings/StreamSelection'
import LinksList from './components/settings/LinksList'
import Colophon from './components/settings/Colophon'
import { getDefaultNavigationOptions } from './util/navigation'

export default class Settings extends React.PureComponent {
  static navigationOptions = ({ navigation, screenProps }) => {
    return {
      title: 'Settings',
      ...getDefaultNavigationOptions(screenProps.theme)
    }
  }

  render() {
    return (
      <Screen>
        <ScrollView contentContainerStyle={styles.container}>
          <StreamSelection />
          <LinksList
            handleThemeChange={this.props.screenProps.handleThemeChange}
          />
          <Colophon />
        </ScrollView>
      </Screen>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    paddingTop: 0
  }
})
