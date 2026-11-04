import { Inter_400Regular, Inter_500Medium, Inter_600SemiBold } from '@expo-google-fonts/inter'
import { JetBrainsMono_400Regular } from '@expo-google-fonts/jetbrains-mono'
import { Oswald_500Medium } from '@expo-google-fonts/oswald'
import { useFonts } from 'expo-font'

// Keys are the fontFamily strings in constants/typography.ts.
const fontAssets = {
  Oswald_500Medium,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  JetBrainsMono_400Regular,
}

/** True once every font is loaded (or failed, so the app never hangs on the splash screen). */
export function useAppFonts(): boolean {
  const [loaded, error] = useFonts(fontAssets)
  return loaded || error !== null
}
