import React from 'react'
import { StyleSheet, Text, View, Animated } from 'react-native'
import { windowStyles } from './styles/components'

const arr = []
for (var i = 0; i < 12; i++) {
  arr.push(i)
}

export default class Spin extends React.Component {
  constructor(props) {
    super(props)
    this.animatedValue = []
    arr.forEach(value => {
      this.animatedValue[value] = new Animated.Value(0)
    })

    this.state = {
      // opacities: new Array(this.props.lines).fill(new Animated.Value(0)),
      x: 0,
      y: 0
    }
  }

  componentDidMount() {
    this.animate()
  }

  animate() {
    const animations = arr.map(item => {
      return Animated.loop(
        Animated.sequence([
          Animated.timing(this.animatedValue[item], {
            toValue: 1,
            duration: this.props.lines / 2 * this.props.speed
          }),
          Animated.timing(this.animatedValue[item], {
            toValue: 0,
            duration: this.props.lines / 2 * this.props.speed
          })
        ])
      )
    })
    Animated.stagger(this.props.speed, animations).start()
  }

  render() {
    const animations = arr.map((a, i) => {
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
            opacity: this.animatedValue[a]
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
