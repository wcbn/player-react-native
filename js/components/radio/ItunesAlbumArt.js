import React from 'react'
import { Image } from 'react-native'

export default class ItunesAlbumArt extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      src: this.props.default
    }
  }

  fetchAlbumArt() {
    return new Promise(resolve => {
      if (this.props.name == null) {
        resolve(this.props.default)
      }

      const searchTerm = `${this.props.artist} ${
        this.props.album ? this.props.album : this.props.name
      }`

      fetch(
        `https://itunes.apple.com/search?limit=1&entity=album&term=${encodeURI(
          searchTerm
        )}`
      )
        .then(response => response.json())
        .then(data => {
          const res = data.results[0]

          if (res === undefined) {
            resolve(this.props.default)
          } else {
            resolve({ uri: res.artworkUrl100.replace('100x100', '600x600') })
          }
        })
    })
  }

  componentDidUpdate(prevProps) {
    if (this.props.name !== prevProps.name) {
      this.fetchAlbumArt().then(result => {
        this.setState({ src: result })
        this.props.onChange(result)
      })
    }
  }

  componentDidMount() {
    this.fetchAlbumArt().then(result => {
      this.setState({ src: result })
      this.props.onChange(result)
    })
  }

  render() {
    const src = this.props.showPlayButton
      ? this.props.playButton
      : this.state.src
    return <Image source={src} style={this.props.style} />
  }
}
