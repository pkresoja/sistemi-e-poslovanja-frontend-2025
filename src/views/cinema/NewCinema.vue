<script lang="ts" setup>
import Navigation from '@/components/Navigation.vue';
import { useLogout } from '@/hooks/logout.hook';
import { CinemaService } from '@/services/cinema.service';
import { showError } from '@/utils';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()
const logout = useLogout()
const cinema = ref({
    name: '',
    location: ''
})

function save() {
    if (cinema.value == null) return
    if (cinema.value.name == '' || cinema.value.location == '') {
        showError('Polja ime i lokacija su obavezna!')
        return
    }

    CinemaService.createCinema(cinema.value)
    .then(rsp => {
        router.push('/cinema')
    })
    .catch((e) => logout(e))
}
</script>

<template>
    <Navigation />
    <div v-if="cinema">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item">
                    <RouterLink to="/">Početna</RouterLink>
                </li>
                <li class="breadcrumb-item">
                    <RouterLink to="/cinema">Bioskopi</RouterLink>
                </li>
                <li class="breadcrumb-item active" aria-current="page">
                    Dodaj
                </li>
            </ol>
        </nav>
        <h1>Dodaj Bioskop</h1>
        <form v-on:submit.prevent="save">
            <div class="mb-3">
                <label for="name" class="form-label">Naziv:</label>
                <input type="text" class="form-control" id="name" v-model="cinema.name">
            </div>
            <div class="mb-3">
                <label for="location" class="form-label">Lokacija:</label>
                <input type="text" class="form-control" id="location" v-model="cinema.location">
            </div>
            <button type="submit" class="btn btn-primary">
                <i class="fa-solid fa-floppy-disk"></i> Sačuvaj
            </button>
        </form>
    </div>
</template>