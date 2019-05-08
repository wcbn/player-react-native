import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { SMS } from 'expo'
import Icon from 'react-native-vector-icons/Ionicons'
import { colors } from '../../styles/main'

export default class SmsExpo extends React.PureComponent {
  constructor() {
    super()

    this.state = {
      available: true
    }
  }

  componentDidMount() {
    SMS.isAvailableAsync().then(x => {
      this.setState({ available: x })
    })
  }

  _onPress() {
    SMS.sendSMSAsync(['radio@wcbn.org'], 'Sounds great!')
  }

  render() {
    if (!this.state.available) {
      return null
    } else {
      return (
        <View style={styles.test}>
          <Icon
            name={'ios-text'}
            size={37}
            color={colors.active}
            style={styles.icon}
            onPress={this._onPress}
          />
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  test: {
    width: 30,
    height: 30,
    // backgroundColor: 'yellow',
    padding: 30,
    position: 'absolute',
    bottom: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    position: 'absolute'
  }
})
