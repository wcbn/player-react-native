import React from 'react'
import { NetInfo, View, Text, StyleSheet } from 'react-native'

class NetInfoListener extends React.PureComponent {
  constructor() {
    super()
    this.state = {
      isConnected: true
    }
  }

  componentDidMount() {
    NetInfo.isConnected.fetch().then(isConnected => {
      this.setState({ isConnected })
    })

    NetInfo.isConnected.addEventListener(
      'connectionChange',
      this.handleConnectivityChange
    )
  }

  handleConnectivityChange = isConnected => {
    this.setState({ isConnected })
  }

  render() {
    return this.state.isConnected ? (
      this.props.children
    ) : (
      <View style={styles.view}>
        <Text style={styles.text}>Sorry</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: 'white'
  }
})

export default NetInfoListener
