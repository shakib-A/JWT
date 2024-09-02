import axios from "axios";

export const app = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true
})

app.interceptors.request.use()
