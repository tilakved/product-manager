import { AxoisInstance } from './index';

// axios.get('https://dummyjson.com/products?limit=10&skip=0').then(function (response) {
//     console.log(response)
// }).catch(function (error) {
//     console.log(error);
// })

export const productsApi = {
    getAllProducts: async (limit, skip) => {
        const response = await AxoisInstance.request({
            url: `?limit=${limit}&skip=${skip}`,
            method: 'GET'
        })
        return response;
    },
    getProductDetails: async (id) => {
        const response = await AxoisInstance.request({
            url: `/${id}`,
            method: 'GET'
        })
        return response;
    },
    addProduct: async (data) => {
        const response = await AxoisInstance.request({
            url: '/add',
            data,
            method: 'POST'
        })
        return response;
    }

}