<script lang="ts" setup>
import Loading from '@/components/Loading.vue';
import Navigation from '@/components/Navigation.vue';
import { useLogout } from '@/hooks/logout.hook';
import type { CinemaModel } from '@/models/cinema.model';
import { CinemaService } from '@/services/cinema.service';
import { formatDate } from '@/utils';
import { ref } from 'vue';

const cinemas = ref<CinemaModel[]>()
const logout = useLogout()

CinemaService.getCinemas()
    .then(rsp => {
        cinemas.value = rsp.data
    })
    .catch((e) => logout())

function deleteCinema(cinema: CinemaModel) {
    if (!confirm(`Obrisati bioskop ${cinema.name}?`)) return
    CinemaService.deleteCinemaById(cinema.cinemaId)
        .then(rsp => {
            cinemas.value = cinemas.value?.filter(c => c.cinemaId !== cinema.cinemaId)
        })
        .catch((e) => logout())
}
</script>

<template>
    <Navigation />
    <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
            <li class="breadcrumb-item">
                <RouterLink to="/">Početna</RouterLink>
            </li>
            <li class="breadcrumb-item active" aria-current="page">
                Bioskopi
            </li>
        </ol>
    </nav>
    <h1>Bioskopi</h1>
    <RouterLink to="/cinema/new" class="btn btn-primary">
        + Dodaj Bioskop
    </RouterLink>
    <table class="table table-striped table-hover" v-if="cinemas">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Naziv</th>
                <th scope="col">Lokacija</th>
                <th scope="col">Izmenjeno</th>
                <th scope="col">Opcije</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="c of cinemas">
                <th scope="row">{{ c.cinemaId }}</th>
                <td>{{ c.name }}</td>
                <td>{{ c.location }}</td>
                <td>{{ formatDate(c.updatedAt ?? c.createdAt) }}</td>
                <td>
                    <div class="btn-group">
                        <RouterLink :to="`/cinema/${c.cinemaId}/hall`" class="btn btn-sm btn-primary" title="Sale">
                            <i class="fa-solid fa-list"></i>
                        </RouterLink>
                        <RouterLink :to="`/cinema/${c.cinemaId}`" class="btn btn-sm btn-success" title="Izmeni">
                            <i class="fa-solid fa-pen-to-square"></i>
                        </RouterLink>
                        <button type="button" class="btn btn-sm btn-danger" @click="deleteCinema(c)" title="Ukloni">
                            <i class="fa-solid fa-trash-can"></i>
                        </button>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
    <Loading v-else />
</template>