import axios from "axios";

const client = axios.create({
    baseURL: 'https://movie.pequla.com/api',
    headers: {
        'Accept': 'application/json'
    },
    validateStatus: (status: number) => {
        return status === 200
    }
})

export class MovieService {
    static async getMovies() {
        return await client.get('/movie')
    }

    static async getMovieByShortUrl(short: string) {
        return await client.get(`/movie/short/${short}`)
    }

    static async getActors() {
        return await client.get('/actor')
    }
}