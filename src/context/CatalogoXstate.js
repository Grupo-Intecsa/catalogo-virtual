import { Machine, assign } from 'xstate'


import CatalogoController from './controllers/CatalogoController'



export const CatalogoXstate = Machine({
    id: "catalgo",
    initial: "idle",
    context: {
        all_products: [],
        sample: []
    },
    states: {
        idle: {},
        all_products: {
            invoke: {
                src: CatalogoController.allProductos,
                onDone: {
                    target: 'success',
                    actions: assign({
                        all_products: (cxt, evt) => evt.data
                    })
                }
            }
        },
        sample: {
            invoke: {
                src: CatalogoController.getSample,
                onDone: {
                    target: 'success',
                    actions: assign({
                        sample: (cxt, evt) => evt.data
                    })
                }
            }
        },
        success: {}
    },
    on: {
        ALL_PRODUCTOS: 'all_products',
        SAMPLE: 'sample'
    }
})