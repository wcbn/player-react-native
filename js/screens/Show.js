import React from 'react'
import Separator from '../components/Separator'
import Screen from '../components/Screen'
import { getDefaultNavigationOptions } from '../util/navigation'
import { humanizeTime, humanizeDate } from '../util/datetime'
import { DjScroll, ShowDescription, EpisodeList} from '../components/show'

export default class Show extends React.PureComponent {
  static navigationOptions = ({ navigation, screenProps }) => {
    return {
      title: navigation.getParam('title', ''),
      ...getDefaultNavigationOptions(screenProps.theme)
    }
  }

  state = {
    description: '',
    djs: [],
    episodes: []
  }

  componentDidMount() {
    fetch(`https://app.wcbn.org${this.props.navigation.getParam('url')}.json`)
      .then(response => response.json())
      .then(response => {
        response.episodes.forEach(e => {
          e.beginning = humanizeDate(e.beginning)

          e.songs.forEach(song => {
            song.at = humanizeTime(song.at)
          })
        })

        this.setState({
          description: response.description,
          djs: response.djs,
          episodes: response.episodes
        })
      })
  }

  render() {
    return (
      <Screen>
        <DjScroll djs={this.state.djs} navigation={this.props.navigation} />
        <Separator />
        <ShowDescription text={this.state.description} />
        <EpisodeList
          episodes={this.state.episodes}
          navigation={this.props.navigation}
        />
      </Screen>
    )
  }
}
