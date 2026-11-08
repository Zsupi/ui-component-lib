import type { ReactElement } from 'react'
import { Switch, Text, View } from 'react-native'

import { createStyles } from '@/helper/create-style'
import useThemeContext from '@/context/theme-context'

const useStyles = createStyles(({ spacing, color }) => ({
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  label: { fontSize: 12, color: color.textMuted },
}))

export function ThemeToggle(): ReactElement {
  const { styles } = useStyles()
  const { theme, preference, setPreference } = useThemeContext()

  return (
    <View style={styles.row}>
      <Text style={styles.label}>{preference === 'dark' ? 'Dark' : 'Light'}</Text>
      <Switch
        accessibilityLabel="Dark mode"
        value={preference === 'dark'}
        onValueChange={(isDark) => setPreference(isDark ? 'dark' : 'light')}
        trackColor={{ false: theme.color.border, true: theme.color.primary }}
      />
    </View>
  )
}
