import React from 'react'
import { View, FlatList, ScrollView, StyleSheet } from 'react-native'

import { Container } from 'flux/utils'
import OnAirStore from './flux/OnAirStore'
import Song from './components/Song'
import Separator from './components/Separator'
import { headerStyles } from './styles/components'
import ListHeader from './components/ListHeader'
import Banner from './components/Banner'
import Screen from './components/Screen';
import ThemedText from './components/ThemedText';
import { withTheme } from './styles/theming';

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
            <Separator color={this.props.theme.muted} />
          )}
        />
      </ScrollView>
    )
  }

  renderNotice() {
    return (
      <View style={styles.infoBox}>
        <ThemedText>No recent songs to display</ThemedText>
      </View>
    )
  }

  render() {
    return (
      <Screen>
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
        <Separator color={this.props.theme.textColor} />
        {this.state.on_air.songs.length
          ? this.renderSongs()
          : this.renderNotice()}

      </Screen>
    )
  }
}

const styles = StyleSheet.create({
  infoBox: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
})

export default withTheme(Container.create(Playlist))


