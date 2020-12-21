import axios from 'axios';



const axiosInstance = axios.create({
    baseURL: 'https://demo'
})

export default axiosInstance