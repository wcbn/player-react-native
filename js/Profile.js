import React from 'react'
import { StyleSheet, Text, View, Image, FlatList, Linking } from 'react-native'
import HTML from 'react-native-render-html'
import { windowStyles, headerStyles, listStyles } from './styles/components'
import { ScrollView } from 'react-native-gesture-handler'
import { colors, dimensions } from './styles/main'
import Separator from './components/Separator'
import ShowListing from './components/ShowListing'
import ListHeader from './components/ListHeader'

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
      about: '',
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
          style={styles.coverAvatar}
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
          <Text
            style={styles.coverText}
            onPress={() => {
              Linking.openURL(`mailto:${this.state.public_email}`)
            }}
          >
            {this.state.public_email}
          </Text>
        </View>
      </View>
    )
  }

  renderHtml() {
    if (this.state.about) {
      return (
        <HTML
          html={this.state.about}
          baseFontStyle={styles.aboutText}
          renderers={renderers}
          tagsStyles={tagsStyles}
          imagesMaxWidth={dimensions.fullWidth}
          onLinkPress={(event, href) => {
            Linking.openURL(href)
          }}
        />
      )
    }
  }

  renderShows() {
    if (this.state.shows.length > 0) {
      return (
        <FlatList
          data={this.state.shows}
          renderItem={({ item }) => <ShowListing data={item} />}
          keyExtractor={(item, index) => index.toString()}
          ListHeaderComponent={<ListHeader text="Show History" />}
          ItemSeparatorComponent={() => (
            <Separator color={colors.grayHighlight} />
          )}
        />
      )
    }
  }

  render() {
    return (
      <View style={windowStyles.container}>
        <ScrollView>
          <View style={styles.about}>
            {this.renderCover()}
            {this.renderHtml()}
          </View>
          {this.renderShows()}
        </ScrollView>
      </View>
    )
  }
}

const renderers = {
  img: (htmlAttribs, children, convertedCSSStyles, passProps) => (
    <Image
      style={{
        borderColor: colors.active,
        height:
          (parseInt(htmlAttribs.height) * passProps.imagesMaxWidth) /
          parseInt(htmlAttribs.width),
        marginTop: 15,
        marginBottom: 2
      }}
      source={{ uri: `https://app.wcbn.org${htmlAttribs.src}` }}
      key={htmlAttribs.src}
    />
  )
}

const tagsStyles = {
  figcaption: { textAlign: 'center', fontStyle: 'italic', color: colors.active }
}

const styles = StyleSheet.create({
  cover: {
    flexDirection: 'row',
    marginBottom: 15
  },
  coverAvatar: {
    width: 66,
    height: 66,
    borderRadius: 20,
    borderColor: colors.active,
    borderWidth: 1
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
