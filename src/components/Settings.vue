<script setup>
import { ref } from 'vue'
import { useDarkMode } from '@/stores/useDarkmode'
import { storeToRefs } from 'pinia'
import { useDarkModeTheme } from '@/composables/useDarkModeTheme'
import { getAuth, signOut } from 'firebase/auth'
import router from '@/router'

// Inicializamos tema global
useDarkModeTheme()

// Estado del modal
const showModal = ref(false)
defineExpose({ showModal })

// Dark mode
const darkStore = useDarkMode()
const { darkMode } = storeToRefs(darkStore)

// Otro setting de ejemplo
const notificationsEnabled = ref(true)

// Cerrar sesión
const auth = getAuth()
const logout = async () => {
  try {
    await signOut(auth)
    showModal.value = false
    console.log('Sesión cerrada')
    router.push('/')    
  } catch (error) {
    console.error('Error al cerrar sesión:', error)
  }
}
</script>

<template>
  <v-dialog v-model="showModal" persistent max-width="400">
    <v-card>
      <v-card-title class="text-h6">Settings</v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <v-switch
              v-model="darkMode"
              label="Dark Mode"
              color="green"
            />
          </v-col>
          <v-col cols="12">
            <v-switch
              v-model="notificationsEnabled"
              label="Enable Notifications"
              color="green"
            />
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text color="info" @click="showModal = false">Cerrar</v-btn>
        <v-btn text color="red" @click="logout">Cerrar sesión</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
