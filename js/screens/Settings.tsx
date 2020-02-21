import React from 'react'
import { StyleSheet, ScrollView, GestureResponderEvent } from 'react-native'
import Screen from '../components/Screen'
import { StreamSelection, LinksList, Colophon } from '../components/settings'
import { spacing } from '../styles/main'

interface SettingsProps {
  screenProps: {
    handleThemeChange: (event: GestureResponderEvent) => void
  }
}

const Settings = (props: SettingsProps) => (
  <Screen>
    <ScrollView
      contentContainerStyle={styles.container}
      overScrollMode={'never'}
    >
      <StreamSelection />
      <LinksList handleThemeChange={props.screenProps.handleThemeChange} />
      <Colophon />
    </ScrollView>
  </Screen>
)

export default Settings

const styles = StyleSheet.create({
  container: {
    padding: spacing.md,
    paddingTop: 0
  }
})
