import React, { createContext, useContext } from 'react'
import { useMachine } from '@xstate/react'
import { Machine, assign } from 'xstate'

import CatalogoController from './controllers/CatalogoController'

export const UserStateContext = createContext()
export const UserDispatchContext = createContext()

const verifiToken = (ctx) => {

  const token = localStorage.getItem('tokenUserSite')

    if(!token) return ctx.token = undefined

    return ctx.token = token
}

const UserContextMachine = Machine({
  id: 'userState',
  initial: 'initial',
  context: {
    user: undefined,
    error: undefined,
    token: undefined
  },
  states: {
    initial: {},
    login: {
      invoke: {
        id: 'login',
        src: CatalogoController.login,
        onDone: {
          target: 'auth'
        },
        onError: {
          actions: assign({
            error: (contex, event) => event.data
          }),
          target: 'error'
        }        
      }
    },
    auth: { 
      always: [
        { 
          target: 'validate', 
          actions: 'verifiToken',
          cond: (ctx) => ctx?.token !== null,
        },
        {
          target: 'error'
        }
      ]
    },
    validate: {
      invoke: {
        src: CatalogoController.auth,
        onDone: {
          target: 'success',
          actions: assign({
            user: (ctx, event) => event.data
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

    error: {},
    success: {},
    logout: {
      invoke: {
        src: async() => {
          return localStorage.removeItem('tokenUserSite')

        },
        onDone: {
          target: 'initial'
        }
      }
    }

  },
  on: {

    VALIDATE: [
      {
        target: 'validate',
        cond: (ctx) => ctx.user === undefined
      },
      {
        target: 'auth'
      }
    ],

    LOGIN: 'login',
    LOGOUT: 'logout'
  }
},
{
  actions: {
    verifiToken: verifiToken
  }
}
)

export const UserContextProvider = ({ children }) => {
  const [ state, dispatch, service ] = useMachine(UserContextMachine)

  return(
    <UserStateContext.Provider value={{ state, service }}>
      <UserDispatchContext.Provider value={dispatch}>
        { children }
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  )
}

export const UserState = () => useContext(UserStateContext)
export const UserDispatch = () => useContext(UserDispatchContext)