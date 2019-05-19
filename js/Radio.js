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
import { Audio } from 'expo'
import { Container } from 'flux/utils'
import OnAirStore from './flux/OnAirStore'
import OnAirDispatcher from './flux/OnAirDispatcher'
import Icon from 'react-native-vector-icons/Ionicons'
import { colors, dimensions } from './styles/main'
import dayjs from 'dayjs'
import { windowStyles, headerStyles } from './styles/components'
import ScrollingText from './components/radio/ScrollingText'

class Radio extends React.Component {
  static navigationOptions = {
    title: 'WCBN-FM Ann Arbor',
    ...headerStyles
  }

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
    setInterval(pollForNewSong, 30000)
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
            song.at = dayjs(song.at).format('h:mm A')
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

    // NOTE test a hard-coded song here
    // song = { name: 'seven nation army', artist: 'white stripes', album: 'elephant', label: '', year: '' }

    let searchTerm = `${song.artist} ${song.album ? song.album : song.name}`

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

        this.setState({
          albumArt: res.artworkUrl100.replace('100x100', '600x600')
        })
      })
  }

  async _unloadPlaybackInstance() {
    if (this.playbackInstance != null) {
      this.setState({
        isPlaying: false,
        isLoading: false,
        isBuffering: false,
        isUnloading: true
      })

      await this.playbackInstance.unloadAsync()
      // this.playbackInstance.setOnPlaybackStatusUpdate(null)
      // this.playbackInstance = null
    }
  }

  async _loadNewPlaybackInstance() {
    this.setState({ isLoading: true })

    let streamUrl = await AsyncStorage.getItem('STREAM_URL')

    if (streamUrl == null) {
      // SET DEFAULT
      streamUrl = 'http://floyd.wcbn.org:8000/wcbn-hd.mp3'
      AsyncStorage.setItem('STREAM_URL', streamUrl)
    }

    const { sound, status } = await Audio.Sound.createAsync(
      { uri: streamUrl },
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
            name={this.state.isPlaying ? null : 'md-play'}
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

    //NOTE: TEST HARDCODED SONG HERE
    // x = { name: 'elephant', artist: 'the white stripes', album: '', label: '', year: '' }

    let name = x.name ? <ScrollingText text={x.name} /> : null
    let artist = x.artist ? <ScrollingText text={x.artist} /> : null
    let album = x.album ? (
      <ScrollingText
        text={
          x.album + (x.label && x.year ? ` — (${x.label},  ${x.year})` : '')
        }
      />
    ) : null

    return (
      <View style={styles.nowPlaying}>
        {name}
        {artist}
        {album}
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
          style={[windowStyles.container, styles.container]}
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
    bottom: 60,
    alignItems: 'center',
    position: 'absolute',
    maxWidth: (dimensions.fullWidth * 3) / 4
  },
  albumCover: {
    justifyContent: 'center',
    alignItems: 'center',
    width: dimensions.fullWidth / 1.75,
    height: dimensions.fullWidth / 1.75,
    top: dimensions.fullHeight / 5,
    position: 'absolute'
  },
  fieldLabels: {
    color: colors.active
  }
})

export default Container.create(Radio)
