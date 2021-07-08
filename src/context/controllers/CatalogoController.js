import axios from 'axios'
import decode from 'jwt-decode'

const api = axios.create({
    baseURL: 'https://quiet-castle-61424.herokuapp.com/api/v1'
    // baseURL: 'http://localhost:3000/api/v1'
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

        let response = await api.get(`/catalog/sample/?limit=10&offset=0`)
        .then(res => res.data.message )
        
        if(!response){
            throw new Error('No data')

        }
        return response
    },
    infiniteScroll: async(ctx) => {
        const { countPage, infiniteData, infiniteCount } = ctx

        const page = countPage
        const { prod } = infiniteData
        
        let response = await api.get(`/catalog/sample/?limit=10&offset=${ (10 * page )}`)
        .then(res => res.data.message )

        if(response.infiniteCount === Object.values(infiniteData).length + 10 ){
            infiniteCount.message = "Limite de datos"
            return infiniteData

        }else if(countPage === 0 && Object.values(infiniteData).length === 0 ){
            infiniteCount.message = {}
            return response.prod

        }else if(Object.values(infiniteData).length > 0){
            const next = infiniteData.concat(response.prod)
            return next

        }else if(!Array.isArray(prod)){
            return response.prod
        }
    },

    findByBrandIdCatalogo: async(ctx, evt) => {

        const { id, page } = evt

        let response = await api.get(`/brands/catalogo/${id}/?limit=10&offset=${ ( 10 * page ) - 10 }`)
            .then( res => res.data.message )

            return response
    },
    getFamiliaByTitleId: async(ctx, evt) => {

        const { id, page } = evt

        let response = await api.get(`/familia?id=${id}&limit=10&offset=${ (10 * page ) - 10 }`)
        .then( res => res.data.message)

        return response
    },
    getFamiliaByBrandId: async(ctx, event) => {

        let response = await api.get(`/brand/familia/etiqueta/${event.id}`)
            .then(res => res.data.message)
            .catch(err => err)

            return response

    },
    getLabelsById: async(ctx, evt) => {
        const { id } = evt
        
        let response = await api.get(`/labels/catalogo/${id}/?limit=11&offset=1`)
            .then( res => res.data.message )

            return response

    },
    getByText: async(_, evt) => {
        const { id, page } = evt
        
        // let response = await api.get(`/catalog/search/?text=${id}`)
        let response = await api.get(`/catalog/search?text=${id}&limit=5&offset=${ ( 5 * page ) - 5 }`)
            .then( res => res.data.message  )

            if(response.status === 404 ) throw new Error('No hay informacion para tu busqueda')

            return response
    },
    getFamilia: async() => {    
                
        let response = await api.get('/familia')
            .then( res => res.data.productos )

            return response
    },
    // funciones para el loggin
    login: async(ctx, event) => {

        let response = await api.post('/user/login/', event.data)
        .then(res => res)
        
        if(response.status === 200){
            localStorage.setItem('tokenUserSite', response.data.login.token)
        }
        // TODO guardar el token en el localhost

        return response

    },
    auth: async() => {

        const token = localStorage.getItem('tokenUserSite')
                
        const res = await api.get(`/user/${decode(token).id}`, {
            headers: { Authorization: `Bearer ${token}`}
        })
        
        return res
    },
    getCatalogoById: async(ctx) => { 

        const { id } = ctx

        const res = await api.get(`/catalog/detalle/product/${id}`)
        .then(res => res.data.message)
        
        return res
    },
    getFamiliaById: async(ctx) => { 

        const { id } = ctx

        const res = await api.get(`/familia/detalle/product/${id}`)
        .then(res => res.data.message)

        return res
    },
    getProductsByParentId: async(ctx, event) => {
        const id = event.data

        const res = await api.get(`/label/familia/parent/${id}`)
        .then(res => res.data.message)

        return res 
    },
    sendToMonday: async(ctx, event) => {
    
        const res = await api.post(`/monday/create`, event.data)
        .catch(res => res)

        if(res.status === 200) return res
    },
    getProductByModel: async(ctx) => {

        const res = await api.get(`/catalog/product/${ctx.modelUpdate}`)
        .then(res => res.data.message)

        return res
    },
    updateByModel: async(ctx, event) => {

        const update = await api.patch(`/catalog/product/${ctx.modelUpdate}`, event.body)
        .then(res => res.data.message.n)

        if(await update === 1 ){
            return true
        }

    },
    invoiceCreate: async(ctx, event) => {

        const invoiceSave = await api.post('/save-pdf', event)
        .then(res => res.data && res.data.message && res.data.message._id)

        return invoiceSave

    }, 
    getDataToInvoice: async(ctx, event) => {

        const dataInvoice = await api.get(`invoice/${event.folio}`)
            .then(res => res.data && res.data.message)
        
            return dataInvoice
    },
    getProductsByLabelId: async(ctx, event) => {
            
        const { id } = event
        console.log(id)

        const response = await api.get(`labels/${id}`)
        .then(res => res.data && res.data.message)
        
        return response
        
    },
    getPrice: async({ ml }) => {

        const mlSplit = ml?.split("MLM")[1]

        const precio = await api.get(`/price?ml=${mlSplit}`)
        .then(res => res)

        if(precio.statusText === "OK"){
            return precio.data.precio
        }
    }
    
}