import React from 'react'
import { StyleSheet, Text, View, Animated } from 'react-native'
import { windowStyles } from './styles/components'

export default class Spin extends React.Component {
  constructor(props) {
    super(props)
    this.animatedOpacities = new Array(this.props.lines)
    for (var i = 0; i < this.props.lines; i++) {
      this.animatedOpacities[i] = new Animated.Value(0)
    }

    // TODO why is this broken!! >:(
    // this.animatedOpacities = new Array(this.props.lines).fill(new Animated.Value(0))
  }

  componentDidMount() {
    this.animate()
  }

  animate() {
    const animations = this.animatedOpacities.map((_, i) => {
      return Animated.loop(
        Animated.sequence([
          Animated.timing(this.animatedOpacities[i], {
            toValue: 1,
            duration: (this.props.lines / 2) * this.props.speed
          }),
          Animated.timing(this.animatedOpacities[i], {
            toValue: 0,
            duration: (this.props.lines / 2) * this.props.speed
          })
        ])
      )
    })
    Animated.stagger(this.props.speed, animations).start()
  }

  render() {
    const animations = this.animatedOpacities.map((_, i) => {
      const angle = (~~((360 / this.props.lines) * i) * Math.PI) / 180 //+ opts.rotate
      return (
        <Animated.View
          key={i}
          style={{
            backgroundColor: this.props.color,
            borderRadius: '50%',
            position: 'absolute',
            height: this.props.width,
            width: this.props.width,
            transform: [
              { translateX: this.props.radius * Math.sin(angle) },
              { translateY: this.props.radius * Math.cos(angle) }
            ],
            opacity: this.animatedOpacities[i]
          }}
        />
      )
    })
    return <View style={styles.container}>{animations}</View>
  }
}

Spin.defaultProps = {
  lines: 12,
  width: 5,
  radius: 50,
  color: 'lightblue',
  speed: 100
}

const styles = StyleSheet.create({
  container: {}
})
