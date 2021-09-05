import React, { useContext } from 'react'
import {
  TouchableOpacity,
  StyleSheet,
  View,
  ScrollView,
  useWindowDimensions,
} from 'react-native'
import ThemedText from '../ThemedText'
import { ThemeContext } from '../../styles/theming'
import { useNavigation } from '@react-navigation/native'
import { ShowNavigationProp } from '../navigation/types'

interface DjScrollProps {
  djs: { url: string; name: string }[]
}

function DjScroll({ djs = [] }: DjScrollProps) {
  const { theme } = useContext(ThemeContext)
  const navigation = useNavigation<ShowNavigationProp>()
  const { width } = useWindowDimensions()

  if (djs.length === 0) return null

  const styles = StyleSheet.create({
    button: {
      padding: 12,
      backgroundColor: theme.muted,
      minWidth: width / djs.length,
      marginRight: StyleSheet.hairlineWidth,
    },
    text: {
      fontSize: 16,
      textAlign: 'center',
    },
  })

  const djButtons = djs.map((dj) => (
    <TouchableOpacity
      key={dj.url}
      style={styles.button}
      onPress={() =>
        navigation.navigate('Profile', {
          url: dj.url,
          title: dj.name,
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
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEnabled={djs.length > 1}
      >
        {djButtons}
      </ScrollView>
    </View>
  )
}

export default DjScroll
