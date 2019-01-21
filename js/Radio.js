import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  AsyncStorage
} from 'react-native'
import Settings from './Settings'
import { Audio } from 'expo'
import Icon from 'react-native-vector-icons/Ionicons'
import { colors } from './styles/main'
import { windowStyles } from './styles/components'
// import TrackPlayer from 'react-native-track-player'
// import RNMusicMetadata from 'react-native-music-metadata'

export default class Radio extends React.Component {
  static navigationOptions = {
    title: 'Radio'
  }

  constructor() {
    super()
    this.state = {
      uri: 'http://floyd.wcbn.org:8000/wcbn-hd.mp3',
      isPlaying: false,
      isBuffering: false,
      isLoading: true,
      isUnloading: false
    }

    this.playbackInstance = null
    this._loadNewPlaybackInstance()
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

  _onPlayPausePressed = () => {
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

  render() {
    return (
      <View style={styles.container}>
        {/* <Text style={styles.infoText}>
          Playing: {this.state.isPlaying.toString()}
        </Text>
        <Text style={styles.infoText}>
          Buffering: {this.state.isBuffering.toString()}
        </Text>
        <Text style={styles.infoText}>
          Loading: {this.state.isLoading.toString()}
        </Text>
        <Text style={styles.infoText}>
          Unloading: {this.state.isUnloading.toString()}
        </Text> */}
        <Icon
          name={this.state.isPlaying ? 'ios-pause' : 'ios-play'}
          size={200}
          color={colors.active}
          onPress={this._onPlayPausePressed}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#212733'
  },
  infoText: {
    color: colors.inactive
  }
})
