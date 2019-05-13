import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
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
        <TouchableOpacity
      style={styles.container}
      onPress={this._onPress      }
    >
      <Icon name={'md-text'} size={30} color={colors.active} />
      <View style={styles.textContainer}>
        <Text style={styles.text}>Message the DJ</Text>
      </View>
    </TouchableOpacity>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 10
  },
  textContainer: {
    flex: 1,
    marginLeft: 20,
    alignItems: 'center',
    flexDirection: 'row'
  },
  text: {
    color: colors.active
  }
})

