import axios from "axios"
const config = axios.create({
    baseURL : 'http://localhost:8080/api/v1',
    responseType: 'json',
    withCredentials: true,
});

export default config;
