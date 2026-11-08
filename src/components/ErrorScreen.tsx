import type { ReactElement } from 'react'
import { Text, View } from 'react-native'

import { createStyles } from '@/helper/create-style'

interface ErrorScreenProps {
  title: string
  message: string
}

const useStyles = createStyles(({ spacing, color, radius }) => ({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.ml,
    backgroundColor: color.background,
  },
  card: {
    width: '100%',
    gap: spacing.sm,
    padding: spacing.lg,
    borderRadius: radius.xl,
    borderWidth: 1,
    backgroundColor: color.surface,
    borderColor: color.border,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: color.destructive,
  },
  message: {
    fontSize: 14,
    lineHeight: 20,
    color: color.textMuted,
  },
}))

export function ErrorScreen({ title, message }: ErrorScreenProps): ReactElement {
  const { styles } = useStyles()

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.message}>{message}</Text>
      </View>
    </View>
  )
}
