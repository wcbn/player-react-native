import React, { useState, useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import Screen from '../components/Screen'
import { spacing } from '../styles/main'
import { ShowHistory, DjCover, DjBio } from '../components/profile'
import { BASE_URL } from '../config'

export default function Profile({ route, navigation }) {
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
      <ScrollView overScrollMode={'never'}>
        <View style={styles.container}>
          <DjCover
            dj_name={state.dj_name}
            website={state.website}
            public_email={state.public_email}
            real_name={state.real_name}
            image_url={state.image_url}
          />
          <DjBio about={state.about} />
        </View>
        <ShowHistory shows={state.shows} />
      </ScrollView>
    </Screen>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.md
  }
})
