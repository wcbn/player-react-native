import React from 'react'
import { StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import ThemedText from '../ThemedText'
import ListItemWrapper from '../ListItemWrapper'
import Separator from '../Separator'
import ListHeader from '../ListHeader'
import { useTheme } from '../../styles/theming';

export default (EpisodeList = props => {
  const theme = useTheme()

  const styles = StyleSheet.create({
    episodeListingHeight: {
      lineHeight: 22
    }
  })

  renderEpisode = ({ item, index }) => {
    return (
      <TouchableOpacity
        disabled={item.songs.length === 0}
        onPress={() =>
          props.navigation.navigate('Episode', {
            songs: item.songs,
            title: props.navigation.getParam('title'),
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
      renderItem={this.renderEpisode}
      keyExtractor={item => item.beginning}
      ListHeaderComponent={<ListHeader text="Recent Episodes" />}
      ItemSeparatorComponent={() => (
        <Separator color={theme.muted} />
      )}
      stickyHeaderIndices={[0]}
      overScrollMode={'never'}
    />
  )
})
