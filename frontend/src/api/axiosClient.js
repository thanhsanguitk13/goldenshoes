import axios from "axios";
export const axiosClient = axios.create({
    baseURL: 'https://br-pi.vercel.app/'
})
