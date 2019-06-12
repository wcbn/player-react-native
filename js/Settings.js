import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Linking,
  Share
} from 'react-native'
import { windowStyles, headerStyles } from './styles/components'
import { colors } from './styles/main'
import Separator from './components/Separator'
import Link from './components/settings/Link'
import StreamSelection from './components/settings/StreamSelection'
import Colophon from './components/settings/Colophon'

const GOOGLE_HANGOUTS_URL =
  'https://hangouts.google.com/chat/person/118357885959401668528'

const DONATION_URL =
  'https://leadersandbest.umich.edu/find/#!/give/basket/fund/361991'

const GOOGLE_PLAY_URL = 'https://play.google.com/store/apps/details?id=org.wcbn'

export default class Settings extends React.PureComponent {
  static navigationOptions = {
    title: 'Settings',
    ...headerStyles
  }

  renderLinks() {
    return (
      <View style={styles.LinksView}>
        <Link
          onPress={() => Linking.openURL('tel:17347633500')}
          text={`Studio Request Line${'\n'}(734) 763-3500`}
          icon={'md-call'}
        />
        <Separator color={colors.active} />
        <Link
          onPress={() => Linking.openURL(GOOGLE_HANGOUTS_URL)}
          text={'Message the DJ'}
          icon={'md-text'}
        />
        <Separator color={colors.active} />
        <Link
          onPress={() =>
            Share.share({
              message: "I'm listening to WCBN-FM Ann Arbor!"
            })
          }
          text={'Share on Social Media'}
          icon={'md-share'}
        />
        <Separator color={colors.active} />
        <Link
          onPress={() => Linking.openURL(GOOGLE_PLAY_URL)}
          text={'Write a Review!'}
          icon={'md-thumbs-up'}
        />
        <Separator color={colors.active} />
        <Link
          onPress={() => Linking.openURL(DONATION_URL)}
          text={'Give to WCBN'}
          icon={'md-cash'}
        />
      </View>
    )
  }

  render() {
    return (
      <View style={windowStyles.container}>
        <ScrollView style={styles.content}>
          <StreamSelection />
          {this.renderLinks()}
          <Colophon />
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  content: {
    padding: 15
  },
  LinksView: {
    marginTop: 10
  }
})
