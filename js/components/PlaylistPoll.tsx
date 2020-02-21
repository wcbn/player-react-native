import React, { ReactChildren } from 'react'
import { connect } from 'react-redux'
import { fetchPlaylist } from '../redux/actionCreators'
import { POLL_INTERVAL } from '../config'

const mapDispatchToProps = {
  fetchPlaylist
}

class PlaylistPoll extends React.Component<{ fetchPlaylist: Function }> {
  componentDidMount() {
    const pollPlaylist = async () => {
      try {
        this.props.fetchPlaylist()
      } catch (error) {
        console.log('ERROR', error)
      } //pass on errors
    }

    pollPlaylist()
    setInterval(pollPlaylist, POLL_INTERVAL)
  }
  render() {
    return this.props.children
  }
}

export default connect(null, mapDispatchToProps)(PlaylistPoll)
