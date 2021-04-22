import { Machine, assign, actions } from 'xstate'
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
        modelUpdate: undefined,
        update: undefined,
        familia: [],
        productsOfParent: [],
        infiniteData: {},
        infiniteCount: {},
        countPage: 0
    },
    states: {
        idle: {
            'entry': {
                actions: [
                    () => console.log('perro de la z')
                ]
            }
            
        },        
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
        getCatalogoById: {
            invoke: {
                src: CatalogoController.getCatalogoById,
                onDone: {
                    target: 'success',
                    actions: assign({
                        queryBrand: (_, event) => event.data
                    })
                },
                onError: {
                    target: 'getFamiliaById',
                    actions: assign({
                        queryBrand: (_, event) => event.data
                    })
                }
            }
        },
        getFamiliaById: {
            invoke: {
                src: CatalogoController.getFamiliaById,
                onDone: {
                    target: 'success',
                    actions: assign({
                        queryBrand: (_, event) => event.data
                    })
                },
                onError: {
                    target: 'error',
                    actions: assign({
                        queryBrand: (_, event) => event.data
                    })
                }
            }
        },
        getProductsByParentId: {
            invoke: {
                src: CatalogoController.getProductsByParentId,
                onDone: {
                    target: 'success',
                    actions: assign({
                        productsOfParent: (ctx, event) => event.data
                    })
                },
                onError: {
                    target: 'error',
                    actions: assign({
                        error: (ctx, event) => event.data
                    })
                }
            }
        },
        sendToMonday: {
            invoke: {
                src: CatalogoController.sendToMonday,
                onDone:{
                    target: 'success',
                },
                onError: {
                    target: 'error'
                }
            }
        },
        infiniteData: {
            invoke: {
                src: CatalogoController.infiniteScroll,
                onDone: {
                    target: 'success',
                    actions: assign({
                        infiniteData: (ctx, event) => event.data
                    })
                }
            }  
        },
        getProductByModel:{
            invoke: {
                src: CatalogoController.getProductByModel,
                onDone: {
                    target: 'success',
                    actions: assign({
                        queryBrand: (ctx, event) => event.data
                    })
                },
                onError: {
                    target: "error",
                    actions: assign({
                        error: (ctx, event) => event.data
                    })
                }
            }
        },
        updateByModel: {
            invoke: {
                src: CatalogoController.updateByModel,
                onDone: {
                    target: "idle",
                    actions: assign({
                        update: (ctx, event) => ctx.update = true
                    })
                },
                onError: {
                    target: "error",
                    actions: assign({
                        error: (ctx, event) => event.data
                    })
                }
            }
        },
        error: {},
        success: {
            on: {
                MORE_DATA: {
                    target: 'infiniteData',
                    cond: (ctx) => !ctx.infiniteCount.message,
                    actions: [
                        assign({ countPage: (context) => context.countPage + 1 })
                        
                    ]

                },
                UPDATE: 'updateByModel',
                
            }
        },
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
        ],
        GET_CATALOGO_BY_ID: {
            target: "getCatalogoById",
            actions: (ctx, event) => ctx.id = event.data
        },
        GET_PRODUCTS_BY_PARENT_ID: "getProductsByParentId",
        SEND_TO_MONDAY: "sendToMonday",
        GET_PRODUCT_BY_MODEL: {
            target: "getProductByModel",
            actions: (ctx, event) => ctx.modelUpdate = event.model,
            cond: (_, event) => event.model.length > 0
        },
        RESET: {
            target: 'idle',
            actions: (ctx) => {
                ctx.modelUpdate = ""
                ctx.update = undefined
                ctx.infiniteCount = {}
                console.log('el ula ula')
            }
        }
        
        

    }
})