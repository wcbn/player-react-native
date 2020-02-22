import React from 'react'
import { StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import ThemedText from '../ThemedText'
import ListItemWrapper from '../ListItemWrapper'
import Separator from '../Separator'
import ListHeader from '../ListHeader'
import { useTheme } from '../../styles/theming'
import { useNavigation, useRoute } from '@react-navigation/native'

const EpisodeList = props => {
  const theme = useTheme()
  const navigation = useNavigation()
  const route = useRoute()

  const styles = StyleSheet.create({
    episodeListingHeight: {
      lineHeight: 22
    }
  })

  const renderEpisode = ({ item }) => {
    return (
      <TouchableOpacity
        disabled={item.songs.length === 0}
        onPress={() =>
          navigation.navigate('Episode', {
            songs: item.songs,
            title: route.params['title'],
            dj: item.dj,
            dj_url: item.dj_url,
            date: item.beginning
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
      keyExtractor={item => item.beginning}
      ListHeaderComponent={<ListHeader text="Recent Episodes" />}
      ItemSeparatorComponent={() => <Separator color={theme.muted} />}
      stickyHeaderIndices={[0]}
      overScrollMode={'never'}
    />
  )
}

export default EpisodeList
