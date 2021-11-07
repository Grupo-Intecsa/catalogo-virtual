import { Machine, assign }  from 'xstate'
// base URL 
import { api } from './controllers/CatalogoController'

    const getTextQuery = async(ctx, evt) => {
        const { id } = evt
        ctx.pendingSearch = true
        ctx.currentSelected = []

        let response = await api.get(`/catalog/search?text=${id}`)
            .then( res => {
                const { pages, familias, payload, valoresFiltros } = res.data.message
                ctx.pagesOf = pages
                ctx.familias = familias
                ctx.filtros = valoresFiltros
                ctx.hitSearchBackup = [...payload]
                ctx.familiasBackup = [...familias]

                return payload
            })

            if(response.status === 404 ) throw new Error('No hay informacion para tu busqueda')
            
            return response
    }

    const getMoreData = async(ctx, evt) => {
        const { id } = evt
        const { hitSearch } = ctx
               
        let moreData = await api.get(`/catalog/search?text=${id}`)
            .then( res => res.data.message.payload )

        const mergeData =  hitSearch.concat(moreData)
        return mergeData

    }

    const filter = async({ currentSelected, hitSearchBackup }) => {

        function filteredValues({ payload, val }){
            return payload.filter(({ familia }) => familia === val )
            
        }

        let familiasSelected = currentSelected.map(item => {
            return filteredValues({ payload: hitSearchBackup, val: item })
        })

        return familiasSelected
        .reduce(( arrayTotal, current ) => arrayTotal.concat(current), [])
        .reverse()
        
    }

    const restored = async( ctx ) => {
        const { familiasBackup, hitSearchBackup } = ctx
        ctx.familias = familiasBackup
        ctx.currentSelected = [] 

        return hitSearchBackup
    }

export const SearchContext = Machine({
    id: "search",
    initial: "iddle",
    context: {
        hitSearch: [],
        hitSearchBackup: [],
        currentSelected: [],
        page: 0,
        pagesOf: undefined,
        familias: undefined,
        familiasBackup: [],
        filtros: [],
        moreData: []


    },
    states: {
        iddle: {},
        success: {
            on: {
                MORE_DATA: 'moreData',
            }
        },
        error: {},
        restored: {
            invoke: {
                src: restored,
                onDone: {
                    actions: assign({
                        hitSearch: (ctx, event) => event.data
                    })
                }
            }
        },
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
                    target: "error",
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
        },
        filter: {
            invoke:{
                src: filter,
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
        FILTER: [
            {
                target: "filter", 
                actions: ({ currentSelected }, { option }) => {

                    const isSelected = currentSelected.includes(option.familia)
                    if(isSelected && currentSelected.length > 0 ){
                        
                        let selected = currentSelected.indexOf(option.familia)
                        return currentSelected.splice(selected, 1)

                    }else if(!isSelected){
                        return currentSelected = currentSelected.push(option.familia)
                    }else if(currentSelected.length === 0 ){
                        console.log("hola")
                    }
                }
            },
            // {
            //     target: 'restored',
            // }
        ],
        GET_TEXT_QUERY: 'getTextQuery',
        EMPTY: {
            actions: (ctx) => ctx.hitSearch = []
        },
    }
})
