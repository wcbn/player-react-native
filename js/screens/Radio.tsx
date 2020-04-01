import React from 'react'
import { connect } from 'react-redux'
import Screen from '../components/Screen'
import {
  ImageBackground,
  View,
  StyleSheet,
  Image,
  AsyncStorage
} from 'react-native'
import { Audio } from 'expo-av'
import { Song, defaultSong } from '../types'
import { getAlbumArtURI } from '../util/itunes'
import { FadeIntoHeader, RadioControls } from '../components/radio'
import { dimensions, spacing } from '../styles/main'
import ThemedText from '../components/ThemedText'
import { ScrollView } from 'react-native-gesture-handler'
import { STREAMS } from '../config'
import { PlaybackStatus, Playback } from 'expo-av/build/AV'

const defaultPNG = require('../../assets/album.png')

function TextScroll({ text }) {
  return (
    <View style={styles.textScroll}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        centerContent
      >
        <ThemedText style={styles.songText}>{text}</ThemedText>
      </ScrollView>
    </View>
  )
}

function getArtistAlbumLabelYearStr(now_playing: Song) {
  return (
    `${now_playing.artist}${now_playing.artist && now_playing.album && ' — '}${
      now_playing.album
    }${now_playing.label &&
      now_playing.year &&
      ' (' + now_playing.label + ', ' + now_playing.year + ')'}` || '—'
  )
}

const mapStateToProps = state => {
  return {
    playlist: state.playlist
  }
}

interface RadioState {
  albumArtURI: null | string
  isPlaying: boolean
  isBuffering: boolean
  isLoading: boolean
  isUnloading: boolean
  isLoaded: boolean
}

class Radio extends React.Component<any, RadioState> {
  playbackInstance: Playback

  constructor(props) {
    super(props)
    this.state = {
      albumArtURI: null,
      isPlaying: false,
      isBuffering: false,
      isLoading: false,
      isUnloading: false,
      isLoaded: false
    }

    this.playbackInstance = null
  }

  async componentDidMount() {
    Audio.setAudioModeAsync({
      staysActiveInBackground: true,
      allowsRecordingIOS: false,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playThroughEarpieceAndroid: false,
      shouldDuckAndroid: true
    })
    this.setAlbumArtURI()
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.playlist.on_air.songs.length !==
      this.props.playlist.on_air.songs.length
    ) {
      this.setAlbumArtURI()
    }
  }

  async setAlbumArtURI() {
    const { songs } = this.props.playlist.on_air
    if (songs.length === 0) {
      this.setState({
        albumArtURI: null
      })
    } else {
      const albumArtURI = await getAlbumArtURI(songs[0])
      this.setState({
        albumArtURI
      })
    }
  }

  componentWillUnmount() {
    if (this.playbackInstance !== null && this.state.isLoaded) {
      this.playbackInstance.pauseAsync()
    }
  }

  async _unloadPlaybackInstance() {
    if (this.playbackInstance !== null) {
      this.setState({
        isPlaying: false,
        isLoading: false,
        isBuffering: false,
        isUnloading: true
      })

      // @ts-ignore
      await this.playbackInstance.unloadAsync()
    }
  }

  async _loadNewPlaybackInstance(shouldPlay: boolean) {
    this.setState({ isLoading: shouldPlay })

    let streamUrl = await AsyncStorage.getItem('STREAM_URL')

    if (streamUrl === null) {
      streamUrl = STREAMS[2] //default
      AsyncStorage.setItem('STREAM_URL', streamUrl)
    }

    const { sound } = await Audio.Sound.createAsync(
      { uri: streamUrl },
      { shouldPlay },
      this._onPlaybackStatusUpdate,
      false
    )
    this.playbackInstance = sound
  }

  _onPlaybackStatusUpdate = (status: PlaybackStatus) => {
    if (status.isLoaded) {
      this.setState({
        isPlaying: status.isPlaying,
        isBuffering: status.isBuffering,
        isLoaded: status.isLoaded
      })
    }
  }

  _onPress = () => {
    if (this.state.isPlaying) {
      //unload
      this._unloadPlaybackInstance().then(() => {
        this.setState({
          isUnloading: false,
          isLoaded: false
        })
      })
    } else if (
      !this.state.isLoading &&
      !this.state.isUnloading &&
      !this.state.isBuffering
    ) {
      //load and play
      this._loadNewPlaybackInstance(true).then(() => {
        this.setState({
          isLoading: false,
          isLoaded: true
        })
      })
    }
  }

  render() {
    const { albumArtURI, isBuffering, isPlaying, isLoading } = this.state
    const on_air = this.props.playlist.on_air
    const now_playing: Song =
      on_air.songs.length > 0 ? on_air.songs[0] : defaultSong
    const albumArtSrcObj = albumArtURI ? { uri: albumArtURI } : defaultPNG
    const artistAlbumLabelYearStr = getArtistAlbumLabelYearStr(now_playing)

    return (
      <Screen>
        <ImageBackground
          style={styles.imgBG}
          imageStyle={styles.imageStyle}
          source={albumArtSrcObj}
        >
          <FadeIntoHeader />
          <View style={styles.albumArtContainer}>
            <Image source={albumArtSrcObj} style={styles.albumArt} />
          </View>
          <View style={styles.songDetails}>
            <TextScroll text={now_playing.name || '—'} />
            <TextScroll text={artistAlbumLabelYearStr} />
          </View>

          <RadioControls
            showPlayBtn={!isBuffering && !isPlaying && !isLoading}
            disabled={isLoading}
            toggleRadio={this._onPress}
          />
        </ImageBackground>
      </Screen>
    )
  }
}

export default connect(mapStateToProps)(Radio)

const ALBUM_WIDTH = dimensions.fullWidth / 1.5
const TEXT_HEIGHT = 25

const styles = StyleSheet.create({
  albumArtContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imgBG: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: spacing.md,
    paddingRight: spacing.md
  },
  imageStyle: {
    opacity: 0.4
  },
  albumArt: {
    width: ALBUM_WIDTH,
    height: ALBUM_WIDTH,
    maxWidth: ALBUM_WIDTH,
    maxHeight: ALBUM_WIDTH,
    aspectRatio: 1
  },
  songDetails: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    minHeight: (TEXT_HEIGHT + 10) * 2 + 15
  },
  songText: {
    fontSize: TEXT_HEIGHT
  },
  textScroll: {
    height: TEXT_HEIGHT + 10
  }
})
