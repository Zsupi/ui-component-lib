export const Colors = {
  light: {
    background: '#FFFFFF',
    surface: '#F4F6F8',
    text: '#0B1220',
    textMuted: '#5B6577',
    border: '#E2E6EC',
    primary: '#208AEF',
  },
  dark: {
    background: '#0B1220',
    surface: '#141C2E',
    text: '#F2F5FA',
    textMuted: '#9AA6BC',
    border: '#243049',
    primary: '#4DA3FF',
  },
} as const

export type Theme = (typeof Colors)['light'] | (typeof Colors)['dark']

export const Spacing = { xs: 4, sm: 8, md: 16, lg: 24, xl: 32 } as const
export const Radius = { sm: 6, md: 12, lg: 20, full: 999 } as const
