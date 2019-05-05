import React from 'react'
import {
  Text,
  View,
  FlatList,
  TouchableOpacity
} from 'react-native'
import Song from './components/Song'
import { colors } from './styles/main'
import {
  windowStyles,
  headerStyles,
  bannerStyles
} from './styles/components'
import Separator from './components/Separator'
import ListHeader from './components/ListHeader'

// since the only way to get to this screen is from a Show,
// all of the data is passed in as navigation props, saving us an expensive fetch()

export default class Episode extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('title', ''),
      ...headerStyles
    }
  }

  renderBanner() {
    return (
      <TouchableOpacity
        style={bannerStyles}
        onPress={() =>
          this.props.navigation.navigate('Profile', {
            url: this.props.navigation.getParam('dj_url', ''),
            title: this.props.navigation.getParam('dj', '')
          })
        }
      >
        <Text style={bannerStyles.text}>Host: </Text>
        <Text style={bannerStyles.host}>
          {this.props.navigation.getParam('dj', '')}
        </Text>
        <Text style={bannerStyles.arrow}>→</Text>
      </TouchableOpacity>
    )
  }

  renderSongs() {
    return (
      <FlatList
        data={this.props.navigation.getParam('songs', '')}
        renderItem={({ item }) => <Song data={item} />}
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={
          <ListHeader text={this.props.navigation.getParam('date')} />
        }
        ItemSeparatorComponent={() => (
          <Separator color={colors.grayHighlight} />
        )}
      />
    )
  }

  render() {
    return (
      <View style={windowStyles.container}>
        {this.renderBanner()}
        <Separator color={colors.inactive} />
        {this.renderSongs()}
      </View>
    )
  }
}
