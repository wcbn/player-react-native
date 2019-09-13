import React from 'react'
import {
  StyleSheet,
  View,
  AsyncStorage,
  Image,
  TouchableWithoutFeedback,
  ImageBackground
} from 'react-native'
import { Audio } from 'expo-av'
import { Container } from 'flux/utils'
import OnAirStore from '../flux/OnAirStore'
import { dimensions } from '../styles/main'
import {
  ItunesAlbumArt,
  ShowDetails,
  SongDetails,
  FadeIntoHeader
} from '../components/radio'
import Screen from '../components/Screen'
import { spacing } from '../styles/main'

class Radio extends React.Component {
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
      sectionHeight: 0,
      backgroundImg: require('../../assets/album.png')
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

    // load and play
    // NOTE comment out to prevent playing during dev
    this._loadNewPlaybackInstance().then(() => {
      this.setState({
        isLoading: false
      })
    })
  }

  async _unloadPlaybackInstance() {
    if (this.playbackInstance !== null) {
      this.setState({
        isPlaying: false,
        isLoading: false,
        isBuffering: false,
        isUnloading: true
      })

      await this.playbackInstance.unloadAsync()
    }
  }

  async _loadNewPlaybackInstance() {
    this.setState({ isLoading: true })

    let streamUrl = await AsyncStorage.getItem('STREAM_URL')

    if (streamUrl === null) {
      streamUrl = 'http://floyd.wcbn.org:8000/wcbn-hd.mp3' //default
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
    if (this.playbackInstance !== null) {
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

  renderAlbumArt() {
    const song = this.state.on_air.songs[0] || {
      name: '',
      artist: '',
      album: '',
      label: '',
      year: ''
    }

    return (
      <TouchableWithoutFeedback
        disabled={this.state.isLoading}
        style={styles.albumArtContainer}
        onPress={this._onPress}
        accessibilityLabel={'Press to turn radio on or off'}
      >
        <View>
          <ItunesAlbumArt
            name={song.name}
            album={song.album}
            artist={song.artist}
            default={require('../../assets/album.png')}
            onChange={img => this.setState({ backgroundImg: img })}
            style={styles.albumArtImg}
            showPlayButton={
              !this.state.isBuffering &&
              !this.state.isPlaying &&
              !this.state.isLoading
            }
            playButton={require('../../assets/play.jpeg')}
          />
        </View>
      </TouchableWithoutFeedback>
    )
  }

  render() {
    return (
      <Screen>
        <ImageBackground
          style={styles.container}
          imageStyle={styles.imageStyle}
          source={this.state.backgroundImg}
          onLayout={event => {
            this.setState({
              sectionHeight:
                (event.nativeEvent.layout.height - 30 - album_width) / 2
            })
          }}
        >
          <FadeIntoHeader color={this.props.screenProps.theme.primary} />
          <ShowDetails
            showName={this.state.on_air.name}
            djName={this.state.on_air.dj}
            sectionHeight={this.state.sectionHeight}
          />
          {this.renderAlbumArt()}
          <SongDetails
            song={this.state.on_air.songs[0]}
            sectionHeight={this.state.sectionHeight}
          />
        </ImageBackground>
      </Screen>
    )
  }
}

const album_width = Math.max(dimensions.fullWidth / 1.25, 250)

const styles = StyleSheet.create({
  //TODO theres a weird bug here if you try paddingTop: x, the background img shifts up
  // probs something to do with flex
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: spacing.md,
    paddingRight: spacing.md,
    bottom: 0,
    height: '100%'
  },
  imageStyle: {
    opacity: 0.15
  },
  albumArtContainer: {
    width: album_width,
    aspectRatio: 1,
    flex: 1,
    justifyContent: 'center'
  },
  albumArtImg: {
    width: album_width,
    height: album_width
  }
})

export default Container.create(Radio)
