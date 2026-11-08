import { render, screen } from '@testing-library/react-native'
import { StyleSheet } from 'react-native'

import { ColorCard } from '@/components/ColorCard'

describe('ColorCard', () => {
  it('displays the label and value passed by its caller', async () => {
    await render(<ColorCard label="Primary" value="#6BA300" color="#6BA300" />)

    expect(screen.getByText('Primary')).toBeTruthy()
    expect(screen.getByText('#6BA300')).toBeTruthy()
  })

  it('uses the supplied color for its swatch', async () => {
    await render(<ColorCard label="Accent" value="coral" color="#FF7A3D" />)

    const card = screen.getByText('Accent').parent?.parent
    const swatch = card?.children.find(
      (child) => typeof child !== 'string' && StyleSheet.flatten(child.props.style).backgroundColor === '#FF7A3D',
    )

    expect(swatch).toBeDefined()
    if (!swatch || typeof swatch === 'string') {
      throw new Error('Expected the color swatch to render as a view')
    }

    expect(StyleSheet.flatten(swatch.props.style)).toMatchObject({
      backgroundColor: '#FF7A3D',
      height: 56,
    })
  })

  it('renders different card values independently', async () => {
    await render(
      <>
        <ColorCard label="Primary" value="#6BA300" color="#6BA300" />
        <ColorCard label="Destructive" value="#EE343B" color="#EE343B" />
      </>,
    )

    expect(screen.getByText('Primary')).toBeTruthy()
    expect(screen.getByText('#6BA300')).toBeTruthy()
    expect(screen.getByText('Destructive')).toBeTruthy()
    expect(screen.getByText('#EE343B')).toBeTruthy()
  })
})
