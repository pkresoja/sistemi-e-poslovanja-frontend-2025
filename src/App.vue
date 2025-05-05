<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
const year = new Date().getFullYear()
</script>

<template>
  <RouterLink to="/" >Home</RouterLink> | <RouterLink to="/about"> About</RouterLink>
  | <a href="https://google.com" target="_blank">Google </a>

  <RouterView />
  <p>&copy; {{ year }} PSEP</p>
</template>