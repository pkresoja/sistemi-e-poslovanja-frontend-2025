import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MovieView from '@/views/MovieView.vue'
import ListView from '@/views/ListView.vue'
import CinemaView from '@/views/cinema/CinemaView.vue'
import EditCinema from '@/views/cinema/EditCinema.vue'
import NewCinema from '@/views/cinema/NewCinema.vue'
import LoginView from '@/views/user/LoginView.vue'
import UserView from '@/views/user/UserView.vue'
import RegisterView from '@/views/user/RegisterView.vue'
import HallView from '@/views/hall/HallView.vue'
import EditHall from '@/views/hall/EditHall.vue'
import NewHall from '@/views/hall/NewHall.vue'
import ProjectionView from '@/views/projection/ProjectionView.vue'
import EditProjection from '@/views/projection/EditProjection.vue'
import NewProjection from '@/views/projection/NewProjection.vue'
import NewReservation from '@/views/reservation/NewReservation.vue'
import ReservationView from '@/views/reservation/ReservationView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: 'Početna'
      }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: {
        title: 'Prijava'
      }
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      meta: {
        title: 'Registracija'
      }
    },
    {
      path: '/user',
      name: 'user',
      component: UserView,
      meta: {
        title: 'Korisnik'
      }
    },
    {
      path: '/reservation',
      name: 'reservation',
      component: ReservationView,
      meta: {
        title: 'Rezervacije'
      }
    },
    {
      path: '/movie/:link/reservation',
      name: 'new-reservation',
      component: NewReservation,
      meta: {
        title: 'Rezervacija'
      }
    },
    {
      path: '/movie/:link',
      name: 'movie',
      component: MovieView,
      meta: {
        title: 'Film'
      }
    },
    {
      path: '/list',
      name: 'list',
      component: ListView,
      meta: {
        title: 'Lista'
      }
    },
    {
      path: '/cinema',
      name: 'cinema',
      component: CinemaView,
      meta: {
        title: 'Bioskopi'
      }
    },
    {
      path: '/cinema/new',
      name: 'new-cinema',
      component: NewCinema,
      meta: {
        title: 'Novi Bioskop'
      }
    },
    {
      path: '/cinema/:id/hall',
      name: 'hall',
      component: HallView,
      meta: {
        title: 'Sale'
      }
    },
    {
      path: '/cinema/:id',
      name: 'edit-cinema',
      component: EditCinema,
      meta: {
        title: 'Izmeni Bioskop'
      }
    },
    {
      path: '/hall/new',
      name: 'new-hall',
      component: NewHall,
      meta: {
        title: 'Dodaj Salu'
      }
    },
    {
      path: '/hall/:id/projection',
      name: 'projection',
      component: ProjectionView,
      meta: {
        title: 'Projekcije'
      }
    },
    {
      path: '/hall/:id',
      name: 'edit-hall',
      component: EditHall,
      meta: {
        title: 'Izmeni Salu'
      }
    },
    {
      path: '/projection/new',
      name: 'new-projection',
      component: NewProjection,
      meta: {
        title: 'Dodaj Projekciju'
      }
    },
    {
      path: '/projection/:id',
      name: 'edit-projection',
      component: EditProjection,
      meta: {
        title: 'Izmeni Projekciju'
      }
    },
    {
      path: '/:catchAll(.*)',
      redirect: '/'
    }
  ],
})

router.beforeEach((to, from, next) => {
  if (to.meta) {
    document.title = `${to.meta.title} :: PSEP 2025`
  }

  next()
})

export default router
