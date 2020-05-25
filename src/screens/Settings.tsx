import React, { useContext } from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import Screen from '../components/Screen'
import { StreamSelection, LinksList, Colophon } from '../components/settings'
import { spacing } from '../styles/main'
import { ThemeContext } from '../styles/theming'

export default function Settings() {
  const { toggleTheme } = useContext(ThemeContext)
  return (
    <Screen>
      <ScrollView
        contentContainerStyle={styles.container}
        overScrollMode={'never'}
      >
        <StreamSelection />
        <LinksList handleThemeChange={toggleTheme} />
        <Colophon />
      </ScrollView>
    </Screen>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.md,
    paddingTop: 0,
  },
})
