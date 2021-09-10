import TrackPlayer, { Event, Capability } from 'react-native-track-player'

module.exports = async function () {
  const capabilities = [
    Capability.Play,
    Capability.PlayFromId,
    Capability.PlayFromSearch,
    Capability.Stop,
  ]

  TrackPlayer.addEventListener(Event.RemotePlay, () => TrackPlayer.play())
  TrackPlayer.addEventListener(Event.RemoteStop, () => TrackPlayer.stop())

  TrackPlayer.updateOptions({
    stopWithApp: true,
    capabilities,
    notificationCapabilities: capabilities,
    compactCapabilities: capabilities,
    // options.icon
    // options.playIcon
    // options.stopIcon
    // options.color
  })
}
