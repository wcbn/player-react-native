// async _onPlayPausePressed() {
//   await this.soundObject.setIsMutedAsync(this.state.playing)
//   this.setState({
//     playing: !this.state.playing
//   })

//   if (this.playbackInstance != null) {
//     if (this.state.playing) {
//       this.playbackInstance.pauseAsync()
//     } else {
//       this.playbackInstance.playAsync()
//     }
//   }
// }

// .then(data => {
//   if (!data.about) {
//     data.about = 'This DJ has not written a bio'
//   }
//   this.setState(data)
// })