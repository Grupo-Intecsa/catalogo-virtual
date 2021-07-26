import { Machine, assign }  from 'xstate'
// base URL 
import { api } from './controllers/CatalogoController'

    const getTextQuery = async(ctx, evt) => {
        const { id, limit } = evt
              
        ctx.pendingSearch = true
        let response = await api.get(`/catalog/search?text=${id}&limit=${limit}`)
            .then( res => {
                ctx.pagesOf = res.data.message.pages[0].pages
                return res.data.message.payload
            })

            if(response.status === 404 ) throw new Error('No hay informacion para tu busqueda')
            return response
    }

    const getMoreData = async(ctx, evt) => {
        const { id, limit, skip } = evt
        const { hitSearch } = ctx
               
        let moreData = await api.get(`/catalog/search?text=${id}&limit=${limit}&offset=${skip}`)
            .then( res => res.data.message.payload )

        const mergeData =  hitSearch.concat(moreData)
        return mergeData

    }

export const SearchContext = Machine({
    id: "search",
    initial: "iddle",
    context: {
        hitSearch: [],
        page: 0,
        pagesOf: undefined,
        moreData: []


    },
    states: {
        iddle: {},
        success: {
            on: {
                MORE_DATA: 'moreData'
            }
        },
        error: {},
        getTextQuery: {
            invoke: {
                src: getTextQuery,
                onDone: {
                    target: "success",
                    actions: assign({
                        hitSearch: (ctx, event) => {
                            return event.data
                        }
                    })

                },
                onError: {
                    target: "success",
                    actions: assign({
                        error: (_, event) => event.data
                    })
                }
            }
        },
        moreData: {
            invoke: {
                src: getMoreData,
                onDone: {
                    target: "success",
                    actions: assign({
                        hitSearch: (_, event) => event.data
                    })
                }
            }
        }
    },
    on:{
        GET_TEXT_QUERY: 'getTextQuery',
        EMPTY: {
            actions: (ctx) => ctx.hitSearch = []
        },
    }
})