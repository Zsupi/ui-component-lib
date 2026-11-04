import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { Stack } from 'expo-router'
import { ReactElement } from 'react'

import { ColorCard } from '@/components/ColorCard'
import { Spacing } from '@/constants/theme'
import { useTheme } from '@/hooks/use-theme'
import { ThemeToggle } from '@/components/ThemeToggle'

const renderThemeToggle = (): ReactElement => <ThemeToggle />

export default function Index() {
  const theme = useTheme()

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Library',
          headerRight: renderThemeToggle,
          headerShadowVisible: false,
          headerStyle: { backgroundColor: theme.background },
          headerTitleStyle: { color: theme.text },
          headerTintColor: theme.text,
        }}
      />
      <ScrollView style={{ backgroundColor: theme.background }} contentContainerStyle={styles.content}>
        <Text style={[styles.sectionTitle, { color: theme.textMuted }]}>COLORS</Text>
        <View style={styles.grid}>
          {Object.entries(theme).map(([name, hex]) => (
            <View key={name} style={styles.cell}>
              <ColorCard label={name} value={hex} color={hex} />
            </View>
          ))}
        </View>
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  content: { padding: Spacing.md },
  sectionTitle: { fontSize: 11, letterSpacing: 1.5, marginBottom: Spacing.sm },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm },
  cell: { flexBasis: '48%' },
})
