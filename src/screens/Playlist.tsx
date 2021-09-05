import React, { useEffect, useContext } from 'react'
import { View, FlatList, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'
import Song from '../components/Song'
import Separator from '../components/Separator'
import ListHeader from '../components/ListHeader'
import Banner from '../components/Banner'
import Screen from '../components/Screen'
import ThemedText from '../components/ThemedText'
import { ThemeContext } from '../styles/theming'
import { PlaylistNavProp } from '../components/navigation/types'
import { StoreState } from '../App'

interface PlaylistProps {
  navigation: PlaylistNavProp
}

export default function Playlist({ navigation }: PlaylistProps) {
  const { theme } = useContext(ThemeContext)

  const on_air = useSelector((state: StoreState) => state.playlist.on_air)

  useEffect(() => {
    navigation.setOptions({
      title: on_air.name || 'Playlist',
    })
  }, [on_air])

  return (
    <Screen>
      <Banner
        disabled={!on_air.dj_url}
        text={'On the air:'}
        host={on_air.dj}
        onPress={() =>
          navigation.navigate('Profile', {
            url: on_air.dj_url,
            title: on_air.dj,
          })
        }
      />
      <FlatList
        data={on_air.songs}
        renderItem={({ item }) => <Song data={item} />}
        keyExtractor={(_, i) => i.toString()}
        ListHeaderComponent={
          on_air.songs.length > 0 ? <ListHeader text="Recent Songs" /> : null
        }
        stickyHeaderIndices={[0]}
        overScrollMode={'never'}
        ItemSeparatorComponent={() => <Separator color={theme.muted} />}
        ListEmptyComponent={
          <View style={styles.infoBox}>
            <ThemedText>No recent songs to display</ThemedText>
          </View>
        }
      />
    </Screen>
  )
}

const styles = StyleSheet.create({
  infoBox: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
