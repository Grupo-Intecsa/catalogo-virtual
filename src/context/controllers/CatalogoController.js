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
        
    }
}