import React from 'react'
import { StyleSheet, Text, View, Animated } from 'react-native'
import { windowStyles } from './styles/components'

export default class Spin extends React.Component {
  constructor() {
    super()
    this.state = {
      fadeAnim: new Animated.Value(0),
      x: 0,
      y: 0
    }
  }


  componentDidMount() {

    Animated.loop(
      Animated.sequence([
        Animated.timing(
          // Animate over time
          this.state.fadeAnim, // The animated value to drive
          {
            toValue: 1, // Animate to opacity: 1 (opaque)
            duration: 800 // Make it take a while
          }
        ),
        Animated.timing(
          // Animate over time
          this.state.fadeAnim, // The animated value to drive
          {
            toValue: 0, // Animate to opacity: 1 (opaque)
            duration: 800 // Make it take a while
          }
        )
      ])
    ).start()
  }

  render() {
    let { fadeAnim } = this.state

    const blocks = Array(this.props.lines)
      .fill()
      .map((_, i) => {
        // var angle = ~~((360 / this.props.lines) * i) //+ opts.rotate
        var angle = (~~((360 / this.props.lines) * i) * Math.PI) / 180 //+ opts.rotate
        // console.log(angle)
        // console.log(25 * Math.cos(angle))
        // console.log(25 * Math.sin(angle))
        // console.log('--------')

        // transformX(Math.cos(angle) * dx - Math.sin(angle) * dy)
        // transformY(Math.sin(angle) * dx + Math.cos(angle) * dy)

        return (
          <Animated.View // Special animatable View
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
              opacity: fadeAnim // Bind opacity to animated value
            }}
          />
        )
      })

    return (
      <View
        style={styles.container}
        onLayout={event => {
          var { x, y, width, height } = event.nativeEvent.layout
          // console.log(x)
          // console.log(y)
          this.setState({
            x: x,
            y: y
          })
        }}
      >
        {blocks.map((block, i) => (
          <View key={i}>{block}</View>
        ))}
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
