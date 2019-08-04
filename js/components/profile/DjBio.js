import React from 'react'
import { StyleSheet, Image, Linking } from 'react-native'
import HTML from 'react-native-render-html'
import { dimensions, spacing } from '../../styles/main'
import { useTheme } from '../../styles/theming'

export default (DjBio = props => {
  const theme = useTheme()

  renderers = {
    img: (htmlAttribs, children, convertedCSSStyles, passProps) => (
      <Image
        style={[
          this.styles.image,
          {
            height:
              (parseInt(htmlAttribs.height) * passProps.imagesMaxWidth) /
              parseInt(htmlAttribs.width)
          }
        ]}
        source={{ uri: `https://app.wcbn.org${htmlAttribs.src}` }}
        key={htmlAttribs.src}
      />
    )
  }

  listsPrefixesRenderers = {
    ul: (htmlAttribs, children, convertedCSSStyles, passProps) => (
      <ThemedText
        style={this.styles.listsPrefixesRenderers}
        color={'secondary'}
      >
        •
      </ThemedText>
    )
  }

  tagsStyles = {
    figure: {
      marginBottom: spacing.md
    },
    figcaption: {
      textAlign: 'center',
      fontStyle: 'italic',
      color: theme.secondary
    },
    a: {
      color: theme.anchorColor,
      textDecorationLine: 'none'
    }
  }

  styles = StyleSheet.create({
    listsPrefixesRenderers: {
      marginRight: spacing.xs
    },
    baseFontStyle: {
      color: theme.textColor
    },
    image: {
      marginTop: spacing.md,
      marginBottom: 2
    }
  })

  return (
    !!props.about && (
      <HTML
        html={props.about}
        baseFontStyle={this.styles.baseFontStyle}
        renderers={this.renderers}
        listsPrefixesRenderers={this.listsPrefixesRenderers}
        tagsStyles={this.tagsStyles}
        imagesMaxWidth={dimensions.fullWidth}
        onLinkPress={(event, href) => {
          Linking.openURL(href)
        }}
      />
    )
  )
})
