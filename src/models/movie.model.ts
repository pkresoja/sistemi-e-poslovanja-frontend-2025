import type { ActorModel } from "./actor.model"
import type { DirectorModel } from "./director.model"
import type { GenreModel } from "./genre.model"

export interface MovieModel {
    movieId: number
    internalId: string
    corporateId: string
    directorId: number
    title: string
    originalTitle: string
    description: string
    shortDescription: string
    poster: string
    startDate: string
    shortUrl: string
    runTime: number
    active: boolean
    createdAt: string
    updatedAt: string | null
    director: DirectorModel
    movieActors: ActorModel[]
    movieGenres: GenreModel[]
}