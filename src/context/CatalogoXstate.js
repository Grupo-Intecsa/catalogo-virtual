import { createMachine, assign } from 'xstate'
import CatalogoController from './controllers/CatalogoController'

export const CatalogoXstate = createMachine({
    id: "catalgo",
    initial: "idle",
    context: {
        id: undefined,
        error: undefined,
        all_products: [],
        sample: [],
        queryBrand: [],
        // para los resultados de la busqueda
        hitSearch: [],
        pendingSearch: false,
        // 
        modelUpdate: undefined,
        update: undefined,
        familia: [],
        productsOfParent: [],
        infiniteData: {},
        infiniteCount: {},
        countPage: 0,
        precio: undefined,
        categoriaSelection: []
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
                },
                onError: {
                    target: "error"
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
                },
                onError: {
                    target: "error"
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
                },
                onError: {
                    target: "error"
                }
            }
        },
        getByText:{  
            invoke: {
                src: CatalogoController.getByText,
                onDone: {
                    target: 'success',
                    actions: assign({
                        hitSearch: (_, evt) => {
                            return evt.data
                        }
                    }),

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
        getProducsByBrandId: {
            invoke: {
                src: CatalogoController.getProducsByBrandId,
                onDone: {
                    target: "success",
                    actions: assign({
                        queryBrand: (_, event) => event.data
                    })
                },
                onError: {
                    target: "error"
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
                },
                onError: {
                    target: "error"
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
                        update: (ctx) => ctx.update = true
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
        getProductsByLabelId:{
            invoke: {
                src: CatalogoController.getProductsByLabelId,
                onDone: {
                    target: "success",
                    actions: assign({
                        categoriaSelection: (ctx, event) => event.data
                    })
                }
            }
        },
        getPrecio: {
            invoke: {
                src: CatalogoController.getPrice,
                onDone: {
                    target: "success",
                    actions: assign({
                        precio: (ctx, event) => event.data
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
        SAMPLE: {
            target: 'sample',
            actions: (ctx) => {
                ctx.modelUpdate = ""
                ctx.update = undefined
                ctx.infiniteCount = {}
                
            }
        },
        GET_BRAND_ID: {
            target: 'getBrandById',
            actions: (ctx, event) => ctx.id = event.id
        },
        GET_PRODUCTS_BY_BRAND_ID: "getProducsByBrandId",
        GET_FAMILA_BY_ID: "getFamiliaByBrandId",
        GET_FAMILA_BY_TITLE: "getFamiliaByTitleId",
        GET_TEXT_QUERY: {
            target: "getByText",
        },
        GET_CATALOGO_BY_ID: {
            target: "getCatalogoById",
            actions: (ctx, event) => ctx.id = event.data
        },
        EMPTY: {
            actions: (ctx) => ctx.hitSearch = []
        },
        GET_PRODUCTS_BY_PARENT_ID: "getProductsByParentId",
        SEND_TO_MONDAY: "sendToMonday",
        GET_PRODUCT_BY_MODEL: {
            target: "getProductByModel",
            actions: (ctx, event) => ctx.modelUpdate = event.model,
            cond: (_, event) => event.model.length > 0
        },
        GET_PRODUCTS_BY_LABEL_ID:{
            target: "getProductsByLabelId"
        },
        GET_PRICE: {
            target: "getPrecio"
        },
        RESET: {
            target: 'idle',
            actions: (ctx) => {
                ctx.modelUpdate = ""
                ctx.update = undefined
                ctx.infiniteCount.message = {}
            }
        }
        
        

    }
})

// {
//     target: 'getByText',
//     cond: (_, event ) => {
        
//         return event.id.split("").length > 2
//     }
// },
// {
//     target: 'reject'
// },