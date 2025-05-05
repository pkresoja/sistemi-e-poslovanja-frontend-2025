<script setup lang="ts">
import { ref } from 'vue';

const search = ref({
    title: '',
    actor: ''
})
</script>

<template>
    <h1>Praktikum Sistemi E-Poslovanja</h1>
    <p>Unos korisnika:</p>
    <pre>{{ search }}</pre>
    <input type="text" v-model="search.title">
    <input type="text" v-model="search.actor">
    <p v-if="search.actor !== ''">Pretraga glumca: {{ search.actor }}</p>
    <p v-else>Niste uneli nista u polje pretrage glumca</p>
    <p v-if="search.title !== ''">Pretraga naslova: {{ search.title }}</p>
    <p v-else>Niste uneli pretragu naslova</p>
</template>
