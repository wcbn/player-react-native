import React from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import Screen from '../components/Screen'
import { StreamSelection, LinksList, Colophon } from '../components/settings'
import { getDefaultNavigationOptions } from '../util/navigation'
import { spacing } from '../styles/main'

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
        <ScrollView
          contentContainerStyle={styles.container}
          overScrollMode={'never'}
        >
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
    padding: spacing.md,
    paddingTop: 0
  }
})
