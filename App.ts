import 'expo-dev-client'
import TrackPlayer from 'react-native-track-player'

import App from './src/App'
TrackPlayer.registerPlaybackService(() => require('./src/util/playback'))
export default App
