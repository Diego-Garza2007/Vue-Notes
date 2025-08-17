// src/stores/useDarkmode.js
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useDarkMode = defineStore('darkMode', () => {
  const darkMode = ref(localStorage.getItem('darkMode') === 'true')

  const setDarkMode = (value) => {
    darkMode.value = value
    localStorage.setItem('darkMode', value)
  }

  return { darkMode, setDarkMode }
})
