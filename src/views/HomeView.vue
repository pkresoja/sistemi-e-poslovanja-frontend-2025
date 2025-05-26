<script setup lang="ts">
import { AuthService } from '@/services/auth.service';
import Loading from '@/components/Loading.vue';
import Navigation from '@/components/Navigation.vue';
import type { ActorModel } from '@/models/actor.model';
import type { DirectorModel } from '@/models/director.model';
import type { GenreModel } from '@/models/genre.model';
import type { MovieModel } from '@/models/movie.model';
import type { SearchModel } from '@/models/search.model';
import { BookmarkService } from '@/services/bookmark.service';
import { MovieService } from '@/services/movie.service';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useLogout } from '@/hooks/logout.hook';
import { showConfirm } from '@/utils';
import type { BookmarkModel } from '@/models/bookmark.model';

const logout = useLogout()
const actors = ref<ActorModel[]>()
const genres = ref<GenreModel[]>()
const directors = ref<DirectorModel[]>()
const search = ref<SearchModel>({
    actor: 0,
    genre: 0,
    director: 0
})

MovieService.getActors()
    .then(rsp => actors.value = rsp.data)

MovieService.getGenres()
    .then(rsp => genres.value = rsp.data)

MovieService.getDirectors()
    .then(rsp => directors.value = rsp.data)

const movies = ref<MovieModel[]>()
function loadMovies() {
    MovieService.getMovies(search.value)
        .then(rsp => movies.value = rsp.data)
}

const router = useRouter()
function addBookmark(movie: MovieModel) {
    showConfirm(`Dodaj ${movie.title} u sačuvane?`, () => {
        BookmarkService.createBookmark(movie.movieId)
            .then(rsp => router.push('/user'))
            .catch(e => logout(e))
    })
}

function removeBookmark(model: MovieModel) {
    // showConfirm(`Obrisi sačuvan film ${model.title}?`, () => {
    //     const id = bookmarks.value?.map(b=>b.movieId).find(b=>model.movieId)
    //     BookmarkService.deleteBookmark(model.bookmarkId)
    //         .then(rsp => {
    //             if (bookmarks.value == null) return
    //             bookmarks.value = bookmarks.value.filter(b =>
    //                 b.bookmarkId !== model.bookmarkId
    //             )
    //         })
    // })
}

function bookmarked(model: MovieModel) {
    return bookmarks.value?.map(b=>b.movieId).includes(model.movieId)
}

const bookmarks = ref<BookmarkModel[]>()
onMounted(() => {
    loadMovies()
    if (AuthService.getRefreshToken()) {
        BookmarkService.getBookmarks()
            .then(rsp => bookmarks.value = rsp.data)
    }
})

</script>

<template>
    <Navigation />
    <h1>Praktikum Sistemi E-Poslovanja</h1>
    <div class="row">
        <div class="col-12 col-md-4 mb-3" v-if="actors">
            <select class="form-select" v-model="search.actor" @change="loadMovies">
                <option :value="0">Odaberite glumca/icu</option>
                <option v-for="a of actors" :value="a.actorId">{{ a.name }}</option>
            </select>
        </div>
        <div class="col-12 col-md-4 mb-3" v-if="genres">
            <select class="form-select" v-model="search.genre" @change="loadMovies">
                <option :value="0">Odaberite žanr</option>
                <option v-for="g of genres" :value="g.genreId">{{ g.name }}</option>
            </select>
        </div>
        <div class="col-12 col-md-4 mb-3" v-if="directors">
            <select class="form-select" v-model="search.director" @change="loadMovies">
                <option :value="0">Odaberite režisera</option>
                <option v-for="d of directors" :value="d.directorId">{{ d.name }}</option>
            </select>
        </div>
    </div>
    <div class="card-holder" v-if="movies && movies.length > 0">
        <div class="card movie-card" v-for="m of movies" :key="m.movieId">
            <img :src="m.poster" class="card-img-top" :alt="m.title">
            <div class="card-body">
                <h5 class="card-title">{{ m.title }}</h5>
                <h6 class="card-subtitle mb-2 text-body-secondary">{{ m.director.name }}</h6>
                <p class="card-text">{{ m.shortDescription }}</p>
            </div>
            <div class="card-footer">
                <div class="btn-group">
                    <RouterLink :to="`/movie/${m.shortUrl}`" class="btn btn-sm btn-primary">
                        <i class="fa-solid fa-arrow-up-right-from-square"></i> Detalji
                    </RouterLink>
                    <template v-if="bookmarks">
                        <button type="button" class="btn btn-sm btn-success" @click="addBookmark(m)" v-if="!bookmarked(m)">
                            <i class="fa-solid fa-bookmark"></i> Sačuvaj
                        </button>
                        <button type="button" class="btn btn-sm btn-danger" @click="removeBookmark(m)" v-else>
                            <i class="fa-solid fa-bookmark"></i> Ukloni
                        </button>
                    </template>

                </div>
            </div>
        </div>
    </div>
    <div class="text-center" v-else-if="movies">
        Nije pronađen ni jedan film po zadatom kriterijumu!
    </div>
    <Loading v-else />
</template>

<style>
.card-holder {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: center;
}

.movie-card {
    width: 18rem;
    min-height: 200px;
}
</style>