<script setup>
import { storeToRefs } from 'pinia'
import { useDarkMode } from '@/stores/useDarkmode'

const darkStore = useDarkMode()
const { darkMode } = storeToRefs(darkStore)
</script>

<template>
  <v-switch
    v-model="darkMode"
    inset
    hide-details
    color="success"
  />
</template>
