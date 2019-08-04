import React from 'react'
import {
  TouchableOpacity,
  StyleSheet,
  Linking,
  View,
  ScrollView
} from 'react-native'
import ThemedText from '../ThemedText'
import { useTheme } from '../../styles/theming'
import { dimensions } from '../../styles/main'

export default (DjScroll = props => {
  const theme = useTheme()

  const styles = StyleSheet.create({
    button: {
      padding: 12,
      backgroundColor: theme.muted,
      minWidth: dimensions.fullWidth / props.djs.length,
      marginRight: StyleSheet.hairlineWidth
    },
    text: {
      fontSize: 16,
      textAlign: 'center'
    }
  })

  const djButtons = props.djs.map(dj => (
    <TouchableOpacity
      key={dj.url}
      style={styles.button}
      onPress={() =>
        props.navigation.navigate('Profile', {
          url: dj.url,
          title: dj.name
        })
      }
    >
      <ThemedText style={styles.text} color={'primaryOrSecondary'}>
        {dj.name}
      </ThemedText>
    </TouchableOpacity>
  ))

  return (
    <View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {djButtons}
      </ScrollView>
    </View>
  )
})
