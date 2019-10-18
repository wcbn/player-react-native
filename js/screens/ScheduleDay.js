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

export default class ScheduleDay extends React.Component {
  renderItem = ({ item, index }) => (
    <TouchableOpacity
      key={index}
      style={ListItemWrapperStyles.view}
      onPress={() =>
        this.props.navigation.navigate('Show', {
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

  render() {
    const { screenProps, navigation } = this.props
    return (
      <Screen>
        <FlatList
          renderItem={this.renderItem}
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
}
