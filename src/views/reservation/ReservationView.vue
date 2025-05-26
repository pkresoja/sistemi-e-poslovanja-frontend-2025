<script lang="ts" setup>
import Loading from '@/components/Loading.vue';
import Navigation from '@/components/Navigation.vue';
import { useLogout } from '@/hooks/logout.hook';
import type { ReservationModel } from '@/models/reservation.model';
import { ReservationService } from '@/services/reservation.service';
import { formatDate } from '@/utils';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const reservations = ref<ReservationModel[]>()
const router = useRouter()
const logout = useLogout()

ReservationService.getReservations()
    .then(rsp => reservations.value = rsp.data)
    .catch(e => logout())

function deleteReservation(model: ReservationModel) {
    if (!confirm(`Obrisati rezervaciju ${model.projection.movie.title} za ${formatDate(model.projection.time)}?`))
        return

    ReservationService.deleteReservation(model.reservationId)
        .then(rsp => reservations.value = reservations.value?.filter(obj => obj.reservationId !== model.reservationId))
        .catch(e => logout())
}

function isOutdated(model: ReservationModel) {
    return new Date(model.projection.time) >= new Date() ? 'text-success fw-bold' : 'text-danger fw-bold'
}
</script>

<template>
    <Navigation />
    <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
            <li class="breadcrumb-item">
                <RouterLink to="/">Početna</RouterLink>
            </li>
            <li class="breadcrumb-item">
                <RouterLink to="/user">Moj Nalog</RouterLink>
            </li>
            <li class="breadcrumb-item active" aria-current="page">
                Rezervacije
            </li>
        </ol>
    </nav>
    <h1>Rezervacije</h1>
    <table class="table table-striped table-hover" v-if="reservations">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Film</th>
                <th scope="col">Br. Karata</th>
                <th scope="col">Vreme</th>
                <th scope="col">Sala</th>
                <th scope="col">Bioskop</th>
                <th scope="col">Odgledano</th>
                <th scope="col">Izmenjeno</th>
                <th scope="col">Opcije</th>
            </tr>
        </thead>
        <tbody>
            <tr v-if="reservations.length > 0" v-for="r of reservations">
                <th scope="row">{{ r.reservationId }}</th>
                <td>{{ r.projection.movie.title }}</td>
                <td>{{ r.numOfSeats }}</td>
                <td :class="isOutdated(r)">{{ formatDate(r.projection.time) }}</td>
                <td>{{ r.projection.hall.name }}</td>
                <td>{{ r.projection.hall.cinema.name }}</td>
                <td>{{ formatDate(r.watchedAt) }}</td>
                <td>{{ formatDate(r.updatedAt ?? r.createdAt) }}</td>
                <td>
                    <div class="btn-group">
                        <button class="btn btn-sm btn-success"
                            @click="() => router.push(`/reservation/${r.reservationId}`)"
                            :disabled="new Date(r.projection.time) <= new Date()">
                            <i class="fa-solid fa-pen-to-square"></i>
                        </button>
                        <button type="button" class="btn btn-sm btn-danger" @click="deleteReservation(r)">
                            <i class="fa-solid fa-trash-can"></i>
                        </button>
                    </div>
                </td>
            </tr>
            <tr v-else>
                <td colspan="8">Nemate rezervisanih karata</td>
            </tr>
        </tbody>
    </table>
    <Loading v-else />
</template>