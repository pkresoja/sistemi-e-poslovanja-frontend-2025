<script lang="ts" setup>
import type { MovieModel } from '@/models/movie.model';
import axios from 'axios';
import { ref } from 'vue';

const movies = ref<MovieModel[]>()
axios.get('https://movie.pequla.com/api/movie')
    .then(rsp => movies.value = rsp.data)
</script>

<template>
    <div v-if="movies">
        <p>Filmovi:</p>
        <ul>
            <li v-for="m of movies">
                <RouterLink :to="`/movies/${m.shortUrl}`">
                    {{ m.title }} (Reziser: {{ m.director.name }})
                </RouterLink>
                <ul v-for="a of m.movieActors">
                    <li>{{ a.actor.name }}</li>
                </ul>
            </li>
        </ul>
        <pre>{{ movies }}</pre>
    </div>
    <div v-else>Podaci se ucitavaju</div>
</template>