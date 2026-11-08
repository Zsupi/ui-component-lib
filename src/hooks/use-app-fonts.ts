import { Inter_400Regular, Inter_500Medium, Inter_600SemiBold } from '@expo-google-fonts/inter'
import { JetBrainsMono_400Regular } from '@expo-google-fonts/jetbrains-mono'
import { Oswald_500Medium } from '@expo-google-fonts/oswald'
import { useFonts } from 'expo-font'

const fontAssets = {
  Oswald_500Medium,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  JetBrainsMono_400Regular,
}

type AppFontsState = {
  loaded: boolean
  error: Error | null
}

export function useAppFonts(): AppFontsState {
  const [loaded, error] = useFonts(fontAssets)
  return { loaded, error }
}
