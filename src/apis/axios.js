import axios from 'axios'

const url = process.env.REACT_APP_BACKEND_API
const url2 = "http://192.168.29.83:5500"

export const authRoute = axios.create({
    baseURL: `${url}/auth`
})