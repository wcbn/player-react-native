import React from 'react'
import { StyleSheet, View, Linking, Share } from 'react-native'
import Separator from '../Separator'
import Link from './Link'
import { useTheme } from '../../styles/theming'
import { spacing } from '../../styles/main';

const GOOGLE_HANGOUTS_URL =
  'https://hangouts.google.com/chat/person/118357885959401668528'

const DONATION_URL =
  'https://leadersandbest.umich.edu/find/#!/give/basket/fund/361991'

const GOOGLE_PLAY_URL = 'https://play.google.com/store/apps/details?id=org.wcbn'

export default (LinksList = props => {
  const theme = useTheme()
  return (
    <View style={styles.linksView}>
      <Link
        onPress={() => Linking.openURL('tel:17347633500')}
        text={`Studio request line${'\n'}(734) 763-3500`}
        icon={'md-call'}
      />
      <Separator color={theme.secondary} />
      <Link
        onPress={() => Linking.openURL(GOOGLE_HANGOUTS_URL)}
        text={'Message the DJ'}
        icon={'md-text'}
      />
      <Separator color={theme.secondary} />
      <Link
        onPress={() =>
          Share.share({
            message: "I'm listening to WCBN-FM Ann Arbor!"
          })
        }
        text={'Share on social media'}
        icon={'md-share'}
      />
      <Separator color={theme.secondary} />
      <Link
        onPress={() => Linking.openURL(GOOGLE_PLAY_URL)}
        text={'Write a review!'}
        icon={'md-thumbs-up'}
      />
      <Separator color={theme.secondary} />
      <Link
        onPress={props.handleThemeChange}
        text={`Switch to ${theme.opposite} mode`}
        icon={'md-bulb'}
      />
      <Separator color={theme.secondary} />
      <Link
        onPress={() => Linking.openURL(DONATION_URL)}
        text={'Give to WCBN'}
        icon={'md-cash'}
      />
    </View>
  )
})

const styles = StyleSheet.create({
  linksView: {
    marginTop: spacing.sm,
    marginBottom: spacing.sm
  }
})
