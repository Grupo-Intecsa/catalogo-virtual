import { useContext, createContext } from 'react'
import { useMachine } from '@xstate/react'
import { Machine, assign } from 'xstate'


const TiendaContext = createContext()
const TiendaDispatch = createContext()

const addCarritoItems = async(ctx) => {
  const { item, carrito } = ctx  

  let updateData = { ...carrito, item  }

  localStorage.setItem("localCarrito", JSON.stringify(carrito.concat(updateData)))
  
  return await carrito.concat(updateData)

}

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

  },
  states: {
    iddle: {},
    addCarritoItems: {
      invoke: {
        src: addCarritoItems,
        onDone: {
          target: "success",
          actions: assign({
            carrito: (ctx, event) => event.data
          })
          
        },
        onError: {
          target: 'error'
        }
        
      }
    },
    hydrateData: {
      invoke: {
        src: hydrateData,
        onDone: {
          target: "success",
          actions: assign({
            carrito: (ctx, event) => event.data
          })
        },
        onError: {
          target: "error"
        }
      }
    },
    removeCarritoItems: {

    },
    
    success: {},
    error: {},
    rejected: {}

  },
  on: {
    ADD_ITEM: [
    {
      target: "addCarritoItems",
      actions: (ctx, event) => {
        ctx.item = event.payload
      },
      cond: (ctx, event) => {
        return Object.values(ctx.carrito).map(({ item }) => item._id).includes(event.id) === false
      },
    },
      { target: 'rejected'}
    ],
    REMOVE_ITEM: {
      target: "removeCarritoItems"
    },
    HYDRATE: {
      target: "hydrateData"
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