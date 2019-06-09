import React from 'react'
import { StyleSheet, Text, View, Switch, AsyncStorage } from 'react-native'
import { windowStyles, headerStyles } from './styles/components'
import { colors } from './styles/main'
import Separator from './components/Separator'
import Share from './components/settings/ShareLink'
import ExternalLink from './components/settings/ExternalLink'
import StreamSelection from './components/settings/StreamSelection'
import Colophon from './components/settings/Colophon'

const GOOGLE_HANGOUTS_URL =
  'https://hangouts.google.com/chat/person/118357885959401668528'
const DONATION_URL =
  'https://leadersandbest.umich.edu/find/#!/give/basket/fund/361991'

export default class Settings extends React.Component {
  static navigationOptions = {
    title: 'Settings',
    ...headerStyles
  }

  renderLinks() {
    return (
      <View style={styles.LinksView}>
        <ExternalLink
          url={'tel:17347633500'}
          text={`Studio Request Line${'\n'}(734) 763-3500`}
          icon={'md-call'}
        />
        <Separator color={colors.active} />
        <ExternalLink
          url={GOOGLE_HANGOUTS_URL}
          text={`Message the DJ`}
          icon={'md-text'}
        />
        <Separator color={colors.active} />
        <ShareLink />
        <Separator color={colors.active} />
        {/* <ExternalLink
          url={'appstore.com/wcbn/review'}
          text={'Write a Review!'}
          icon={'md-thumbs-up'}
        />
        <Separator color={colors.active} /> */}
        <ExternalLink
          url={DONATION_URL}
          text={'Give to WCBN'}
          icon={'md-cash'}
        />
      </View>
    )
  }

  render() {
    return (
      <View style={windowStyles.container}>
        <View style={styles.content}>
          <StreamSelection />
          {this.renderLinks()}
          <Colophon />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  content: {
    padding: 15,
    paddingTop: 5
  },
  LinksView: {
    marginTop: 10
  }
})
