import React, { useContext } from 'react'
import { StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import ThemedText from '../ThemedText'
import ListItemWrapper from '../ListItemWrapper'
import Separator from '../Separator'
import ListHeader from '../ListHeader'
import { ThemeContext } from '../../styles/theming'
import LazyPlaceholder from '../LazyPlaceholder'
import { EpisodeAPI } from '../../types'
import { useNavigation, useRoute } from '@react-navigation/native'
import { ShowNavigationProp, ShowRouteProp } from '../navigation/types'

interface EpisodeListProps {
  episodes: EpisodeAPI[]
}

function EpisodeList(props: EpisodeListProps) {
  const { theme } = useContext(ThemeContext)
  const navigation = useNavigation<ShowNavigationProp>()
  const route = useRoute<ShowRouteProp>()

  const renderEpisode = ({ item }: { item: EpisodeAPI }) => {
    return (
      <TouchableOpacity
        disabled={item.songs.length === 0}
        onPress={() =>
          navigation.navigate('Episode', {
            songs: item.songs,
            title: route.params['title'],
            dj: item.dj,
            dj_url: item.dj_url,
            date: item.beginning,
          })
        }
      >
        <ListItemWrapper>
          <ThemedText style={styles.episodeListingHeight}>
            {item.beginning}
          </ThemedText>
          <ThemedText style={styles.episodeListingHeight} color={'accent'}>
            {item.songs.length ? `${item.songs.length} Songs` : '—'}
          </ThemedText>
        </ListItemWrapper>
      </TouchableOpacity>
    )
  }

  return (
    <FlatList
      data={props.episodes}
      renderItem={renderEpisode}
      keyExtractor={(_, i) => i.toString()}
      ListHeaderComponent={<ListHeader text="Recent Episodes" />}
      ItemSeparatorComponent={() => <Separator color={theme.muted} />}
      stickyHeaderIndices={[0]}
      overScrollMode={'never'}
      ListEmptyComponent={LazyPlaceholder}
      contentContainerStyle={styles.contentContainer}
    />
  )
}

const styles = StyleSheet.create({
  episodeListingHeight: {
    lineHeight: 22,
  },
  contentContainer: {
    flexGrow: 1,
  },
})

export default EpisodeList
