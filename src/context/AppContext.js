import { createContext, useState, useEffect } from 'react'
import CatalogoController from './controllers/CatalogoController'

import logoABB from 'assets/icons/abb_ico.png'
import logoITA from 'assets/icons/ita_ico.png'

export const AppContext = createContext()

const logoMap = [
  {
    id: "60dcce9fb22f37097c58161c",
    logo: logoITA
  },
  {
    id: "60dcceaab22f37097c58161e",
    logo: logoABB
  }
  
]

const logoSelector = (id) => {
  const logo = logoMap.find(item => item.id === id )
  return(
    logo ? <img src={logo.logo} alt="logo de empresa" style={{ height: "auto", width: "50px" }} /> : <small style={{ color: 'white'}}>Logo no disponible</small>
  ) 
}

const linkName = (title) => title.replace(/[^a-zA-Z 0-9]+/g,'').trim().split(" ").join("-").toLowerCase()

const GetPriceIdMl = ({ ml }) => {

  const [ loading, setLoading ] = useState(false)
  const [ mlPrecio, setMlPrecio ] = useState(undefined)
  const [ precioOnNumber, setPrecioOnNumber ] = useState(0)
  
  async function getData(){
    await CatalogoController.getPrice({ ml })
    .then(res => setMlPrecio(res))
    .finally(() => setLoading(true))
  }
  
  useEffect(() => {
    getData()
  },[ml])

  useEffect(() => { 
    if(ml === null){
      setMlPrecio(0)

    }else if( loading && Number.isNaN(+mlPrecio)){
      let number = mlPrecio.split(",")                
      let suma = number[0] + number[1]
      Number.isNaN(+suma) ? 0 : setPrecioOnNumber(+suma)
    }

  },[loading, mlPrecio])

    
  return { loading, mlPrecio: precioOnNumber, precioText: mlPrecio }
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

  const contactRequired = () => {
    const urlFrom = "https://forms.monday.com/forms/embed/608067760034e1ac1f86e10392668e8b?r=use1"
    const urlWhatsapp = "https://api.whatsapp.com/send/?phone=5215546371510&text=Me%20gustaria%20tener%20informaci%C3%B3n"

    return { form: urlFrom, whatsapp: urlWhatsapp }

  }

  const monyIntlRef = (precio) => {
    const number = new Intl.NumberFormat('en-MX', { style:"currency", currency: "MXN"}).format(precio)
    return number
  }
  
  const AppContextProvider = (props) => {
  
  const [ migas, setMigas ] = useState([])
  const [ famBarItemSelected, setFamBarItemSelected ] = useState([])

  return(
    <AppContext.Provider value={{
        mlVerify, 
        contactRequired,
        monyIntlRef, 
        GetPriceIdMl, 
        logoSelector, 
        linkName, 
        famBarItemSelected, 
        setFamBarItemSelected,
        migas, 
        setMigas,
    }}>
      { props.children }
    </AppContext.Provider>
  )

}

export default AppContextProvider
