import { render, screen } from '@testing-library/react-native'
import { StyleSheet } from 'react-native'

import { ErrorScreen } from '@/components/ErrorScreen'

describe('ErrorScreen', () => {
  it('shows the provided title and message', async () => {
    await render(<ErrorScreen title="Unable to load" message="Try again later." />)

    expect(screen.getByText('Unable to load')).toBeTruthy()
    expect(screen.getByText('Try again later.')).toBeTruthy()
  })

  it('presents the title as a destructive error heading', async () => {
    await render(<ErrorScreen title="Network error" message="Check your connection." />)

    const title = screen.getByText('Network error')

    expect(StyleSheet.flatten(title.props.style)).toMatchObject({
      color: '#EE343B',
      fontSize: 20,
      fontWeight: '700',
    })
  })

  it('preserves long error messages without changing their text', async () => {
    const message = 'The font files could not be loaded. Please check your connection and try again.'
    await render(<ErrorScreen title="Font error" message={message} />)

    expect(screen.getByText(message)).toBeTruthy()
    expect(StyleSheet.flatten(screen.getByText(message).props.style)).toMatchObject({
      fontSize: 14,
      lineHeight: 20,
    })
  })
})
