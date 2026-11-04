import type { ReactElement } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Radius, Spacing } from '@/constants/theme'
import { useTheme } from '@/hooks/use-theme'

type ColorCardProps = {
  label: string
  value: string
  color: string
}

export function ColorCard({ label, value, color }: ColorCardProps): ReactElement {
  const theme = useTheme()

  return (
    <View style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.border }]}>
      <View style={[styles.swatch, { backgroundColor: color }]} />
      <View style={styles.meta}>
        <Text style={[styles.label, { color: theme.text }]}>{label}</Text>
        <Text style={[styles.value, { color: theme.textMuted }]}>{value}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    overflow: 'hidden',
    borderRadius: Radius.md,
    borderWidth: 1,
  },
  swatch: {
    height: 56,
  },
  meta: {
    padding: Spacing.sm,
  },
  label: {
    fontSize: 12,
  },
  value: {
    fontSize: 10,
    fontVariant: ['tabular-nums'],
  },
})
