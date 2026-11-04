import type { TextStyle } from 'react-native'

export const Colors = {
  light: {
    background: '#F6F5EC',
    surface: '#FFFFFF',
    surfaceRaised: '#FFFFFF',
    border: 'rgba(20,22,15,0.10)',
    input: 'rgba(20,22,15,0.16)',
    ring: '#6BA300',
    text: '#1A1D14',
    textMuted: '#5C6152',
    textFaint: '#8B9080',
    primary: '#6BA300',
    onPrimary: '#14160F',
    destructive: '#EE343B',
    // Categorical palette (slightly deepened for AA contrast on light surfaces)
    lime: '#6BA300',
    orange: '#E45A1A',
    blue: '#1A7FCC',
    purple: '#7A4CD6',
    green: '#1A9E6E',
  },
  dark: {
    background: '#14160F',
    surface: '#1B1E13',
    surfaceRaised: '#22261A',
    border: 'rgba(237,238,228,0.08)',
    input: 'rgba(237,238,228,0.12)',
    ring: '#C8FF3D',
    text: '#EDEEE4',
    textMuted: '#8B9080',
    textFaint: '#5C6152',
    primary: '#C8FF3D',
    onPrimary: '#14160F',
    destructive: '#EE343B',
    lime: '#C8FF3D',
    orange: '#FF7A3D',
    blue: '#5FB8FF',
    purple: '#B98CFF',
    green: '#34D399',
  },
} as const

export type Theme = (typeof Colors)['light'] | (typeof Colors)['dark']

export const Spacing = {
  xs: 4,
  sm: 8,
  ms: 12,
  md: 16,
  ml: 20,
  lg: 24,
  xl: 32,
  '2xl': 40,
  '3xl': 48,
  '4xl': 64,
} as const

export const Radius = { sm: 10, md: 12, lg: 14, xl: 16, '2xl': 18, full: 9999 } as const

export const FontFamily = {
  display: 'Oswald_500Medium',
  body: 'Inter_400Regular',
  bodyMedium: 'Inter_500Medium',
  bodySemiBold: 'Inter_600SemiBold',
  mono: 'JetBrainsMono_400Regular',
} as const

export const FontSize = { micro: 10, caption: 12, body: 14, lead: 18, title: 24 } as const

export const TextStyles = {
  /** Uppercase headings and section labels. */
  display: {
    fontFamily: FontFamily.display,
    letterSpacing: 0.01 * FontSize.title,
    textTransform: 'uppercase',
  },
  /** Numbers that must align (kcal, steps, times). */
  num: {
    fontFamily: FontFamily.mono,
    fontVariant: ['tabular-nums'],
    letterSpacing: -0.01 * FontSize.lead,
  },
} as const satisfies Record<string, TextStyle>

export const Shadows = {
  light: {
    sm: {
      shadowColor: '#14160F',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.08,
      shadowRadius: 1,
      elevation: 2,
    },
    md: {
      shadowColor: '#14160F',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 6,
    },
    lg: {
      shadowColor: '#14160F',
      shadowOffset: { width: 0, height: 12 },
      shadowOpacity: 0.14,
      shadowRadius: 16,
      elevation: 12,
    },
    glow: (color: keyof Theme) => ({
      shadowColor: color,
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.45,
      shadowRadius: 8,
      elevation: 0,
    }),
  },
  dark: {
    sm: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.35,
      shadowRadius: 1,
      elevation: 2,
    },
    md: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.45,
      shadowRadius: 6,
      elevation: 6,
    },
    lg: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 12 },
      shadowOpacity: 0.55,
      shadowRadius: 16,
      elevation: 12,
    },
    glow: (color: keyof Theme) => ({
      shadowColor: color,
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.45,
      shadowRadius: 8,
      elevation: 0,
    }),
  },
} as const

export type Shadow = (typeof Shadows)['light'] | (typeof Shadows)['dark']
