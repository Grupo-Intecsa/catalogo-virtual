import { Machine, assign } from 'xstate'

import CatalogoController from './controllers/CatalogoController'

export const CatalogoXstate = Machine({
    id: "catalgo",
    initial: "idle",
    context: {
        all_products: [],
        sample: [],
        queryBrand: []
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
        getBrandById: {
            invoke: {
                src: CatalogoController.getBrandById,
                onDone: {
                    target: 'success',
                    actions: assign({
                        queryBrand: (_, evt) => evt.data
                    })
                }
            }
        },
        getLabelsById:{
            invoke: {
                src: CatalogoController.getLabelsById,
                onDone: {
                    target: 'success',
                    actions: assign({
                        queryBrand: (_, evt) => evt.data
                    })
                }
            }
        },
        getByText:{
            invoke: {
                src: CatalogoController.getByText,
                onDone: {
                    target: 'success',
                    actions: assign({
                        queryBrand: (_, evt) => evt.data
                    })
                }
            }
        },
        getFamilia: {
            invoke: {
                src: CatalogoController.getFamilia,
                onDone: {
                    target: 'success',
                    actions: assign({
                        queryBrand: (_, evt) => evt.data
                    })
                }
            }
        },
        success: {},
        reject: {},
    },
    on: {
        ALL_PRODUCTOS: 'all_products',
        SAMPLE: 'sample',
        GET_BRAND_ID: 'getBrandById',
        GET_LABEL_ID: 'getLabelsById',
        GET_TEXT_QUERY: [
            {
                target: 'getByText',
                cond: (_, event ) => event.id.split("").length > 2
            },
            {
                target: 'reject'
            }
        ],
        GET_FAMILIA: 'getFamilia'
    }
})