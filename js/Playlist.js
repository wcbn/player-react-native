import React from 'react'
import { Text, View, FlatList, ScrollView } from 'react-native'

import { Container } from 'flux/utils'
import OnAirStore from './flux/OnAirStore'
import Song from './components/Song'
import Separator from './components/Separator'
import {
  windowStyles,
  headerStyles,
  basicInfoBoxStyles
} from './styles/components'
import { colors } from './styles/main'
import ListHeader from './components/ListHeader'
import Banner from './components/Banner'

class Playlist extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('title', 'Playlist'),
      ...headerStyles
    }
  }

  static getStores() {
    return [OnAirStore]
  }

  static calculateState(prevState) {
    return {
      on_air: OnAirStore.getState() //todo create a songs state and only update that
    }
  }

  componentDidMount() {
    this.props.navigation.setParams({ title: this.state.on_air.name })
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.on_air.name !== prevState.on_air.name) {
      this.props.navigation.setParams({ title: this.state.on_air.name })
    }
  }

  renderSongs() {
    return (
      <ScrollView>
        <FlatList
          data={this.state.on_air.songs}
          renderItem={({ item }) => <Song data={item} />}
          keyExtractor={(item, index) => index.toString()}
          ListHeaderComponent={<ListHeader text="Recent Songs" />}
          ItemSeparatorComponent={() => (
            <Separator color={colors.grayHighlight} />
          )}
        />
      </ScrollView>
    )
  }

  renderNotice() {
    return (
      <View style={basicInfoBoxStyles}>
        <Text style={{ color: colors.inactive }}>
          No recent songs to display
        </Text>
      </View>
    )
  }

  render() {
    return (
      <View style={windowStyles.container}>
        <Banner
          text={'On the air:'}
          host={this.state.on_air.dj}
          onPress={() =>
            this.props.navigation.navigate('Profile', {
              url: this.state.on_air.dj_url,
              title: this.state.on_air.dj
            })
          }
        />
        <Separator color={colors.inactive} />
        {this.state.on_air.songs.length
          ? this.renderSongs()
          : this.renderNotice()}
      </View>
    )
  }
}

export default Container.create(Playlist)
