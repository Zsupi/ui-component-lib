import { fireEvent, render, screen } from '@testing-library/react-native'
import * as ReactNative from 'react-native'

import { ThemeToggle } from '@/components/ThemeToggle'
import useThemeContext, { ThemeProvider } from '@/context/theme-context'

function ThemeName(): React.ReactElement {
  const { theme } = useThemeContext()

  return <ReactNative.Text>{theme.name}</ReactNative.Text>
}

function ThemeToggleHarness(): React.ReactElement {
  return (
    <ThemeProvider>
      <ThemeToggle />
      <ThemeName />
    </ThemeProvider>
  )
}

describe('ThemeToggle', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('shows the system dark appearance and an enabled switch', async () => {
    jest.spyOn(ReactNative, 'useColorScheme').mockReturnValue('dark')

    await render(<ThemeToggleHarness />)

    expect(screen.getByText('Dark')).toBeTruthy()
    expect(screen.getByText('dark')).toBeTruthy()
    expect(screen.getByRole('switch', { name: 'Dark mode' }).props.value).toBe(true)
  })

  it('switches to light mode when turned off', async () => {
    jest.spyOn(ReactNative, 'useColorScheme').mockReturnValue('dark')

    await render(<ThemeToggleHarness />)
    await fireEvent(screen.getByRole('switch', { name: 'Dark mode' }), 'valueChange', false)

    expect(await screen.findByText('Light')).toBeTruthy()
    expect(await screen.findByText('light')).toBeTruthy()
    expect(screen.getByRole('switch', { name: 'Dark mode' }).props.value).toBe(false)
  })

  it('switches to dark mode when turned on from light mode', async () => {
    jest.spyOn(ReactNative, 'useColorScheme').mockReturnValue('light')

    await render(<ThemeToggleHarness />)
    await fireEvent(screen.getByRole('switch', { name: 'Dark mode' }), 'valueChange', true)

    expect(await screen.findByText('Dark')).toBeTruthy()
    expect(await screen.findByText('dark')).toBeTruthy()
    expect(screen.getByRole('switch', { name: 'Dark mode' }).props.value).toBe(true)
  })
})
