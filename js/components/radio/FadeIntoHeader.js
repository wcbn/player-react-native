import React from 'react'
import { StyleSheet } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { dimensions } from '../../styles/main';

export default (FadeIntoHeader = props => (
  <LinearGradient
    colors={[props.color, 'transparent']}
    style={styles.lg}
  />
))
const styles = StyleSheet.create({
  lg: {
    position: 'absolute',
    width: dimensions.fullWidth,
    height: '100%',
    top: 0,
    left: 0
  }
})
