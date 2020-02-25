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
// import { PlaylistScreenNavigationProp } from '../components/navigation/types'

export default function Playlist({ navigation }) {
  const { theme } = useContext(ThemeContext);
  // @ts-ignore
  const on_air = useSelector(state => state.playlist.on_air)

  useEffect(() => {
    navigation.setOptions({
      title: on_air.name
    })
  }, [on_air])

  return (
    <Screen>
      <Banner
        text={'On the air:'}
        host={on_air.dj}
        onPress={() =>
          navigation.navigate('Profile', {
            url: on_air.dj_url,
            title: on_air.dj
          })
        }
      />
      <FlatList
        data={on_air.songs}
        renderItem={({ item }) => <Song data={item} />}
        keyExtractor={(item, index) => index.toString()}
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
    alignItems: 'center'
  }
})
