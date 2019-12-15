import React from 'react'
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  FlatList
} from 'react-native'
import Screen from '../components/Screen'
import Separator from '../components/Separator'
import ThemedText from '../components/ThemedText'
import ListItemTime from '../components/ListItemTime'
import { ListItemWrapperStyles } from '../components/ListItemWrapper'

const styles = StyleSheet.create({
  showText: {
    maxWidth: '85%'
  },
  showHost: {
    fontStyle: 'italic'
  }
})

export default function ScheduleDay(props) {
  const { screenProps, navigation } = props

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      key={index}
      style={ListItemWrapperStyles.view}
      onPress={() =>
        navigation.navigate('Show', {
          url: item.url,
          title: item.name
        })
      }
    >
      <View style={styles.showText}>
        <ThemedText>{item.name}</ThemedText>
        <ThemedText style={styles.showHost} color={'secondary'}>
          {item.with}
        </ThemedText>
      </View>
      <ListItemTime at={item.beginning} />
    </TouchableOpacity>
  )

  return (
    <Screen>
      <FlatList
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        overScrollMode={'never'}
        ItemSeparatorComponent={() => (
          <Separator color={screenProps.theme.muted} />
        )}
        data={screenProps.scheduleData[navigation.state.key]}
      />
    </Screen>
  )
}
