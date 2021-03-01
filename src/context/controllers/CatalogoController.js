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
        .then(res => res.data.message.response)

        if(!response){
            throw new Error('error on fetch data')
        }

        return response

    },
    getBrands: async() => {

        let response = await api.get("/brands")
        .then(res => res.data.message.response)

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
    },
    getBrandById: async(ctx, evt) => {
        const { id } = evt
        
        let response = await api.get(`/brands/${id}`)
            .then( res => res.data.message )

            return response
    },
    getLabelsById: async(ctx, evt) => {
        const { id } = evt
        
        let response = await api.get(`/labels/${id}`)
            .then( res => res.data.message )

            return response

    },
    getByText: async(_, evt) => {
        const { id } = evt
        
        let response = await api.get(`/catalog/search/?text=${id}`)
            .then( res => res.data.message  )

            console.log(response)

            return response
    }
}