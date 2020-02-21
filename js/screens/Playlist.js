import React from 'react'
import { View, FlatList, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import Song from '../components/Song'
import Separator from '../components/Separator'
import ListHeader from '../components/ListHeader'
import Banner from '../components/Banner'
import Screen from '../components/Screen'
import ThemedText from '../components/ThemedText'
import { getDefaultNavigationOptions } from '../util/navigation'

const mapStateToProps = state => {
  return {
    playlist: state.playlist
  }
}

class Playlist extends React.Component {
  static navigationOptions = ({ navigation, screenProps }) => {
    return {
      title: navigation.getParam('title', 'Playlist'),
      ...getDefaultNavigationOptions(screenProps.theme)
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.playlist.on_air.name !== prevProps.playlist.on_air.name) {
      this.props.navigation.setParams({
        title: this.props.playlist.on_air.name
      })
    }
  }

  renderSongs = () => (
    <FlatList
      data={this.props.playlist.on_air.songs}
      renderItem={({ item }) => <Song data={item} />}
      keyExtractor={(item, index) => index.toString()}
      ListHeaderComponent={<ListHeader text="Recent Songs" />}
      stickyHeaderIndices={[0]}
      overScrollMode={'never'}
      ItemSeparatorComponent={() => (
        <Separator color={this.props.screenProps.theme.muted} />
      )}
    />
  )

  renderNotice = () => (
    <View style={styles.infoBox}>
      <ThemedText>No recent songs to display</ThemedText>
    </View>
  )

  render() {
    return (
      <Screen>
        <Banner
          text={'On the air:'}
          host={this.props.playlist.on_air.dj}
          onPress={() =>
            this.props.navigation.navigate('Profile', {
              url: this.props.playlist.on_air.dj_url,
              title: this.props.playlist.on_air.dj
            })
          }
        />
        {this.props.playlist.on_air.songs.length
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
  }
})

export default connect(mapStateToProps)(Playlist)
