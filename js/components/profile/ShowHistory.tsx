import React, { useContext } from 'react'
import { FlatList } from 'react-native'
import { ThemeContext } from '../../styles/theming'
import Separator from '../Separator'
import ListHeader from '../ListHeader'
import ListItemWrapper from '../ListItemWrapper'
import ThemedText from '../ThemedText'

export default function ShowHistory(props: { shows: Object[] }) {
  const { theme } = useContext(ThemeContext);

  const renderShowListing = ({ item }) => {
    return (
      <ListItemWrapper>
        <ThemedText>{item.name}</ThemedText>
      </ListItemWrapper>
    )
  }

  return (
    props.shows.length > 0 && (
      <FlatList
        data={props.shows}
        renderItem={renderShowListing}
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={<ListHeader text="Show History" />}
        ItemSeparatorComponent={() => <Separator color={theme.muted} />}
      />
    )
  )
}
