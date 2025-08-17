// src/composables/useDarkModeTheme.js
import { watch } from 'vue'
import { useTheme } from 'vuetify'
import { storeToRefs } from 'pinia'
import { useDarkMode } from '@/stores/useDarkmode'

export function useDarkModeTheme() {
  const theme = useTheme()
  const { darkMode } = storeToRefs(useDarkMode())

  const applyTheme = (isDark) => {
    theme.global.name.value = isDark ? 'dark' : 'light'
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light')
  }

  // Aplicar al cargar
  applyTheme(darkMode.value)

  // Reaplicar si cambia
  watch(darkMode, applyTheme)
}
