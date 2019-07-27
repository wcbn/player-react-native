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
import OnAirStore from './flux/OnAirStore'
import { dimensions } from './styles/main'
import ScrollingText from './components/radio/ScrollingText'
import ItunesAlbumArt from './components/radio/ItunesAlbumArt'
import { getDefaultNavigationOptions } from './util/navigation'
import ThemedText from './components/ThemedText'
import Screen from './components/Screen'

class Radio extends React.Component {
  static navigationOptions = ({ navigation, screenProps }) => {
    return {
      title: 'WCBN-FM Ann Arbor',
      ...getDefaultNavigationOptions(screenProps.theme)
    }
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
      sectionHeight: 0,
      backgroundImg: require('../assets/album.png')
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
      playThroughEarpieceAndroid: true,
      shouldDuckAndroid: true
    })

    // load and play
    // this._loadNewPlaybackInstance().then(() => {
    //   this.setState({
    //     isLoading: false
    //   })
    // })
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

  renderShowDetails() {
    if (this.state.on_air.name) {
      return (
        <View
          style={[
            styles.showDetailsContainer,
            { height: this.state.sectionHeight / 2 }
          ]}
        >
          <ThemedText
            numberOfLines={1}
            style={{
              fontSize: Math.min(this.state.sectionHeight / 2, 23)
            }}
          >
            {this.state.on_air.name}
          </ThemedText>
          <ThemedText
            color={'secondary'}
            numberOfLines={1}
            style={[
              styles.showDetailsHost,
              { fontSize: Math.min(this.state.sectionHeight / 5, 20) }
            ]}
          >
            {`with ${this.state.on_air.dj}`}
          </ThemedText>
        </View>
      )
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
            default={require('../assets/album.png')}
            onChange={img => this.setState({ backgroundImg: img })}
            style={styles.albumArtImg}
            showPlayButton={
              !this.state.isBuffering &&
              !this.state.isPlaying &&
              !this.state.isLoading
            }
            playButton={require('../assets/play.jpeg')}
          />
        </View>
      </TouchableWithoutFeedback>
    )
  }

  renderSongDetails() {
    let x = this.state.on_air.songs[0] || {
      name: '',
      artist: '',
      album: '',
      label: '',
      year: ''
    }

    //NOTE: TEST HARDCODED SONG HERE
    // x = {
    //   name: "Magician's Success",
    //   artist: 'Vanishing Twin',
    //   album: 'The Age Of Immunology',
    //   label: 'Fire',
    //   year: '2019'
    // }

    return (
      <View style={[styles.songDetails, { height: this.state.sectionHeight }]}>
        <ScrollingText
          text={x.name || '—'}
          lineHeight={this.state.sectionHeight / 2}
        />
        <ScrollingText
          text={
            `${x.artist}${x.artist && x.album ? ' — ' : ''}${x.album}${
              x.label && x.year ? ' (' + x.label + ', ' + x.year + ')' : ''
            }` || '—'
          }
          lineHeight={this.state.sectionHeight / 2}
        />
      </View>
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
          {this.renderShowDetails()}
          {this.renderAlbumArt()}
          {this.renderSongDetails()}
        </ImageBackground>
      </Screen>
    )
  }
}

const album_width = Math.max(dimensions.fullWidth / 1.25, 250)

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    height: '100%'
  },
  albumArtContainer: {
    width: album_width,
    height: album_width,
    flex: 1,
    justifyContent: 'center'
  },
  albumArtImg: {
    width: album_width,
    height: album_width
  },
  imageStyle: {
    opacity: 0.075
  },
  songDetails: {
    flex: 0,
    alignItems: 'center',
    width: '100%',
    maxWidth: '100%',
    marginTop: 10
  },
  showDetailsContainer: {
    width: '100%',
    maxWidth: '100%',
    flex: 0
  },
  showDetailsHost: { fontStyle: 'italic' }
})

export default Container.create(Radio)
