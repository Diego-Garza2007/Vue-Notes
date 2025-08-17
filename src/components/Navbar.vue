<script setup>
import DarkModeSwitch from '@/components/ThemeSwitch.vue'
import { storeToRefs } from 'pinia'
import { useDarkMode } from '@/stores/useDarkmode'
import { useDarkModeTheme } from '@/composables/useDarkModeTheme'

// Inicializar tema global (persistente)
useDarkModeTheme()

const darkStore = useDarkMode()
const { darkMode } = storeToRefs(darkStore)
</script>

<template>
  <nav class="navbar">
    <ul class="navbar__list">
      <!-- Logo y título -->
      <li class="navbar__item navbar__item--brand">
        <img src="/logoVueNotes.png" alt="Vue Notes Logo" class="navbar__logo" />
        <span class="navbar__title">Vue Notes</span>
      </li>

      <!-- Separador flexible -->
      <li class="navbar__spacer"></li>

      <!-- Links -->
      <router-link to="/login" class="navbar__link">
        <li class="navbar__item">Login</li>
      </router-link>
      <router-link to="/register" class="navbar__link">
        <li class="navbar__item">Register</li>
      </router-link>

      <hr />

      <!-- Switch modo oscuro -->
      <li class="navbar__item">
        <DarkModeSwitch />
      </li>

      <!-- Logo de GitHub -->
      <li class="navbar__item navbar__item--icon">
        <a href="https://github.com/Diego-Garza2007/Vue-Notes" target="_blank" rel="noopener noreferrer">
          <img
            :src="darkMode ? '/githubWhite.png' : '/github-icon.svg'"
            alt="GitHub"
            class="navbar__icon"
          />
        </a>
      </li>
    </ul>
  </nav>
</template>

<style lang="scss" scoped>
.navbar {
  color: var(--navbar-text);
  padding: 0.7rem 1.5rem;
  position: sticky;
  top: 0;
  z-index: 100;
  max-width: 80%;
  margin: 0px auto;

  &__list {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin: 0;
    padding: 0;
    list-style: none;
    
    a {
      text-decoration: none;
      color: inherit;
    }
  }

  &__link:hover {
      cursor: pointer;
      color: green;
      transform: translateY(-3px);
      transition: 0.4s ease;
  }

  &__item {
    display: flex;
    align-items: center;
    font-weight: 500;
    
    


    &--brand {
      font-size: 1.2rem;
      font-weight: bold;
      gap: 0.5rem;
    }

    &--icon  {
      
      & img {
        filter: var(--icon-filter);
        transition: filter 0.2s ease;
      } 
      & a {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%; 
      }
    }

    &--icon img:hover {
      filter: brightness(1.2);
    }
  }

  &__logo {
    height: 64px;
  }

  &__title {
    font-size: 18px;
  }

  &__spacer {
    flex: 1;
  }

  hr {
    width: 1px;
    height: 30px;
    background-color: #424242;
    border: none;
  }

  &__switch {
    transform: scale(0.9);
  }

  &__icon {
    width: 24px;
    height: 24px;
  }
}

</style>