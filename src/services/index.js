import axios from "axios";

export const AxoisInstance = axios.create({
    baseURL: 'https://dummyjson.com/products',
    timeout: 1000,
});


