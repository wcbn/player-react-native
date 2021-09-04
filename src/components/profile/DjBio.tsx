import React, { useContext } from 'react'
import { useWindowDimensions } from 'react-native'
import RenderHtml, {
  RenderHTMLProps,
  useInternalRenderer,
} from 'react-native-render-html'
import { spacing } from '../../styles/main'
import { ThemeContext } from '../../styles/theming'
import { BASE_URL } from '../../config'

interface DJBioProps {
  about: string
}

function ImgRenderer(props: any) {
  const { Renderer, rendererProps } = useInternalRenderer('img', props)

  const source = {
    ...rendererProps.source,
  }

  // folks over at react-native-render-html thought this was a good idea?
  const dumbPrefix = 'about://'
  if (source.uri?.startsWith(dumbPrefix)) {
    source.uri = `${BASE_URL}${source.uri.replace(dumbPrefix, '')}`
  }

  return (
    <Renderer
      {...rendererProps}
      source={source}
      style={{ marginTop: spacing.md, marginBottom: 2 }}
    />
  )
}

export default function DJBio(props: DJBioProps) {
  const { theme } = useContext(ThemeContext)
  const { width } = useWindowDimensions()

  // IMPORTANT NOTE : Do NOT use the StyleSheet API to create the styles you're going
  // to feed to tagsStyle and classesStyles. Although it might look like it's working
  // at first, the caching logic of react-native makes it impossible for this module
  // to deep check each of your style to properly apply the precedence and priorities
  // of your nested tags' styles.

  const tagsStyles: RenderHTMLProps['tagsStyles'] = {
    figure: {
      marginBottom: spacing.md,
      textAlign: 'center',
    },
    figcaption: {
      textAlign: 'center',
      fontStyle: 'italic',
      color: theme.textColor,
    },
    a: {
      color: theme.linkColor,
      textDecorationLine: 'none',
    },
  }

  if (!props.about) return null

  return (
    <RenderHtml
      contentWidth={width}
      source={{ html: props.about }}
      baseStyle={{ color: theme.textColor }}
      renderers={{ img: ImgRenderer }}
      tagsStyles={tagsStyles}
      computeEmbeddedMaxWidth={() => width}
    />
  )
}
