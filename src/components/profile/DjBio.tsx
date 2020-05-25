/* eslint-disable react/display-name */
import React, { useContext } from 'react'
import { StyleSheet, Image, Linking } from 'react-native'
import HTML from 'react-native-render-html'
import { dimensions, spacing } from '../../styles/main'
import { ThemeContext } from '../../styles/theming'
import { BASE_URL } from '../../config'
import ThemedText from '../ThemedText'

interface DJBioProps {
  about: string
}

export default function DJBio(props: DJBioProps) {
  const { theme } = useContext(ThemeContext)

  const styles = StyleSheet.create({
    listsPrefixesRenderers: {
      marginRight: spacing.xs,
    },
    baseFontStyle: {
      color: theme.textColor,
    },
    image: {
      marginTop: spacing.md,
      marginBottom: 2,
    },
  })

  const renderers: HTML.RendererDictionary = {
    img: (htmlAttribs, children, convertedCSSStyles, passProps) => (
      <Image
        style={[
          styles.image,
          {
            height:
              (parseInt(htmlAttribs.height as string) *
                passProps.imagesMaxWidth) /
              parseInt(htmlAttribs.width as string),
          },
        ]}
        source={{ uri: `${BASE_URL}${htmlAttribs.src}` }}
        key={htmlAttribs.src}
      />
    ),
  }

  const listsPrefixesRenderers: HTML.RendererDictionary = {
    ul: () => (
      <ThemedText style={styles.listsPrefixesRenderers} color={'secondary'}>
        •
      </ThemedText>
    ),
    ol: (htmlAttribs, children, convertedCSSStyles, passProps) => (
      <ThemedText style={styles.listsPrefixesRenderers} color={'secondary'}>
        {`${passProps.nodeIndex + 1})`}
      </ThemedText>
    ),
  }

  // IMPORTANT NOTE : Do NOT use the StyleSheet API to create the styles you're going
  // to feed to tagsStyle and classesStyles. Although it might look like it's working
  // at first, the caching logic of react-native makes it impossible for this module
  // to deep check each of your style to properly apply the precedence and priorities
  // of your nested tags' styles.

  const tagsStyles = {
    figure: {
      marginBottom: spacing.md,
    },
    figcaption: {
      textAlign: 'center',
      fontStyle: 'italic',
      color: theme.secondary,
    },
    a: {
      color: theme.anchorColor,
      textDecorationLine: 'none',
    },
  }

  return (
    <>
      {!!props.about && (
        <HTML
          html={props.about}
          baseFontStyle={styles.baseFontStyle}
          renderers={renderers}
          listsPrefixesRenderers={listsPrefixesRenderers}
          tagsStyles={tagsStyles}
          imagesMaxWidth={dimensions.fullWidth}
          onLinkPress={(event, href) => {
            Linking.openURL(href)
          }}
        />
      )}
    </>
  )
}
