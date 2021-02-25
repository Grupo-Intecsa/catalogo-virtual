import { Machine, assign } from 'xstate'


import CatalogoController from './controllers/CatalogoController'



export const CatalogoXstate = Machine({
    id: "catalgo",
    initial: "idle",
    context: {
        all_products: []
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
        success: {}
    },
    on: {
        ALL_PRODUCTOS: 'all_products'
    }
})