import React from 'react'
import { StyleSheet, Text, View, Image, FlatList, Linking } from 'react-native'
import HTML from 'react-native-render-html'
import { windowStyles, headerStyles, listStyles } from './styles/components'
import { ScrollView } from 'react-native-gesture-handler'
import { colors } from './styles/main'
import Separator from './components/Separator'
import ShowListing from './components/ShowListing'

export default class Profile extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('title', ''),
      ...headerStyles
    }
  }

  constructor() {
    super()
    this.state = {
      dj_name: '',
      about: ' ',
      shows: [],
      website: '',
      public_email: '',
      real_name: ''
    }
  }

  componentDidMount() {
    this.fetchDJ()
  }

  fetchDJ() {
    fetch(`https://app.wcbn.org${this.props.navigation.getParam('url')}.json`)
      .then(response => response.json())
      .then(data => this.setState(data))
  }

  renderCover() {
    return (
      <View style={styles.cover}>
        <Image
          style={{
            width: 66,
            height: 66,
            borderRadius: 20,
            borderColor: colors.active,
            borderWidth: 1
          }}
          source={{ uri: this.state.image_url }}
        />
        <View style={{ flexDirection: 'column', paddingLeft: 15 }}>
          <Text style={styles.coverHeader}>{this.state.real_name}</Text>
          <Text
            style={styles.coverText}
            onPress={() => {
              Linking.openURL(this.state.website)
            }}
          >
            {this.state.website}
          </Text>
          <Text style={styles.coverText}>{this.state.public_email}</Text>
        </View>
      </View>
    )
  }

  renderHeader = () => {
    return (
      <View style={listStyles.sectionHeader}>
        <Text style={listStyles.sectionHeaderText}>Show History</Text>
      </View>
    )
  }

  renderShows() {
    return (
      <FlatList
        data={this.state.shows}
        renderItem={({ item }) => <ShowListing data={item} />}
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={this.renderHeader}
        ItemSeparatorComponent={() => (
          <Separator color={colors.grayHighlight} />
        )}
      />
    )
  }

  render() {
    return (
      <View style={windowStyles.container}>
        <ScrollView>
          <View style={styles.about}>
            {this.renderCover()}

            <HTML html={this.state.about} baseFontStyle={styles.aboutText} />
          </View>
          {this.renderShows()}
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  cover: {
    flexDirection: 'row',
    marginBottom: 15
  },
  coverText: {
    color: colors.active,
    lineHeight: 20
  },
  coverHeader: {
    fontSize: 20,
    color: colors.active
  },
  about: {
    padding: 20
  },
  aboutText: {
    color: colors.inactive
  }
})
