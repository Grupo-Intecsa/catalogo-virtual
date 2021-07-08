import { useContext, createContext } from 'react'
import CatalogoController from './controllers/CatalogoController'
import { useMachine } from '@xstate/react'
import { Machine, assign } from 'xstate'

const TiendaContext = createContext()
const TiendaDispatch = createContext()

const hydrateData = async(ctx, event) => {
    return await event.payload
}


export const TiendaMachine = Machine({
  id: "Tienda",
  initial: "iddle",
  context: {
    hidden: false,
    item: {},
    carrito: [],
    pdfData: [],

  },
  states: {
    iddle: {},
    addCarritoItems: {
      entry: (ctx) => {
        const { carrito, item } = ctx
        localStorage.setItem("localCarrito", JSON.stringify(carrito.concat(item)))
        carrito.push(item)    
      },
      activities: ['reset']
      
    },
    hydrateData: {
      invoke: {
        src: hydrateData,
        onDone: {
          target: "success",
          actions: assign({
            carrito: (_, event) => event.data
          })
        },
        onError: {
          target: "error"
        }
      }
    },
    removeCarritoItems: {
      entry: (ctx, event) => {
        
        const { carrito } = ctx
        const { id } = event

        const getIndex = (id) => {
          let valueIndex
          
          carrito.map((item, index) => {
            if( item._id === id ){
              valueIndex = index
            }
            return valueIndex
          })
          carrito.splice(valueIndex, 1)
          localStorage.setItem("localCarrito", JSON.stringify(carrito))
        }

        getIndex(id)
        
      }

    },
    emptyCart: {
      entry: (ctx => {
        const { carrito } = ctx
        carrito.splice(0, carrito.length)
        localStorage.setItem("localCarrito", JSON.stringify(carrito))
      })
    },
    invoiceCreate: {
      invoke: {
        id: "pdfCreate",
        src: CatalogoController.invoiceCreate,
        onDone: {
          target: "pdfCreate",
          actions: assign({
            pdfFolio: (ctx, event) =>  event.data
          })
        },
        onError: {
          target: "error"
        }

      }
    },
    getDataToInvoice: {
      invoke: {
        id: "getDataToInvoice",
        src: CatalogoController.getDataToInvoice,
        onDone: {
          target: "pdfDataDone",
          actions: assign({
            pdfData: (ctx, event) => event.data
          })
        },
        onError: {
          target: "error"
        }
      }
    },
    pdfDataDone: {},
    pdfCreate: {},
    success: {},
    error: {},
    rejected: {
      onEntry: 'reset'
    }

  },
  on: {
    ADD_ITEM: [

    {
      target: "addCarritoItems",
      actions: (ctx, event) => {
        ctx.item = event.data
        
      },
      cond: (ctx, event) => {
        ctx.item = event.data
        return Object.values(ctx.carrito).map(( item ) => item._id).includes(event.id) === false
      },
    },
      { target: 'rejected'}
    ],
    REMOVE_ITEM: {
      target: "removeCarritoItems"
    },
    HYDRATE: {
      target: "hydrateData"
    },
    EMPTY_CART: {
      target: "emptyCart"
    },
    RESET: {
      activities: ['reset']
    },
    INVOICE_CREATE: {
      target: "invoiceCreate"
    },
    GET_DATA_TO_INVOICE: {
      target: "getDataToInvoice"
    }

  },
  activities: {

      reset: () => {
        
        const interval = setInterval(() => console.log("demanda"), 1000);
        return () => clearInterval(interval)
      }
    
  }
  
})



export const TiendaProvider = ({ children }) => {
  const [ state, dispatch ] = useMachine(TiendaMachine)

  return(
    <TiendaContext.Provider value={state}>
      <TiendaDispatch.Provider value={dispatch}>
        { children }
      </TiendaDispatch.Provider>
    </TiendaContext.Provider>
  )
}

export const useTiendaState = () => useContext(TiendaContext)
export const useTiendaDispatch = () => useContext(TiendaDispatch)