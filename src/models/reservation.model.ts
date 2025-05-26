import type { ProjectionModel } from "./projection.model"

export interface ReservationModel {
    reservationId: number
    projectionId: number
    projection: ProjectionModel
    numOfSeats: number
    watchedAt: null | string
    rating: null | number
    comment: null | string
    createdAt: string
    updatedAt: string
}