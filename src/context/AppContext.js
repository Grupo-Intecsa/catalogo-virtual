import { createContext, useState, useEffect, useContext } from 'react'
import CatalogoController from './controllers/CatalogoController'

import logoABB from 'assets/icons/abb_ico.png'


export const AppContext = createContext()
export const AppDispatch = createContext()



const logoMap = [
  {
    id: "6034cb26e2d7b850a03fd393",
    logo: logoABB
  },
  
]

const logoSelector = (id) => {

  const logo = logoMap.find(item => item.id === id )

  return(
    logo ? <img src={logo.logo} alt="logo de empresa" style={{ height: "auto", width: "50px" }} /> : "No brand"
  ) 

}

const linkName = (title) => title.replace(/[^a-zA-Z 0-9]+/g,'').trim().split(" ").join("-").toLowerCase()


const MlPrice = ({ ml }) => {

  const [ loading, setLoading ] = useState(false)
  
  const [mlPrecio, setMlPrecio] = useState(undefined)
  async function getData(){
    await CatalogoController.getPrice({ ml })
    .then(res => setMlPrecio(res))
    .finally(() => setLoading(true))
  }
  
  useEffect(() => {
    getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[ml])
  
  
  return(
    loading ? <span>{`MXN$ ${mlPrecio}`}</span> : <span>Cargando...</span>
  )
}

  // verifica el estado de ML
  const mlVerify = ( item ) => {
    // verificamos si es un array y esta vacio
    if(Array.isArray(item)){
        if(item.length === 0){
            return false
        }
    //       verificamos si es null
    }else if(item === null){
        return false
    //       Verificamos si es un objeto y esta vacio      
    }else if(Object.values(item).length === 0){
        return false
    //       Verificamos si e el item es un string llamado null
    }else if( item === "null"){
        return false
    // si todo esta bien regresamos el objeto      
    }else {
        return true
    }
  }

  const monyIntlRef = (precio) => {
    const number = new Intl.NumberFormat('en-MX', { style:"currency", currency: "MXN"}).format(precio)
    return number
}

const AppContextProvider = (props) => {

  return(
    <AppContext.Provider value={{
      mlVerify, monyIntlRef, MlPrice, logoSelector, linkName
    }}>
      { props.children }
    </AppContext.Provider>
  )

}

const dataContext = {
  mlVerify, monyIntlRef, MlPrice, logoSelector, linkName 
}

export const HookReactContext = ({ children }) => {
  const [ state, dispatch ] = useState(dataContext)

  return(
    <AppContext.Provider value={state}>
      <AppDispatch.Provider value={dispatch}>
          { children }
      </AppDispatch.Provider>
    </AppContext.Provider>
  )
}

export default AppContextProvider

export const useAppContextState = () => useContext(AppContext)
export const useAppContextDispatch = () => useContext(AppDispatch)