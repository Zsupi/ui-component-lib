import { Shadows, type Shadow } from '@/constants/theme'
import { useColorScheme } from '@/hooks/use-color-scheme'

export function useShadow(): Shadow {
  return Shadows[useColorScheme()]
}
