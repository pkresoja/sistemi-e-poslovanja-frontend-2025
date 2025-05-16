<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<template>
  <div class="container">
    <RouterView />
    <p class="text-center mt-3">
      &copy; {{ year }} Univerzitet Singidunum - Praktikum: Sistemi E-Poslovanja
    </p>
  </div>
</template>