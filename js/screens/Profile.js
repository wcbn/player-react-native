import React from 'react'
import { StyleSheet, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { getDefaultNavigationOptions } from '../util/navigation'
import Screen from '../components/Screen'
import { spacing } from '../styles/main'
import { ShowHistory, DjCover, DjBio} from '../components/profile'

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

  render() {
    return (
      <Screen>
        <ScrollView overScrollMode={'never'}>
          <View style={styles.container}>
            <DjCover
              dj_name={this.state.dj_name}
              website={this.state.website}
              public_email={this.state.public_email}
              real_name={this.state.real_name}
              image_url={this.state.image_url}
            />
            <DjBio about={this.state.about} />
          </View>
          <ShowHistory shows={this.state.shows} />
        </ScrollView>
      </Screen>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.md
  }
})
