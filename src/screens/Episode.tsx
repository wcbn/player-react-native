import React, { useEffect, useContext } from 'react'
import { FlatList } from 'react-native'
import Song from '../components/Song'
import Separator from '../components/Separator'
import ListHeader from '../components/ListHeader'
import Banner from '../components/Banner'
import Screen from '../components/Screen'
import { ThemeContext } from '../styles/theming'
import {
  EpisodeNavProp,
  EpisodeRouteProp,
} from '../components/navigation/types'

// since the only way to get to this screen is from a Show,
// all of the data is passed in as navigation props, saving us an expensive fetch()

interface EpisodeProps {
  navigation: EpisodeNavProp
  route: EpisodeRouteProp
}

export default function Episode({ navigation, route }: EpisodeProps) {
  const { theme } = useContext(ThemeContext)

  useEffect(() => {
    navigation.setOptions({
      title: route.params.title,
    })
  }, [])

  return (
    <Screen>
      <Banner
        text={'Host:'}
        host={route.params.dj}
        onPress={() =>
          navigation.navigate('Profile', {
            url: route.params.dj_url,
            title: route.params.dj,
          })
        }
      />
      <FlatList
        data={route.params.songs}
        renderItem={({ item }) => <Song data={item} />}
        keyExtractor={(_, i) => i.toString()}
        ListHeaderComponent={<ListHeader text={route.params.date} />}
        stickyHeaderIndices={[0]}
        overScrollMode={'never'}
        ItemSeparatorComponent={() => <Separator color={theme.muted} />}
      />
    </Screen>
  )
}
