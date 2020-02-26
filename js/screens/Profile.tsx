import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, View, FlatList } from 'react-native'
import Screen from '../components/Screen'
import { spacing } from '../styles/main'
import { DjCover, DjBio } from '../components/profile'
import { BASE_URL } from '../config'
import ListItemWrapper from '../components/ListItemWrapper'
import ThemedText from '../components/ThemedText'
import ListHeader from '../components/ListHeader'
import Separator from '../components/Separator'
import { ThemeContext } from '../styles/theming'
import LazyPlaceholder from '../components/schedule/LazyPlaceholder'

const renderShowListing = ({ item }) => {
  return (
    <ListItemWrapper>
      <ThemedText>{item.name}</ThemedText>
    </ListItemWrapper>
  )
}

export default function Profile({ route, navigation }) {
  const { theme } = useContext(ThemeContext)
  const [state, setState] = useState({
    dj_name: '',
    about: '',
    shows: [],
    website: '',
    public_email: '',
    real_name: '',
    image_url: ''
  })

  useEffect(() => {
    navigation.setOptions({ title: route.params.title })
    fetch(BASE_URL + `${route.params.url}.json`)
      .then(response => response.json())
      .then(data => setState(data))
  }, [])

  return (
    <Screen>
      <FlatList
        scrollEnabled
        data={state.shows}
        renderItem={renderShowListing}
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={
          <>
            <View style={styles.mediumPad}>
              <DjCover
                dj_name={state.dj_name}
                website={state.website}
                public_email={state.public_email}
                real_name={state.real_name}
                image_url={state.image_url}
              />
              <DjBio about={state.about} />
            </View>
            <ListHeader text="Show History" />
          </>
        }
        ItemSeparatorComponent={() => <Separator color={theme.muted} />}
        ListEmptyComponent={LazyPlaceholder}
        contentContainerStyle={styles.flatList}
      />
    </Screen>
  )
}

const styles = StyleSheet.create({
  flatList: {
    flexGrow: 1
  },
  mediumPad: {
    padding: spacing.md
  }
})
