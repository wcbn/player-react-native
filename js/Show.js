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
import {
  headerStyles,
  windowStyles,
  listStyles,
  episodeStyles
} from './styles/components'

export default class Show extends React.Component {
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
    const options = { month: 'long', day: 'numeric', year: 'numeric' }

    fetch(`https://app.wcbn.org${this.props.navigation.getParam('url')}.json`)
      .then(response => response.json())
      .then(response =>
        this.setState({
          description: response.description,
          djs: response.djs,
          episodes: response.episodes.reduce((acc, e) => {
            let today = new Date()
            let episodeDate = new Date(e.beginning)
            if (episodeDate < today) {
              e.beginning = episodeDate.toLocaleDateString('en-US', options)

              e.songs.forEach(song => {
                let day = new Date(song.at)
                song.at = day.toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit'
                })
              })

              acc.push(e)
            }
            return acc
          }, [])
        })
      )
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
        style={{
          ...styles.dj,
          ...{ minWidth: dimensions.fullWidth / this.state.djs.length }
        }}
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
    //TODO refactor this
    return item.songs.length ? (
      <TouchableOpacity
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
        <View style={{ ...listStyles.item, ...episodeStyles.listing }}>
          <Text style={episodeStyles.listing.date}>{item.beginning}</Text>
          <Text style={episodeStyles.listing.numSongs}>
            {item.songs.length} Songs
          </Text>
        </View>
      </TouchableOpacity>
    ) : (
      <View style={{ ...listStyles.item, ...episodeStyles.listing }}>
        <Text style={episodeStyles.listing.date}>{item.beginning}</Text>
        <Text style={episodeStyles.listing.numSongs}>
          {item.songs.length} Songs
        </Text>
      </View>
    )
  }

  renderEpisodeList() {
    return (
      <FlatList
        data={this.state.episodes}
        renderItem={this.renderEpisode.bind(this)}
        keyExtractor={item => item.beginning}
        ListHeaderComponent={this.renderHeader}
        ItemSeparatorComponent={() => (
          <Separator color={colors.grayHighlight} />
        )}
        stickyHeaderIndices={[0]}
        overScrollMode={'never'}
      />
    )
  }

  renderHeader = () => {
    return (
      <View style={listStyles.sectionHeader}>
        <Text style={listStyles.sectionHeaderText}>Recent Episodes</Text>
      </View>
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
    maxHeight: '40%'
  },
  dj: {
    flex: 1,
    backgroundColor: colors.grayHighlight,
    height: 44, // padding * 2 + djText lineHeight
    padding: 12,
    margin: StyleSheet.hairlineWidth,
    textAlign: 'center'
  },
  djText: {
    lineHeight: 20,
    fontSize: 16,
    color: colors.active,
    textAlign: 'center'
  }
})
