import React from 'react'
import OnAirDispatcher from '../flux/OnAirDispatcher'
import { humanizeTime } from '../util/datetime'

class OnAirPoll extends React.PureComponent {
  componentDidMount() {
    const pollPlaylist = async () => {
      try {
        const data = await this.fetchPlaylist()

        OnAirDispatcher.dispatch({
          type: 'SET_ON_AIR',
          data
        })
      } catch (error) {} //pass on errors
    }

    pollPlaylist()
    setInterval(pollPlaylist, 40000)
  }

  fetchPlaylist() {
    return new Promise(resolve => {
      fetch('https://app.wcbn.org/playlist.json')
        .then(response => response.json())
        .then(data => {
          data.on_air.songs.forEach(song => {
            song.at = humanizeTime(song.at)
          })
          resolve(data.on_air)
        })
    })
  }

  render() {
    return null
  }
}

export default OnAirPoll
