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
    openNotify: true 

  },

  states: {
    iddle: {},
    addCarritoItems: {
      entry: (ctx) => {
        const { carrito, item } = ctx
        localStorage.setItem("localCarrito", JSON.stringify(carrito.concat(item)))
        carrito.push(item)    
      },
      after:{
        2000: { target: 'closeNotify'}
      }      
    },
    closeNotify: {
      entry: ( ctx ) => {
        ctx.openNotify = true
      }

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
        let indexVal = carrito.findIndex(({ _id }) => _id === event.id )
        carrito.splice(indexVal, 1)
        localStorage.setItem("localCarrito", JSON.stringify(carrito))

      }

    },
    changeCantidad: {
      entry: (ctx, event ) => {

        const { carrito } = ctx
        const productIndexId = carrito.findIndex(({ _id }) => _id === event.id  )
        carrito[productIndexId].cantidad = event.cantidad
        localStorage.setItem("localCarrito", JSON.stringify(carrito))
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
      after:{
        3000: { target: "iddle"}
      }
    }

  },
  on: {
    ADD_ITEM: [
    {
      target: "addCarritoItems",
      actions: (ctx, event) => {
        ctx.item = event.data
        ctx.openNotify = false

        window.scrollTo({
          top: event.ref?.current.offsetTop,
          behavior: "smooth"
        })


      },
      cond: (ctx, event) => {
        let carritoObjects = Object.values(ctx.carrito).map(( item ) => item._id)
        return !carritoObjects.includes(event.data._id)
      },
    },
      { target: 'rejected'}
    ],
    REMOVE_ITEM: {
      target: "removeCarritoItems"
    },
    CHANGE_CANTIDAD: {
      target: "changeCantidad"
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