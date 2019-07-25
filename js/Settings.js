import React from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import Screen from './components/Screen'
import StreamSelection from './components/settings/StreamSelection'
import Colophon from './components/settings/Colophon'
import LinksList from './components/settings/LinksList'

export default (Settings = props => {
  return (
    <Screen>
      <ScrollView style={styles.content}>
        <StreamSelection />
        <LinksList toggleTheme={props.screenProps.handleThemeChange} />
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
