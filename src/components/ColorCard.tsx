import type { ReactElement } from 'react'
import { Text, View } from 'react-native'

import { createStyles } from '@/helper/create-style'

type ColorCardProps = {
  label: string
  value: string
  color: string
}

const useStyles = createStyles(({ spacing, radius, color }) => ({
  card: {
    overflow: 'hidden',
    borderRadius: radius.md,
    borderWidth: 1,
    backgroundColor: color.surface,
    borderColor: color.border,
  },
  swatch: {
    height: 56,
  },
  meta: {
    padding: spacing.sm,
  },
  label: {
    fontSize: 12,
    color: color.text,
  },
  value: {
    fontSize: 10,
    fontVariant: ['tabular-nums'],
    color: color.textMuted,
  },
}))

export function ColorCard({ label, value, color }: ColorCardProps): ReactElement {
  const { styles } = useStyles()

  return (
    <View style={styles.card}>
      <View style={[styles.swatch, { backgroundColor: color }]} />
      <View style={styles.meta}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
    </View>
  )
}
