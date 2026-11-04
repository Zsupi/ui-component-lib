import type { ReactElement } from 'react'
import { Appearance, StyleSheet, Switch, Text, View } from 'react-native'

import { Spacing } from '@/constants/theme'
import { useColorScheme } from '@/hooks/use-color-scheme'
import { useTheme } from '@/hooks/use-theme'

export function ThemeToggle(): ReactElement {
  const theme = useTheme()
  const scheme = useColorScheme()

  return (
    <View style={styles.row}>
      <Text style={[styles.label, { color: theme.textMuted }]}>{scheme === 'dark' ? 'Dark' : 'Light'}</Text>
      <Switch
        value={scheme === 'dark'}
        onValueChange={(isDark) => Appearance.setColorScheme(isDark ? 'dark' : 'light')}
        trackColor={{ false: theme.border, true: theme.primary }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  label: { fontSize: 12 },
})
