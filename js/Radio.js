import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  TouchableOpacity,
  Image,
  ImageBackground
} from 'react-native'
import { Audio } from 'expo-av'
import { Container } from 'flux/utils'
import OnAirStore from './flux/OnAirStore'
import OnAirDispatcher from './flux/OnAirDispatcher'
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
      staysActiveInBackground: true,
      allowsRecordingIOS: false,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_MIX_WITH_OTHERS,
      playsInSilentModeIOS: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
      playThroughEarpieceAndroid: true,
      shouldDuckAndroid: true
    })

    //load and play
    this._loadNewPlaybackInstance().then(() => {
      this.setState({
        isLoading: false
      })
    })

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
    let song = this.state.on_air.songs[0]

    if (song === undefined) {
      this.setState({
        albumArt: null
      })
      return
    }

    // NOTE test a hard-coded song here
    // song = {
    //   name: 'In Care of 8675309',
    //   artist: 'Lambchop',
    //   album: 'FLOTUS',
    //   label: 'Merge',
    //   year: '2016'
    // }

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

  renderOnAir() {
    if (!this.state.isPlaying) {
      return null
    }

    return (
      <View style={styles.onAirContainer}>
        <Text numberOfLines={2} style={styles.onAirShowName}>
          {this.state.on_air.name}
        </Text>
        <Text numberOfLines={1} style={styles.onAirDjName}>
          {this.state.on_air.name ? `with ${this.state.on_air.dj}` : ' '}
        </Text>
      </View>
    )
  }

  renderAlbumArt() {
    let src
    if (this.state.albumArt && this.state.isPlaying) {
      src = { uri: this.state.albumArt }
    } else {
      src = require('../assets/album.png')
    }

    return (
      <TouchableOpacity
        disabled={this.state.isLoading}
        style={styles.albumArtContainer}
        onPress={this._onPress}
        accessibilityLabel={'Turn radio on or off'}
      >
        <ImageBackground style={styles.albumArtImg} source={src} />
      </TouchableOpacity>
    )
  }

  renderNowPlaying() {
    if (!this.state.isPlaying) {
      return null
    }

    let x = this.state.on_air.songs[0] || {
      name: '',
      artist: '',
      album: '',
      label: '',
      year: ''
    }

    //NOTE: TEST HARDCODED SONG HERE
    // x = {
    //   name: 'In Care of 8675309',
    //   artist: 'Lambchop',
    //   album: 'FLOTUS',
    //   label: 'Merge',
    //   year: '2016'
    // }

    return (
      <View style={styles.nowPlaying}>
        <ScrollingText text={x.name} />
        <ScrollingText text={x.artist} />
        <ScrollingText
          text={
            x.album + (x.label && x.year ? ` — (${x.label},  ${x.year})` : '')
          }
        />
      </View>
    )
  }

  render() {
    const background =
      this.state.albumArt && this.state.isPlaying
        ? { uri: this.state.albumArt }
        : require('../assets/album.png')

    return (
      <ImageBackground
        style={[windowStyles.container, styles.container]}
        imageStyle={{ opacity: 0.05 }}
        source={background}
      >
        {this.renderOnAir()}
        {this.renderAlbumArt()}
        {this.renderNowPlaying()}
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15
  },
  albumArtContainer: {
    width: dimensions.fullWidth / 1.5,
    flex: 1,
    justifyContent: 'center'
  },
  albumArtImg: {
    width: dimensions.fullWidth / 1.5,
    height: dimensions.fullWidth / 1.5
  },
  nowPlaying: {
    flex: 0,
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: '100%'
  },
  onAirContainer: {
    width: '100%',
    alignItems: 'center',
    flex: 0
  },
  onAirShowName: { fontSize: 20, color: '#ffffff', textAlign: 'center' },
  onAirDjName: { fontSize: 16, fontStyle: 'italic', color: colors.active }
})

export default Container.create(Radio)
