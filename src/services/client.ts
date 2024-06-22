import axios, { AxiosRequestConfig } from 'axios';

const client = axios.create({
    baseURL: '/api/',
    timeout: 30000
});

export const getJsonAsync = async (endpoint: string, config?: AxiosRequestConfig) => {
    return client.get(endpoint, config).then(response => response.data);
};

export default client;