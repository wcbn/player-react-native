import React, { useState, useEffect } from 'react'
import Separator from '../components/Separator'
import Screen from '../components/Screen'
import { humanizeTime, humanizeDate } from '../util/datetime'
import { DjScroll, ShowDescription, EpisodeList } from '../components/show'
import { BASE_URL } from '../config'
import { ShowAPI } from '../types'
import { useNavigation, useRoute } from '@react-navigation/native'
import {
  ShowNavigationProp,
  ShowRouteProp,
} from '../components/navigation/types'

export default function Show() {
  const navigation = useNavigation<ShowNavigationProp>()
  const route = useRoute<ShowRouteProp>()

  const [state, setState] = useState({
    description: '',
    djs: [],
    episodes: [],
    website: '',
  } as Pick<ShowAPI, 'description' | 'djs' | 'episodes' | 'website'>)

  useEffect(() => {
    navigation.setOptions({
      title: route.params.title,
    })

    fetch(BASE_URL + `${route.params.url}.json`)
      .then((response) => response.json())
      .then((response: ShowAPI) => {
        response.episodes.forEach((e) => {
          e.beginning = humanizeDate(e.beginning)

          e.songs.forEach((song) => {
            song.at = humanizeTime(song.at)
          })
        })

        setState({
          description: response.description,
          djs: response.djs,
          episodes: response.episodes,
          website: response.website,
        })
      })
  }, [])

  return (
    <Screen>
      <DjScroll djs={state.djs} />
      <Separator />
      <ShowDescription text={state.description} website={state.website ?? ''} />
      <EpisodeList episodes={state.episodes} />
    </Screen>
  )
}
