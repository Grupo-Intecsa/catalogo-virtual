import { Machine, assign } from 'xstate'

import CatalogoController from './controllers/CatalogoController'

export const CatalogoXstate = Machine({
    id: "catalgo",
    initial: "idle",
    context: {
        id: undefined,
        error: undefined,
        all_products: [],
        sample: [],
        queryBrand: [],
        familia: []
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
                src: CatalogoController.findByBrandIdCatalogo,
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
                },
                onError: {
                    target: 'error',
                    actions: assign({
                        error: (_, event) => event.data
                    })
                }
            }
        },
        getFamiliaByBrandId: {
            invoke: {
                src: CatalogoController.getFamiliaByBrandId,
                onDone: {
                    actions: assign({
                        familia: (_, evt) => evt.data
                    })
                },
                onError: {
                    target: 'error',
                    actions: assign({
                        error: (_, event) => event.data
                    })
                }
            }
        },
        getFamiliaByTitleId: {
            invoke: {
                src: CatalogoController.getFamiliaByTitleId,
                onDone: {
                    target: 'success',
                    actions: assign({
                        queryBrand: (_, event ) => event.data
                    })
                },
                onError: {
                    target: 'error',
                    actions: assign({
                        error: (_, event) => event.data
                    })
                }
            }
        },
        error: {},
        success: {},
        reject: {},
    },
    on: {
        ALL_PRODUCTOS: 'all_products',
        SAMPLE: 'sample',
        GET_BRAND_ID: {
            target: 'getBrandById',
            actions: (ctx, event) => ctx.id = event.id
        },
        GET_FAMILA_BY_ID: "getFamiliaByBrandId",
        GET_FAMILA_BY_TITLE: "getFamiliaByTitleId",
        GET_TEXT_QUERY: [
            {
                target: 'getByText',
                cond: (_, event ) => {
                    
                    return event.id.split("").length > 2
                }
            },
            {
                target: 'reject'
            }
        ]

    }
})