import { fireEvent, render, screen } from '@testing-library/react-native'
import type { ReactElement } from 'react'
import * as ReactNative from 'react-native'
import { Pressable, Text } from 'react-native'

import useThemeContext, { ThemeProvider } from '@/context/theme-context'

function ThemeProbe(): ReactElement {
  const { theme, setPreference } = useThemeContext()

  return (
    <>
      <Text>{theme.name}</Text>
      <Pressable accessibilityRole="button" onPress={() => setPreference('light')}>
        <Text>Choose light</Text>
      </Pressable>
      <Pressable accessibilityRole="button" onPress={() => setPreference('dark')}>
        <Text>Choose dark</Text>
      </Pressable>
    </>
  )
}

function ThemeProviderHarness(): ReactElement {
  return (
    <ThemeProvider>
      <ThemeProbe />
    </ThemeProvider>
  )
}

describe('ThemeProvider', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('follows the system scheme when the user has not selected a preference', async () => {
    const useColorScheme = jest.spyOn(ReactNative, 'useColorScheme').mockReturnValue('light')

    const { rerender } = await render(<ThemeProviderHarness />)
    expect(screen.getByText('light')).toBeTruthy()

    useColorScheme.mockReturnValue('dark')
    rerender(<ThemeProviderHarness />)

    expect(await screen.findByText('dark')).toBeTruthy()
  })

  it('defaults to light mode if the system scheme is unavailable', async () => {
    jest.spyOn(ReactNative, 'useColorScheme').mockReturnValue(null)

    await render(<ThemeProviderHarness />)

    expect(screen.getByText('light')).toBeTruthy()
  })

  it('keeps an explicit preference when the system scheme changes', async () => {
    const useColorScheme = jest.spyOn(ReactNative, 'useColorScheme').mockReturnValue('dark')

    const { rerender } = await render(<ThemeProviderHarness />)
    fireEvent.press(screen.getByRole('button', { name: 'Choose light' }))
    expect(await screen.findByText('light')).toBeTruthy()

    useColorScheme.mockReturnValue('dark')
    rerender(<ThemeProviderHarness />)

    expect(screen.getByText('light')).toBeTruthy()
  })

  it('updates the theme when an explicit preference is selected', async () => {
    jest.spyOn(ReactNative, 'useColorScheme').mockReturnValue('light')

    await render(<ThemeProviderHarness />)
    fireEvent.press(screen.getByRole('button', { name: 'Choose dark' }))

    expect(await screen.findByText('dark')).toBeTruthy()
  })
})
