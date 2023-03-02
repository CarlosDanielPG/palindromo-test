import axios from "axios"

export const baseUrl = process.env.API_BASE_URL ?? "http://localhost:3000"
const api = axios.create({
  baseURL: baseUrl
})

export default api