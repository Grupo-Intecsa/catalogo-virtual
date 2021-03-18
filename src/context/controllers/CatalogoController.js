/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios'
import decode from 'jwt-decode'

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
        
        return response.filter(item => item.count > 0)

    },
    getBrands: async() => {

        let response = await api.get("/brands")
        .then(res => res.data.message.response)

        if(!response){
            throw new Error('error on fetch data')
        }

        return response.filter(item => item.count > 0)
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

            return response
    },
    getFamilia: async() => {    
                
        let response = await api.get('/familia')
            .then( res => res.data.productos )

            return response
    },
    login: async(ctx, event) => {

        console.log('READY FOR THIS SHIT', event.data)

        let response = await api.post('/user/login/', event.data)
        .then(res => res)

        console.log(response.status)
        
        if(response.status === 200){
            localStorage.setItem('tokenUserSite', response.data.login.token)
        }
        // TODO guardar el token en el localhost

        return response

    },
    auth: async() => {

        console.log('I DONT FEEL PROTECTED')

        const token = localStorage.getItem('tokenUserSite')
                
        const res = await api.get(`/user/${decode(token).id}`, {
            headers: { Authorization: `Bearer ${token}`}
        })
        
        return res
    }
}