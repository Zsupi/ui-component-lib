import React, { createContext, ReactElement, useMemo } from 'react'
import { useColorScheme } from 'react-native'

import {
  Colors,
  FontFamily,
  FontSize,
  Preference,
  Radius,
  ResolvedPreference,
  Shadows,
  Spacing,
  TextStyles,
  Theme,
} from '@/constants/theme'

const BaseTheme: Omit<Theme, 'name' | 'color' | 'shadow'> = {
  radius: Radius,
  font: {
    family: FontFamily,
    size: FontSize,
    style: TextStyles,
  },
  spacing: Spacing,
}

const DarkTheme: Theme = {
  ...BaseTheme,
  name: 'dark',
  color: Colors.dark,
  shadow: Shadows.dark,
}

const LightTheme: Theme = {
  ...BaseTheme,
  name: 'light',
  color: Colors.light,
  shadow: Shadows.light,
}

type ThemeContextType = {
  theme: Theme
  preference?: ResolvedPreference
  setPreference: (preference: Preference) => void
}

type ThemeProviderType = {
  children: React.ReactNode
}

const ThemeContext = createContext<ThemeContextType>({
  theme: LightTheme,
  preference: 'light',
  setPreference: () => {
    /* empty */
  },
})

export function ThemeProvider({ children }: ThemeProviderType): ReactElement {
  const systemScheme = useColorScheme()
  const [preference, setPreference] = React.useState<Preference>('auto')

  const resolvedPreference: ResolvedPreference = preference === 'auto' ? (systemScheme ?? 'light') : preference

  const theme = useMemo(() => (resolvedPreference === 'dark' ? DarkTheme : LightTheme), [resolvedPreference])
  const contextValue = useMemo(
    () => ({ theme, preference: resolvedPreference, setPreference }),
    [theme, resolvedPreference, setPreference],
  )

  return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>
}

const useThemeContext = (): ThemeContextType => React.useContext(ThemeContext)

export default useThemeContext
