import React from 'react'
import { FlatList } from 'react-native'
import Song from '../components/Song'
import Separator from '../components/Separator'
import ListHeader from '../components/ListHeader'
import Banner from '../components/Banner'
import { getDefaultNavigationOptions } from '../util/navigation'
import Screen from '../components/Screen'

// since the only way to get to this screen is from a Show,
// all of the data is passed in as navigation props, saving us an expensive fetch()

export default class Episode extends React.PureComponent {
  static navigationOptions = ({ navigation, screenProps }) => {
    return {
      title: navigation.getParam('title', ''),
      ...getDefaultNavigationOptions(screenProps.theme)
    }
  }

  render() {
    return (
      <Screen>
        <Banner
          text={'Host:'}
          host={this.props.navigation.getParam('dj', '')}
          onPress={() =>
            this.props.navigation.navigate('Profile', {
              url: this.props.navigation.getParam('dj_url', ''),
              title: this.props.navigation.getParam('dj', '')
            })
          }
        />
        <FlatList
          data={this.props.navigation.getParam('songs', '')}
          renderItem={({ item }) => <Song data={item} />}
          keyExtractor={(item, index) => index.toString()}
          ListHeaderComponent={
            <ListHeader text={this.props.navigation.getParam('date')} />
          }
          stickyHeaderIndices={[0]}
          overScrollMode={'never'}
          ItemSeparatorComponent={() => (
            <Separator color={this.props.screenProps.theme.muted} />
          )}
        />
      </Screen>
    )
  }
}
