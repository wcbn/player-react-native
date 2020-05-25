import React from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import Screen from '../components/Screen'
import { StreamSelection, LinksList, Colophon } from '../components/settings'
import { spacing } from '../styles/main'

export default function Settings() {
  return (
    <Screen>
      <ScrollView
        contentContainerStyle={styles.container}
        overScrollMode={'never'}
      >
        <StreamSelection />
        <LinksList />
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
