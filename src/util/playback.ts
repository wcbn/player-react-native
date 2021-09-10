import TrackPlayer, { Event, Capability } from 'react-native-track-player'

module.exports = async function () {
  const capabilities = [
    Capability.Play,
    Capability.PlayFromId,
    Capability.PlayFromSearch,
    Capability.Stop,
    // Capability.Pause
  ]
  TrackPlayer.addEventListener(Event.RemotePlay, () => TrackPlayer.play())

  TrackPlayer.addEventListener(Event.RemoteStop, () => TrackPlayer.stop())

  // TrackPlayer.addEventListener(Event.RemotePause, () => TrackPlayer.pause())

  TrackPlayer.updateOptions({
    stopWithApp: true,
    capabilities,
    notificationCapabilities: capabilities,
    compactCapabilities: capabilities,
    // options.icon
    // options.playIcon
    // options.pauseIcon
    // options.stopIcon
    // options.color
  })
}
