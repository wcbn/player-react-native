import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import {
  ImageBackground,
  View,
  StyleSheet,
  Image,
  ScrollView,
  Platform,
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import TrackPlayer, {
  Event,
  IOSCategory,
  IOSCategoryOptions,
  State,
  TrackType,
  useTrackPlayerEvents,
} from 'react-native-track-player'
import Screen from '../components/Screen'
import { SongAPI } from '../types'
import { getAlbumArtURI } from '../util/itunes'
import { FadeIntoHeader, RadioControls } from '../components/radio'
import { dimensions, spacing } from '../styles/main'
import ThemedText from '../components/ThemedText'
import { STREAMS, STREAM_TRACK_ID } from '../config'
import { StoreState } from '../App'

const defaultArtwork = require('../../assets/album.png')
const defaultSong: SongAPI = {
  at: '',
  name: '',
  artist: '',
  album: '',
  label: '',
  request: false,
  year: null,
}

function TextScroll({ text }: { text: string }) {
  return (
    <View style={styles.textScroll}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        centerContent
        overScrollMode="never"
      >
        <ThemedText style={styles.songText}>{text || '—'}</ThemedText>
      </ScrollView>
    </View>
  )
}

function getArtistAlbumLabelYear(s: SongAPI) {
  return `${s.artist}${s.artist && s.album && ' — '}${s.album}${
    s.label && s.year && ' (' + s.label + ', ' + s.year + ')'
  }`
}

async function setup() {
  return TrackPlayer.setupPlayer({
    waitForBuffer: true,
    iosCategory: IOSCategory.Playback,
    iosCategoryOptions: [
      IOSCategoryOptions.AllowAirPlay,
      IOSCategoryOptions.AllowBluetooth,
      IOSCategoryOptions.AllowBluetoothA2DP,
      IOSCategoryOptions.DefaultToSpeaker,
    ],
  })
}

async function stop() {
  return TrackPlayer.reset()
}

const events = [
  Event.PlaybackState,
  Event.PlaybackError,
  Event.PlaybackMetadataReceived,
  Event.RemotePlay,
  Event.RemoteStop,
].concat(
  Platform.OS === 'android' ? [Event.RemotePlaySearch, Event.RemotePlayId] : []
)

export default function Radio() {
  const playlistData = useSelector((state: StoreState) => state.playlist.on_air)
  const song =
    playlistData.songs.length > 0 ? playlistData.songs[0] : defaultSong

  const [albumArtURI, setAlbumArtURI] = useState('')
  const albumArtObj = albumArtURI ? { uri: albumArtURI } : defaultArtwork

  const artistAlbumLabelYear = getArtistAlbumLabelYear(song)

  const [playerState, setPlayerState] = useState(State.None)

  const play = async () => {
    await stop()

    let url = await AsyncStorage.getItem('STREAM_URL')

    if (!url) {
      url = STREAMS[2] //default
      AsyncStorage.setItem('STREAM_URL', url)
    }

    await TrackPlayer.add({
      id: STREAM_TRACK_ID,
      url,
      title: song.name,
      artist: song.artist,
      artwork: albumArtURI || defaultArtwork,
      album: song.album,
      type: TrackType.Dash,
    })

    await TrackPlayer.play()
  }

  useEffect(() => {
    setup().then(() => play())
    return () => TrackPlayer.destroy()
  }, [])

  useTrackPlayerEvents(events, (event) => {
    if (event.type === Event.PlaybackState) {
      return setPlayerState(event.state)
    }
    if (event.type === Event.RemotePlay) {
      console.log('remote play')
      return play()
    }
    if (event.type === Event.RemoteStop) {
      console.log('remote stop')
      return stop()
    }
    if (event.type === Event.PlaybackError) {
      console.warn('Error code: ', event.code, event.message)
      return stop()
    }
    if (event.type === Event.PlaybackMetadataReceived) {
      console.log('meta ', event)
      // source 	string 	The metadata source (id3, icy, icy-headers, vorbis-comment, quicktime)
      // title 	  string 	The track title. Might be null
      // url    	string 	The track url. Might be null
      // artist 	string 	The track artist. Might be null
      // album  	string 	The track album. Might be null
      // date   	string 	The track date. Might be null
      // genre  	string 	The track genre. Might be null
    } else if (event.type === Event.RemotePlaySearch) {
      // e.g. voice activate
      let q: string = event.query
      q = q.toUpperCase()
      if (q.includes('STOP')) {
        return stop()
      }
      if (q.includes('PLAY')) {
        return play()
      }
    } else if (event.type === Event.RemotePlayId) {
      if (event.id === STREAM_TRACK_ID) {
        play()
      }
    }
  })

  useEffect(() => {
    const doAsync = async () => {
      if (playlistData.songs.length === 0) {
        return setAlbumArtURI('')
      }
      const albumArtURI = await getAlbumArtURI(playlistData.songs[0])
      setAlbumArtURI(albumArtURI)
      TrackPlayer.updateMetadataForTrack(0, {
        artwork: albumArtURI || defaultArtwork,
        title: song.name,
        artist: song.artist,
        album: song.album,
      })
    }
    doAsync()
  }, [song])

  const handlePress = async () => {
    if (playerState === State.Playing) {
      return stop()
    }
    return play()
  }

  return (
    <Screen>
      <ImageBackground
        style={styles.imgBG}
        imageStyle={styles.imageStyle}
        source={albumArtObj}
      >
        <FadeIntoHeader />
        <View style={styles.contentWrapper}>
          <RadioControls onPress={handlePress} />
          <View style={styles.songDetails}>
            <TextScroll text={song.name} />
            <TextScroll text={artistAlbumLabelYear} />
          </View>
          <View style={styles.albumArtContainer}>
            <Image source={albumArtObj} style={styles.albumArt} />
          </View>
        </View>
      </ImageBackground>
    </Screen>
  )
}

const ALBUM_WIDTH = dimensions.fullWidth / 1.6
const TEXT_HEIGHT = 25

const styles = StyleSheet.create({
  albumArtContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentWrapper: {
    alignItems: 'center',
    flexDirection: 'column-reverse',
  },
  imgBG: {
    height: '100%',
    alignItems: 'center',
    paddingLeft: spacing.md,
    paddingRight: spacing.md,
  },
  imageStyle: {
    opacity: 0.4,
  },
  albumArt: {
    width: ALBUM_WIDTH,
    height: ALBUM_WIDTH,
    maxWidth: ALBUM_WIDTH,
    maxHeight: ALBUM_WIDTH,
    aspectRatio: 1,
  },
  songDetails: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    minHeight: (TEXT_HEIGHT + 10) * 2 + 15,
  },
  songText: {
    fontSize: TEXT_HEIGHT,
  },
  textScroll: {
    height: TEXT_HEIGHT + 10,
  },
})
