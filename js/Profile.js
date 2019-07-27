import React from 'react'
import { StyleSheet, View, Image, FlatList, Linking } from 'react-native'
import HTML from 'react-native-render-html'
import { ScrollView } from 'react-native-gesture-handler'
import { dimensions } from './styles/main'
import Separator from './components/Separator'
import ListHeader from './components/ListHeader'
import { getDefaultNavigationOptions } from './util/navigation'
import Screen from './components/Screen'
import ThemedText from './components/ThemedText'
import ListItemWrapper from './components/ListItemWrapper'

export default class Profile extends React.PureComponent {
  static navigationOptions = ({ navigation, screenProps }) => {
    return {
      title: navigation.getParam('title', ''),
      ...getDefaultNavigationOptions(screenProps.theme)
    }
  }

  state = {
    dj_name: '',
    about: '',
    shows: [],
    website: '',
    public_email: '',
    real_name: ''
  }

  componentDidMount() {
    fetch(`https://app.wcbn.org${this.props.navigation.getParam('url')}.json`)
      .then(response => response.json())
      .then(data => this.setState(data))
  }

  renderers = {
    img: (htmlAttribs, children, convertedCSSStyles, passProps) => (
      <Image
        style={{
          borderColor: this.props.screenProps.theme.secondary,
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

  listsPrefixesRenderers = {
    ul: (htmlAttribs, children, convertedCSSStyles, passProps) => (
      <ThemedText style={styles.listsPrefixesRenderers} color={'secondary'}>
        •
      </ThemedText>
    )
  }

  tagsStyles = {
    figure: {
      marginBottom: 15
    },
    figcaption: {
      textAlign: 'center',
      fontStyle: 'italic',
      color: this.props.screenProps.theme.secondary
    },
    a: {
      color: this.props.screenProps.theme.anchorColor,
      textDecorationLine: 'none'
    }
  }

  renderCover() {
    return (
      <View style={styles.cover}>
        <Image
          style={styles.coverAvatar}
          source={{ uri: this.state.image_url }}
        />
        <View style={styles.coverContact}>
          {!!this.state.real_name && (
            <ThemedText
              color={'secondary'}
              style={styles.coverRealName}
              numberOfLines={1}
            >
              {this.state.real_name}
            </ThemedText>
          )}

          {!!this.state.website && (
            <ThemedText
              color={'anchorColor'}
              style={styles.coverText}
              numberOfLines={1}
              onPress={() => {
                Linking.openURL(this.state.website)
              }}
            >
              {this.state.website}
            </ThemedText>
          )}

          {!!this.state.public_email && (
            <ThemedText
              color={'anchorColor'}
              style={styles.coverText}
              numberOfLines={1}
              onPress={() => {
                Linking.openURL(`mailto:${this.state.public_email}`)
              }}
            >
              {this.state.public_email}
            </ThemedText>
          )}
        </View>
      </View>
    )
  }

  renderHtml() {
    if (this.state.about) {
      return (
        <HTML
          html={this.state.about}
          baseFontStyle={{
            color: this.props.screenProps.theme.textColor
            // fontFamily: 'Futura'
          }}
          renderers={this.renderers}
          listsPrefixesRenderers={this.listsPrefixesRenderers}
          tagsStyles={this.tagsStyles}
          imagesMaxWidth={dimensions.fullWidth}
          onLinkPress={(event, href) => {
            Linking.openURL(href)
          }}
        />
      )
    }
  }

  renderShowListing = ({ item }) => {
    return (
      <ListItemWrapper>
        <ThemedText>{item.name}</ThemedText>
      </ListItemWrapper>
    )
  }

  renderShows() {
    if (this.state.shows.length > 0) {
      return (
        <FlatList
          data={this.state.shows}
          renderItem={this.renderShowListing}
          keyExtractor={(item, index) => index.toString()}
          ListHeaderComponent={<ListHeader text="Show History" />}
          ItemSeparatorComponent={() => (
            <Separator color={this.props.screenProps.theme.muted} />
          )}
        />
      )
    }
  }

  render() {
    return (
      <Screen>
        <ScrollView overScrollMode={'never'}>
          <View style={styles.about}>
            {this.renderCover()}
            {this.renderHtml()}
          </View>
          {this.renderShows()}
        </ScrollView>
      </Screen>
    )
  }
}

const styles = StyleSheet.create({
  cover: {
    flexDirection: 'row',
    marginBottom: 15
  },
  coverAvatar: {
    width: 66,
    height: 66,
    borderRadius: 10
  },
  coverContact: {
    flexDirection: 'column',
    marginLeft: 15
  },
  coverText: {
    lineHeight: 20
  },
  coverRealName: {
    fontSize: 20
  },
  about: {
    padding: 15
  },
  listsPrefixesRenderers: {
    marginRight: 5
  }
})
