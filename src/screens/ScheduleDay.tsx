import React, { useContext } from 'react'
import { TouchableOpacity, StyleSheet, View, FlatList } from 'react-native'
import Screen from '../components/Screen'
import Separator from '../components/Separator'
import ThemedText from '../components/ThemedText'
import ListItemTime from '../components/ListItemTime'
import { ListItemWrapperStyles } from '../components/ListItemWrapper'
import { useNavigation } from '@react-navigation/native'
import LazyPlaceholder from '../components/LazyPlaceholder'
import { ThemeContext } from '../styles/theming'

const styles = StyleSheet.create({
  showText: {
    maxWidth: '85%',
  },
  showHost: {
    fontStyle: 'italic',
  },
  contentContainer: {
    flexGrow: 1,
  },
})

export default function ScheduleDay({ data }) {
  const { theme } = useContext(ThemeContext)
  const navigation = useNavigation()

  const renderItem = ({ item, index }) => {
    const isOnAir: boolean = item.on_air

    return (
      <TouchableOpacity
        key={index}
        style={{
          ...ListItemWrapperStyles.view,
          backgroundColor: isOnAir && theme.onAirBackgroundColor,
        }}
        onPress={() =>
          navigation.navigate('Show', {
            url: item.url,
            title: item.name,
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
  }

  return (
    <Screen>
      <FlatList
        contentContainerStyle={styles.contentContainer}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        overScrollMode={'never'}
        ItemSeparatorComponent={() => <Separator color={theme.muted} />}
        data={data}
        ListEmptyComponent={LazyPlaceholder} //TODO rename LazyPlaceholder
      />
    </Screen>
  )
}
