import React from 'react'
import { FlatList } from 'react-native'
import { useTheme } from '../../styles/theming'
import Separator from '../Separator'
import ListHeader from '../ListHeader'
import ListItemWrapper from '../ListItemWrapper'
import ThemedText from '../ThemedText'

export default (ShowHistory = props => {
  const theme = useTheme()

  renderShowListing = ({ item }) => {
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
        renderItem={this.renderShowListing}
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={<ListHeader text="Show History" />}
        ItemSeparatorComponent={() => <Separator color={theme.muted} />}
      />
    )
  )
})
