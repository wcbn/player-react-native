import React from 'react'
import { StyleSheet, View, TouchableOpacity, FlatList } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { dimensions, spacing } from '../styles/main'
import Separator from '../components/Separator'
import ListHeader from '../components/ListHeader'
import Screen from '../components/Screen'
import ThemedText from '../components/ThemedText'
import { getDefaultNavigationOptions } from '../util/navigation'
import { humanizeTime, humanizeDate } from '../util/datetime'
import ListItemWrapper from '../components/ListItemWrapper'

export default class Show extends React.PureComponent {
  static navigationOptions = ({ navigation, screenProps }) => {
    return {
      title: navigation.getParam('title', ''),
      ...getDefaultNavigationOptions(screenProps.theme)
    }
  }

  state = {
    description: '',
    djs: [],
    episodes: []
  }

  componentDidMount() {
    fetch(`https://app.wcbn.org${this.props.navigation.getParam('url')}.json`)
      .then(response => response.json())
      .then(response => {
        response.episodes.forEach(e => {
          e.beginning = humanizeDate(e.beginning)

          e.songs.forEach(song => {
            song.at = humanizeTime(song.at)
          })
        })

        this.setState({
          description: response.description,
          djs: response.djs,
          episodes: response.episodes
        })
      })
  }

  renderShowDescription() {
    if (this.state.description) {
      return (
        <ThemedText style={styles.description} numberOfLines={6}>
          {this.state.description}
        </ThemedText>
      )
    }
  }

  renderDjScroll() {
    const djButtons = this.state.djs.map(dj => (
      <TouchableOpacity
        key={dj.url}
        style={{
          padding: 12,
          backgroundColor: this.props.screenProps.theme.muted,
          minWidth: dimensions.fullWidth / this.state.djs.length,
          marginRight: StyleSheet.hairlineWidth
        }}
        onPress={() =>
          this.props.navigation.navigate('Profile', {
            url: dj.url,
            title: dj.name
          })
        }
      >
        <ThemedText style={styles.djText} color={'primaryOrSecondary'}>
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

  renderEpisode({ item, index }) {
    return (
      <TouchableOpacity
        disabled={item.songs.length === 0}
        onPress={() =>
          this.props.navigation.navigate('Episode', {
            songs: item.songs,
            title: this.props.navigation.getParam('title'),
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

  renderEpisodeList() {
    return (
      <FlatList
        data={this.state.episodes}
        renderItem={this.renderEpisode.bind(this)}
        keyExtractor={item => item.beginning}
        ListHeaderComponent={<ListHeader text="Recent Episodes" />}
        ItemSeparatorComponent={() => (
          <Separator color={this.props.screenProps.theme.muted} />
        )}
        stickyHeaderIndices={[0]}
        overScrollMode={'never'}
      />
    )
  }

  render() {
    return (
      <Screen>
        {this.renderDjScroll()}
        <Separator />
        {this.renderShowDescription()}
        {this.renderEpisodeList()}
      </Screen>
    )
  }
}

const styles = StyleSheet.create({
  description: {
    padding: spacing.md,
    fontStyle: 'italic'
  },
  djText: {
    fontSize: 16,
    textAlign: 'center'
  },
  episodeListingHeight: {
    lineHeight: 22
  }
})
