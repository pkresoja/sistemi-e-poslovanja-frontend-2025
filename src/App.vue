<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { getRefreshToken } from './auth';
import { login } from './utils';
const year = new Date().getFullYear()
import { getUserEmail } from './auth'

if (!getRefreshToken()) {
  login('admin@example.com', 'admin123')
}
</script>

<template>
  <div class="container">
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <RouterLink class="navbar-brand" to="/">
          PSEP 2025
        </RouterLink>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <RouterLink class="nav-link" to="/" exact-active-class="active">
                Početna
              </RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link" to="/list" exact-active-class="active">
                Lista
              </RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link" to="/cinema" exact-active-class="active">
                Bioskopi
              </RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link" to="/about" exact-active-class="active">
                O nama
              </RouterLink>
            </li>
          </ul>
          <span class="navbar-text">
            <i class="fa-solid fa-user"></i> {{ getUserEmail() }}
          </span>
        </div>
      </div>
    </nav>
    <RouterView />
    <p class="text-center mt-3">
      &copy; {{ year }} Univerzitet Singidunum - Praktikum: Sistemi E-Poslovanja
    </p>
  </div>
</template>