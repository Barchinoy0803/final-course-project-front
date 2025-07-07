import axios from "axios";

export const api = axios.create({
    baseURL: "https://api.keldibekov.uz/"
})

api.interceptors.request.use((config) => {
    let token = localStorage.getItem("accessToken")
    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})
