<script setup>
import SettingsModal from '@/components/Settings.vue'
import { ref, onMounted } from 'vue'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

const auth = getAuth()
const userName = ref('Usuario')

// Detectar usuario logeado
onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      userName.value = user.displayName || user.email || 'Usuario'
    } else {
      userName.value = 'Invitado'
    }
  })
})
const settingsModalRef = ref(null)

const openSettings = () => {
  settingsModalRef.value.showModal = true
}
</script>

<template>
  <v-navigation-drawer app permanent color="grey-lighten-4" width="260">
    
    <!-- Usuario -->
    <v-list-item>
      <v-list-item-title>{{ userName }}</v-list-item-title>
    </v-list-item>

    <v-divider></v-divider>

    <!-- Page -->
    <v-list dense>
      <v-list-item
        :to="{ name: 'page' }"
        link
        router
      >
        <v-list-item-title>Page</v-list-item-title>
      </v-list-item>
    </v-list>

    <v-spacer></v-spacer>

<!-- Settings -->
<v-list dense>
  <v-divider></v-divider>
  <v-list-item
    link
    @click="openSettings"
  >
    <v-list-item-title>Settings<v-icon class="ml-1">mdi-cog</v-icon></v-list-item-title>
    
  </v-list-item>
</v-list>

<!-- Modal -->
<SettingsModal ref="settingsModalRef" />

  </v-navigation-drawer>
</template>
