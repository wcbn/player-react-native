import React, { useContext, ReactNode } from 'react'
import { View, StyleProp, ViewStyle } from 'react-native'
import { ThemeContext } from '../styles/theming';


interface ScreenProps {
  style?: StyleProp<ViewStyle>,
  children: ReactNode
}

 const Screen = (props: ScreenProps) => {
  const { theme } = useContext(ThemeContext);
  return (
    <View style={[props.style, { flex: 1, backgroundColor: theme.primary }]}>
      {props.children}
    </View>
  )
}

export default Screen
