import axios from "axios"
const AxiosClients = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',

});

AxiosClients.interceptors.request.use((config) => {
    const token = localStorage.getItem('ACCESS_TOKEN');
    config.headers.Authorization = `Bearer ${token}`
    return config;
})

AxiosClients.interceptors.response.use((response) => {
    return response
}, (error) => {
    const { response } = error;
    if (response.status === 401) {
        localStorage.removeItem('ACCESS_TOKEN')
            // window.location.reload();
    } else if (response.status === 404) {
        //Show not found
    }

    throw error;
})


// ajout d’un intercepteur de réponse
AxiosClients.interceptors.response.use(function(response) {

    return response;
}, function(error) {


    return Promise.reject(error);
});

export default AxiosClients;