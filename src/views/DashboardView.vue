<script setup>
import Sidebar from '../components/Sidebar.vue'
</script>

<template>
  <v-app>
    <Sidebar />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>
