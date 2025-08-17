<script setup>
import { useDarkModeTheme } from '@/composables/useDarkModeTheme'

// Esto se ejecuta una sola vez y mantiene el tema en toda la app
useDarkModeTheme()
</script>

<template>


  <RouterView />
</template>

