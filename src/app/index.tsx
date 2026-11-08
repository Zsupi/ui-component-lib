import { ScrollView, Text, View } from 'react-native'
import { SplashScreen, Stack } from 'expo-router'
import React, { ReactElement, useEffect } from 'react'

import { ColorCard } from '@/components/ColorCard'
import { ThemeToggle } from '@/components/ThemeToggle'
import { createStyles } from '@/helper/create-style'
import { ErrorScreen } from '@/components/ErrorScreen'
import { useAppFonts } from '@/hooks/use-app-fonts'

const renderThemeToggle = (): ReactElement => <ThemeToggle />

const useStyles = createStyles(({ spacing, color }) => ({
  content: { padding: spacing.md },
  sectionTitle: { fontSize: 11, letterSpacing: 1.5, marginBottom: spacing.sm, color: color.textMuted },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  cell: { flexBasis: '48%' },
  scrollView: { backgroundColor: color.background },
}))

SplashScreen.preventAutoHideAsync()

export default function Index() {
  const { styles, theme } = useStyles()
  const { loaded, error } = useAppFonts()

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync()
    }
  }, [loaded, error])

  if (error) {
    return <ErrorScreen title="Couldn't load fonts" message={error.message} />
  }

  if (!loaded) {
    return null
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Library',
          headerRight: renderThemeToggle,
          headerShadowVisible: false,
          headerStyle: { backgroundColor: theme.color.background },
          headerTitleStyle: { color: theme.color.text },
          headerTintColor: theme.color.text,
        }}
      />
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <Text style={styles.sectionTitle}>COLORS</Text>
        <View style={styles.grid}>
          {Object.entries(theme.color).map(([name, hex]) => (
            <View key={name} style={styles.cell}>
              <ColorCard label={name} value={hex} color={hex} />
            </View>
          ))}
        </View>
      </ScrollView>
    </>
  )
}
