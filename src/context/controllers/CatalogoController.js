/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios'

const api = axios.create({
    baseURL: 'https://quiet-castle-61424.herokuapp.com/api/v1'
})

export default {
    allProductos: async() => {
        
        let response = await api.get("/catalog/products")
        .then(res => res.data.message )
        
        if(!response){
            throw new Error('No data')

        }
        return response
        
    },
    getLables: async() => {

        let response = await api.get("/labels")
        .then(res => res.data.message)

        console.log(response, 'label')

        if(!response){
            throw new Error('error on fetch data')
        }

        return response

    },
    getBrands: async() => {

        let response = await api.get("/brands")
        .then(res => res.data.message)

        console.log(response, 'brand')

        if(!response){
            throw new Error('error on fetch data')
        }

        return response
    },
    getSample: async() => {
        let response = await api.get("/catalog/sample")
        .then(res => res.data.message )
        
        if(!response){
            throw new Error('No data')

        }
        return response
    }
}