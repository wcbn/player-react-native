import React from 'react'
import { StyleSheet, View, ScrollView, Linking, Share } from 'react-native'
import { windowStyles, headerStyles } from './styles/components'
import Separator from './components/Separator'
import Screen from './components/Screen'
import Link from './components/settings/Link'
import StreamSelection from './components/settings/StreamSelection'
import Colophon from './components/settings/Colophon'
import ThemeSelection from './components/settings/ThemeSelection'
import { withTheme } from './styles/theming'

const GOOGLE_HANGOUTS_URL =
  'https://hangouts.google.com/chat/person/118357885959401668528'

const DONATION_URL =
  'https://leadersandbest.umich.edu/find/#!/give/basket/fund/361991'

const GOOGLE_PLAY_URL = 'https://play.google.com/store/apps/details?id=org.wcbn'

class Settings extends React.PureComponent {
  static navigationOptions = {
    title: 'Settings',
    ...headerStyles
  }

  renderLinks() {
    const theme = this.props.theme
    return (
      <View style={styles.LinksView}>
        <Link
          onPress={() => Linking.openURL('tel:17347633500')}
          text={`Studio Request Line${'\n'}(734) 763-3500`}
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
          text={'Share on Social Media'}
          icon={'md-share'}
        />
        <Separator color={theme.secondary} />
        <Link
          onPress={() => Linking.openURL(GOOGLE_PLAY_URL)}
          text={'Write a Review!'}
          icon={'md-thumbs-up'}
        />
        <Separator color={theme.secondary} />
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
      <Screen>
        <ScrollView style={styles.content}>
          <StreamSelection />
          <ThemeSelection
            toggleTheme={this.props.screenProps.handleThemeChange}
          />
          {this.renderLinks()}
          <Colophon />
        </ScrollView>
      </Screen>
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

export default withTheme(Settings)
