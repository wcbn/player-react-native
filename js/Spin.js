import React from 'react'
import { StyleSheet, Text, View, Animated } from 'react-native'
import { windowStyles } from './styles/components'

export default class Spin extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      opacities: new Array(this.props.lines).fill(new Animated.Value(0)),
      x: 0,
      y: 0
    }
  }

  componentDidMount() {
    this.animate()
  }

  animate() {
    this.state.opacities.forEach((elem, i) => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(this.state.opacities[i], {
            toValue: 1
            // delay: i * 100 // / this.props.lines / 20
          }),
          Animated.timing(this.state.opacities[i], {
            toValue: 0
            // delay: i * 100 // / this.props.lines / 20
          })
        ])
      ).start()
    })
  }

  render() {
    const blocks = Array(this.props.lines)
      .fill()
      .map((_, i) => {
        const angle = (~~((360 / this.props.lines) * i) * Math.PI) / 180 //+ opts.rotate

        return (
          <Animated.View
            key={i}
            style={{
              backgroundColor: 'yellow',
              borderRadius: '50%',
              position: 'absolute',
              height: this.props.width,
              width: this.props.width,
              transform: [
                { translateX: this.props.radius * Math.sin(angle) },
                { translateY: this.props.radius * Math.cos(angle) }
              ],
              opacity: this.state.opacities[i]
            }}
          />
        )
      })

    return (
      <View style={styles.container}>
        {blocks}
      </View>
    )
  }
}

Spin.defaultProps = {
  lines: 12,
  radius: 50,
  width: 2
}

const styles = StyleSheet.create({
  container: {}
})
