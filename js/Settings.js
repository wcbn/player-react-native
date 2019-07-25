import React from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import Screen from './components/Screen'
import StreamSelection from './components/settings/StreamSelection'
import Colophon from './components/settings/Colophon'
import ThemeSelection from './components/settings/ThemeSelection'
import LinksList from './components/settings/LinksList'

export default (Settings = (props) => {
  return (
    <Screen>
      <ScrollView style={styles.content}>
        <StreamSelection />
        <ThemeSelection
          toggleTheme={props.screenProps.handleThemeChange}
        />
        <LinksList />
        <Colophon />
      </ScrollView>
    </Screen>
  )
})

const styles = StyleSheet.create({
  content: {
    padding: 15
  }
})
