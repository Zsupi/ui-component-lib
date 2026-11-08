import { StyleSheet, TextStyle, ViewStyle } from 'react-native'
import { useMemo } from 'react'
import { ImageStyle } from 'expo-image'

import useThemeContext from '@/context/theme-context'
import { Theme } from '@/constants/theme'

type NamedStyles<T> = { [P in keyof T]: ViewStyle | TextStyle | ImageStyle }

type Factory<T extends NamedStyles<T>> = (theme: Theme) => T

export function createStyles<T extends NamedStyles<T>>(factory: Factory<T>): () => { styles: T; theme: Theme } {
  const cache = new WeakMap<Theme, T>()

  return function useStyles() {
    const { theme } = useThemeContext()

    return useMemo(() => {
      let styles = cache.get(theme)
      if (!styles) {
        styles = StyleSheet.create(factory(theme))
        cache.set(theme, styles)
      }
      return { styles, theme }
    }, [theme])
  }
}
