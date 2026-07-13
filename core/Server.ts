import axios from "axios"
import { ENV } from "./config/Env"
export const Server = axios.create({
    baseURL:ENV.BASE_URL
})