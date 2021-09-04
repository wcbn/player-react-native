import React, { useContext, useMemo } from 'react'
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
  const { Renderer, rendererProps: _rp } = useInternalRenderer('img', props)
  const { source, ...rendererProps } = _rp

  // someone who is not me thought this would be a smart default :)
  const dumbPrefix = 'about://'
  if (source.uri?.startsWith(dumbPrefix)) {
    source.uri = source.uri.replace(dumbPrefix, '')
  }

  source.uri = `${BASE_URL}${source.uri}`

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

  // this is supposedly helpful
  // https://stackoverflow.com/questions/68966120/react-native-render-html-you-seem-to-update-the-x-prop-of-the-y-component-in-s
  const tagsStyles = useMemo<RenderHTMLProps['tagsStyles']>(
    () => ({
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
    }),
    [spacing, theme]
  )

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
