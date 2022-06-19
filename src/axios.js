import axios from "axios";

const axiosClient = axios.create({
    baseURL: 'https://ecommerce-api-greatkhanjoy.herokuapp.com/api/v1'
})

axiosClient.interceptors.request.use(config => {
    // config.headers.Authorization = `Bearer ${store.state.user.token}`
    config.headers.withCredentials = true;
    return config;
})

export default axiosClient;