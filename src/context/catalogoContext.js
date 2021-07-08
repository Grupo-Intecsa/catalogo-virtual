import React, { createContext, useContext } from 'react'

import { useMachine } from '@xstate/react'
import { assign, Machine } from 'xstate'

import CatalogoController from './controllers/CatalogoController'

const CatalogoContext = createContext();
const CatalogoDispatch = createContext();


export const CatalogoMachine = Machine({
    id: "Catalogo",
    type: 'parallel',
    initial: "init",
    context: {
        labels: [],
        brands: [],
    },
    states: {
        init: {},
        labels: {
            invoke: {
                id: "get_labels",
                src: CatalogoController.getLables,
                onDone: {
                    target: 'success',
                    actions: assign({
                        labels: (_, evt) => evt.data
                    })
                },
                onError: {
                    target: 'error'
                }
            }
        },
        brands: {
            invoke: {
                id: "get_brands",
                src: CatalogoController.getBrands,
                onDone: {
                    target: 'success',
                    actions: assign({
                        brands: (ctx, evt) => evt.data
                    })
                },
                onError: {
                    target: 'error'
                }
            }
        },
        success: {},
        error: {}

    },
    on: {
        GET_LABELS: {
            target: "labels"
        },
        GET_BRANDS: {
            target: "brands"
        },
        GET_MENU: {
            target: [ '.labels' ]
            // target: ['.brands', '.labels']
        }
    }

})


export const CatalogoProvider = ({ children }) => {
    const [ state, dispatch ] = useMachine(CatalogoMachine)

    return(
        <CatalogoContext.Provider value={state}>
            <CatalogoDispatch.Provider value={dispatch}>
                { children }
            </CatalogoDispatch.Provider>
        </CatalogoContext.Provider>
    )
}

export const useCatalogoState = () => useContext(CatalogoContext)
export const useCatalogoDispatch = () => useContext(CatalogoDispatch)