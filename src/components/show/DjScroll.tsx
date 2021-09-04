import React, { useContext } from 'react'
import { TouchableOpacity, StyleSheet, View, ScrollView } from 'react-native'
import ThemedText from '../ThemedText'
import { ThemeContext } from '../../styles/theming'
import { dimensions } from '../../styles/main'
import { useNavigation } from '@react-navigation/native'
import { ShowNavigationProp } from '../navigation/types'

interface DjScrollProps {
  djs: { url: string; name: string }[]
}

function DjScroll(props: DjScrollProps) {
  const { theme } = useContext(ThemeContext)
  const navigation = useNavigation<ShowNavigationProp>()

  const styles = StyleSheet.create({
    button: {
      padding: 12,
      backgroundColor: theme.muted,
      minWidth: dimensions.fullWidth / props.djs.length,
      marginRight: StyleSheet.hairlineWidth,
    },
    text: {
      fontSize: 16,
      textAlign: 'center',
    },
  })

  const djButtons = props.djs.map((dj) => (
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
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {djButtons}
      </ScrollView>
    </View>
  )
}

export default DjScroll
