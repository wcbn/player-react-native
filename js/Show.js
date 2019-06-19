import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList
} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { colors, dimensions } from './styles/main'
import Separator from './components/Separator'
import { headerStyles, windowStyles, listStyles } from './styles/components'
import dayjs from 'dayjs'
import ListHeader from './components/ListHeader'

export default class Show extends React.PureComponent {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('title', ''),
      ...headerStyles
    }
  }

  constructor() {
    super()

    this.state = {
      description: '',
      djs: [],
      episodes: []
    }
  }

  componentDidMount() {
    this.fetchShow()
  }

  fetchShow() {
    fetch(`https://app.wcbn.org${this.props.navigation.getParam('url')}.json`)
      .then(response => response.json())
      .then(response => {
        response.episodes.forEach(e => {
          e.beginning = dayjs(e.beginning).format('MMMM D, YYYY')

          e.songs.forEach(song => {
            song.at = dayjs(song.at).format('h:mm A')
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
      return <Text style={styles.description}>{this.state.description}</Text>
    }
  }

  renderDjScroll() {
    const djButtons = this.state.djs.map(dj => (
      <TouchableOpacity
        key={dj.url}
        style={[
          styles.dj,
          { minWidth: dimensions.fullWidth / this.state.djs.length }
        ]}
        onPress={() =>
          this.props.navigation.navigate('Profile', {
            url: dj.url,
            title: dj.name
          })
        }
      >
        <Text style={styles.djText}>{dj.name}</Text>
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
        <View style={listStyles.item}>
          <Text style={styles.date}>{item.beginning}</Text>
          <Text style={styles.numSongs}>
            {item.songs.length ? `${item.songs.length} Songs` : '—'}
          </Text>
        </View>
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
          <Separator color={colors.grayHighlight} />
        )}
        stickyHeaderIndices={[0]}
        overScrollMode={'never'}
      />
    )
  }

  render() {
    return (
      <View style={windowStyles.container}>
        {this.renderDjScroll()}
        {this.renderShowDescription()}
        {this.renderEpisodeList()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  description: {
    padding: 15,
    fontStyle: 'italic',
    color: colors.inactive,
    maxHeight: 200
  },
  dj: {
    backgroundColor: colors.grayHighlight,
    padding: 12,
    margin: StyleSheet.hairlineWidth
  },
  djText: {
    fontSize: 16,
    color: colors.active,
    textAlign: 'center'
  },
  date: {
    color: colors.inactive,
    lineHeight: 22
  },
  numSongs: {
    color: colors.lightGreen,
    lineHeight: 22
  }
})
