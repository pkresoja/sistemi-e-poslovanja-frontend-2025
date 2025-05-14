import axios from "axios";

export async function useAxios(url: string, method: 'get' | 'post' | 'put' | 'delete' = 'get', data: any = {}) {
    return await axios.request({
        baseURL: 'http://localhost:3000/api',
        url: url,
        method: method,
        headers: {
            'Accept': 'application/json'
        },
        data: data,
        validateStatus: (status: number) => {
            return true
        }
    })
}

export function formatDate(iso: string) {
    return new Date(iso).toLocaleString('sr-RS', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    })
}