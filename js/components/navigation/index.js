import React from 'react'
import { connect } from 'react-redux'
import AppContainer from './AppContainer'
import { fetchPlaylist } from '../../redux/actionCreators'

const mapDispatchToProps = {
  fetchPlaylist
}

class ReduxWrapper extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    const pollPlaylist = async () => {
      try {
        const data = await this.props.fetchPlaylist()
      } catch (error) {} //pass on errors
    }

    pollPlaylist()
    setInterval(pollPlaylist, 40000)
  }
  render() {
    return <AppContainer screenProps={this.props.screenProps} />
  }
}

export default connect(null, mapDispatchToProps)(ReduxWrapper)
