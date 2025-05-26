import { UserService } from "./user.service"

export class BookmarkService {
    static async createBookmark(id: number) {
        return await UserService.useAxios(`/bookmark/movie/${id}`, 'post')
    }

    static async deleteBookmark(id: number) {
        return await UserService.useAxios(`/bookmark/${id}`, 'delete')
    }
}