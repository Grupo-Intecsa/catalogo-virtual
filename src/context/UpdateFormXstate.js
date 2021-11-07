import { createMachine, assign } from 'xstate'
import { api } from 'context/controllers/CatalogoController'

const findByModel = async(ctx, event) => {   

    const { model } = event.id
    const { productData } = ctx

    productData.step2 = { model } 

    const query = await api.get(`/catalog/product/${model}`)
    .then(res => res.data.message)

    return query
        
}

const getSelectorData = async() => {

    const p1 = new Promise((resolve) => {
        resolve(
            api.get('/labels')
            .then(res => res.data.message)
        )
    })

    const p2 = new Promise((resolve) => {
        resolve(
            api.get('/brands')
            .then(res => res.data.message)
        )
    })

    return Promise.all([ p1, p2]).then(res => {
        return { labels: res[0], brands: res[1] }
    })

}

const buscadorGuard = (_, event) => {
        return Object.values(event.id).map(item => item).toString().length > 4
}

const sendData = async(ctx) => {
    
    const { step2, step3, step4, final } = ctx.productData
    const data = Object.assign({}, step2, step3, step4, final )

    const query = await api.post(`/catalog/create/`, data )
    .then(res => res.data.message)

    return query
}


export const MachineProductForm = createMachine(
{   
    id: 'productForm',
    initial: 'idle',
    context: {
        isValid: false,
        isError: false,
        init: true,
        step1: false,
        step2: false,
        step3: false,
        step4: false,
        final: false,
        productData: {
            step2: undefined
        },
        labelsAndBrands: {}
    },
    states: {

        idle: {
            entry: assign({
                isValid: false,
                isError: false,
                init: true,
                step1: false,
                step2: false,
                step3: false,
                step4: false,
                final: false,
                productData: {
                    step2: undefined
                }

            }),
            on: {
                GO_STEP1: 'step1',
            },
        },
        step1: {
            entry:  assign({
                step1: true,
                init: false
            }),
            on: {
                VERIFY: [
                    {
                        target: 'findByModel',
                        cond: 'buscadorGuard'
                    },
                    {
                        target: 'reject'
                    },
                    
                ],
            },
            invoke: {
                src: getSelectorData,
                onDone: {
                    actions: assign({
                        labelsAndBrands: (_, event) => event.data                    
                    })
                }
                
            },
        },
        findByModel: {
            invoke: {
                src: findByModel,
                onDone: {
                    target: 'step1',
                    actions: assign({
                        isValid: true
                    }   
                    )
                },
                onError: {
                    target: 'step2',
                }
            }
        },
        step2:{

            entry: assign({
                step1: false,
                step2: true,
                productData: (ctx) => {
                    const { productData } = ctx
                    return { ...productData }
                }
            }),
            on: { GO_STEP3: 'step3' },
            
        },
        step3:{

            entry: assign({
                step2: false,
                step3: true,
                productData: (ctx, event) => {
                    const { productData } = ctx
                    return { ...productData, step3: event.data }
                }
            }),
            on: { GO_STEP4: 'step4' }
        },
        step4:{

            entry: assign({
                step3: false,
                step4: true,
                productData: (ctx, event) => {
                    const { productData } = ctx
                    return { ...productData, step4: event.data }
                }
            }),
            on: { GO_FINAL: 'final' }
        },
        final: {
            invoke: {
                src: sendData
            },
            entry: assign({
                step4: false,
                final: true,
                productData: (ctx, event) => {
                    const { productData } = ctx
                    return { ...productData, final: event.data }
                }
            }),
            on: { RESET: 'idle' }
        },
        reject: {
            on:{
                "": 'step1',
                
            },
            entry: assign({
                isError: true 
            })
        },
            
    },
},
    {
        actions: {
            getSelectorData,
        },
        guards: {
            buscadorGuard,
        }
    }
)   


