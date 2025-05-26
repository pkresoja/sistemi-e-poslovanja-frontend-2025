import { AuthService } from "@/services/auth.service"
import { useRouter } from "vue-router"

export function useLogout() {
    const router = useRouter()

    const logout = () => {
        AuthService.clearTokens()
        router.push('/login')
    }

    return logout
}