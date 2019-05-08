import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  TouchableWithoutFeedback,
  Image,
  ImageBackground
} from 'react-native'
import Settings from './Settings'
import { Audio } from 'expo'
import { Container } from 'flux/utils'
import OnAirStore from './flux/OnAirStore'
import OnAirDispatcher from './flux/OnAirDispatcher'
import Icon from 'react-native-vector-icons/Ionicons'
import { colors, dimensions } from './styles/main'
import Moment from 'moment'
import { windowStyles, headerStyles } from './styles/components'

class Radio extends React.Component {
  static navigationOptions = () => {
    return {
      title: '88.3 FM',
      ...headerStyles
    }
  }

  // static navigationOptions = {
  //   title: 'Radio'
  // }

  static getStores() {
    return [OnAirStore]
  }

  static calculateState(prevState) {
    return {
      on_air: OnAirStore.getState()
    }
  }

  constructor() {
    super()
    this.state = {
      uri: 'http://floyd.wcbn.org:8000/wcbn-hd.mp3',
      isPlaying: false,
      isBuffering: false,
      isLoading: true,
      isUnloading: false,
      albumArt: null // null or url
    }

    this.playbackInstance = null
  }

  async componentDidMount() {
    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playThroughEarpieceAndroid: false,
      shouldDuckAndroid: true
    })

    this._loadNewPlaybackInstance()

    const pollForNewSong = () => {
      this.fetchPlaylist().then(
        () => {
          OnAirDispatcher.dispatch({
            type: 'CHECK_FOR_NEW_SONG',
            data: this.state.on_air
          })
          this.fetchAlbumArt()
        },
        () => {} //pass on rejection
      )
    }

    pollForNewSong()
    setInterval(pollForNewSong, 20000)
  }

  fetchPlaylist() {
    return new Promise((resolve, reject) => {
      fetch('https://app.wcbn.org/playlist.json')
        .then(response => response.json())
        .then(data => {
          //if no change, reject
          // if (data.on_air.songs[0].name == this.state.on_air.songs[0].name) {
          //   reject('Song has not changed.')
          // }

          data.on_air.songs.forEach(song => {
            song.at = Moment(song.at).format('h:mm A')
          })
          this.setState({
            on_air: data.on_air
          })
          resolve()
        })
    })
  }

  fetchAlbumArt() {
    const song = this.state.on_air.songs[0]

    if (song === undefined) {
      this.setState({
        albumArt: null
      })
      return
    }

    let searchTerm = ''

    // song = { name: 'seven nation army', artist: 'white stripes', album: 'elephant', label: '', year: '' }

    if (song.artist) {
      searchTerm = song.artist + ' '
    }

    if (song.album) {
      searchTerm += song.album
    } else if (song.name) {
      searchTerm += song.name
    }

    console.log(searchTerm)

    searchParams = fetch(
      `https://itunes.apple.com/search?limit=1&entity=album&term=${encodeURI(
        searchTerm
      )}`
    )
      .then(response => response.json())
      .then(data => {
        const res = data.results[0]

        if (res === undefined) {
          this.setState({
            albumArt: null
          })
          return
        }

        const artworkUrl = res.artworkUrl100.replace('100x100', '600x600')

        this.setState({
          albumArt: artworkUrl
        })
      })
  }

  async _unloadPlaybackInstance() {
    if (this.playbackInstance != null) {
      this.setState({
        isPlaying: false,
        isLoading: false,
        isUnloading: true
      })

      await this.playbackInstance.unloadAsync()
      // this.playbackInstance.setOnPlaybackStatusUpdate(null)
      // this.playbackInstance = null
    }
  }

  async _loadNewPlaybackInstance() {
    this.setState({ isLoading: true })
    const { sound, status } = await Audio.Sound.createAsync(
      { uri: this.state.uri },
      { shouldPlay: true },
      this._onPlaybackStatusUpdate
    )
    this.playbackInstance = sound
  }

  _onPlaybackStatusUpdate = status => {
    if (status.isLoaded) {
      this.setState({
        shouldPlay: status.shouldPlay,
        isPlaying: status.isPlaying,
        isBuffering: status.isBuffering
      })
    } else if (status.error) {
      console.log(`FATAL PLAYER ERROR: ${status.error}`)
    }
  }

  _onPress = () => {
    if (this.playbackInstance != null) {
      if (this.state.isPlaying) {
        //unload
        this._unloadPlaybackInstance().then(() => {
          this.setState({
            isUnloading: false
          })
        })
      } else if (
        !this.state.isLoading &&
        !this.state.isUnloading &&
        !this.state.isBuffering
      ) {
        //load and play
        this._loadNewPlaybackInstance().then(() => {
          this.setState({
            isLoading: false
          })
        })
      }
    }
  }

  renderAlbumCover() {
    let src
    if (this.state.albumArt && this.state.isPlaying) {
      src = { uri: this.state.albumArt }
    } else if (this.state.isPlaying) {
      src = require('../assets/album.png')
    } else {
      src = null
    }

    return (
      <TouchableWithoutFeedback onPress={this._onPress}>
        <ImageBackground style={styles.albumCover} source={src}>
          <Icon
            name={this.state.isPlaying ? null : 'ios-play'}
            size={150}
            color={colors.active}
            style={styles.icon}
            onPress={this._onPress}
          />
        </ImageBackground>
      </TouchableWithoutFeedback>
    )
  }

  renderNowPlaying() {
    if (!this.state.isPlaying) {
      return null
    }

    let x = this.state.on_air.songs[0]

    if (x == undefined) {
      x = { name: '', artist: '', album: '', label: '', year: '' }
    }

    let name = x.name ? (
      <Text style={styles.nowPlayingText}>{x.name}</Text>
    ) : null
    let artist = x.artist ? (
      <Text style={styles.nowPlayingText}>{x.artist}</Text>
    ) : null
    let album = x.album ? (
      <Text style={styles.nowPlayingText}>{x.album}</Text>
    ) : null
    let label = x.label ? (
      <Text style={styles.nowPlayingText}>
        {x.label + (x.year ? ` (${x.year})` : '')}
      </Text>
    ) : null

    return (
      <View style={styles.nowPlaying}>
        {name}
        {artist}
        {album}
        {label}
      </View>
    )
  }

  render() {
    const background =
      this.state.albumArt && this.state.isPlaying
        ? { uri: this.state.albumArt }
        : require('../assets/album.png')

    return (
      <TouchableWithoutFeedback onPress={this._onPress}>
        <ImageBackground
          style={{ ...windowStyles.container, ...styles.container }}
          imageStyle={{ opacity: 0.05 }}
          source={background}
        >
          {this.renderAlbumCover()}
          {this.renderNowPlaying()}
        </ImageBackground>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    marginLeft: 10,
    marginTop: 10
  },
  nowPlaying: {
    bottom: 40,
    alignItems: 'center',
    position: 'absolute'
  },
  nowPlayingText: {
    color: colors.inactive,
    fontSize: 20,
    lineHeight: 30
  },
  albumCover: {
    width: dimensions.fullWidth / 1.75,
    height: dimensions.fullWidth / 1.75,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute'
  }
})

export default Container.create(Radio)
