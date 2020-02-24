import React, { useContext } from 'react'
import {
  StyleSheet,
  View,
  Linking,
  Share,
  GestureResponderEvent
} from 'react-native'
import * as StoreReview from 'expo-store-review'
import Separator from '../Separator'
import Link from './Link'
import { ThemeContext } from '../../styles/theming'
import { spacing } from '../../styles/main'
import {
  GOOGLE_HANGOUTS_URL,
  DONATION_URL,
  STUDIO_PHONE_FORMATTED,
  STUDIO_PHONE_RAW
} from '../../config'

interface LinksListProps {
  handleThemeChange: (event: GestureResponderEvent) => void
}

const LinksList = (props: LinksListProps) => {
  const { theme } = useContext(ThemeContext);
  return (
    <View style={styles.linksView}>
      <Link
        onPress={() => Linking.openURL(`tel:${STUDIO_PHONE_RAW}`)}
        text={`Studio request line${'\n'}${STUDIO_PHONE_FORMATTED}`}
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
        onPress={() => StoreReview.requestReview()}
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
}

export default LinksList

const styles = StyleSheet.create({
  linksView: {
    marginTop: spacing.sm,
    marginBottom: spacing.sm
  }
})
