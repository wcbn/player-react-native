import React from 'react'
import { View, FlatList } from 'react-native'
import Song from './components/Song'
import { colors } from './styles/main'
import { windowStyles, headerStyles } from './styles/components'
import Separator from './components/Separator'
import ListHeader from './components/ListHeader'
import Banner from './components/Banner'

// since the only way to get to this screen is from a Show,
// all of the data is passed in as navigation props, saving us an expensive fetch()

export default class Episode extends React.PureComponent {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('title', ''),
      ...headerStyles
    }
  }

  render() {
    return (
      <View style={windowStyles.container}>
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
        <Separator color={colors.inactive} />
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
      </View>
    )
  }
}
