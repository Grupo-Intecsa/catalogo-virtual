import { createContext, useState, useEffect, useCallback } from 'react'
import CatalogoController from './controllers/CatalogoController'
import utils from 'utils/utils'

import logoABB from 'assets/icons/abb_ico.png'
import logoITA from 'assets/icons/ita_ico.png'
import logoCSM from 'assets/icons/csm_ico.png'

export const AppContext = createContext()

const logoMap = [
  {
    id: "60dcce9fb22f37097c58161c",
    logo: logoITA
  },
  {
    id: "60dcceaab22f37097c58161e",
    logo: logoABB
  },
  {
    id: "6143b3c4fb10c4b5ed4faadb",
    logo: logoCSM
  }
  
]

const logoSelector = (id) => {
  const logo = logoMap.find(item => item.id === id )
  return(
    logo ? <img key={id} src={logo.logo} alt="logo de empresa" style={{ height: "auto", width: "50px"}} className="logo__selector__mini" /> : <small style={{ color: 'white'}}>Logo no disponible</small>
  ) 
}

const linkName = (title) => title.replace(/[^a-zA-Z 0-9]+/g,'').trim().split(" ").join("-").toLowerCase()

// precio de mercado libre
const GetPriceIdMl = ({ ml }) => {
  const [ loading, setLoading ] = useState(false)
  const [ mlPrecio, setMlPrecio ] = useState(undefined)
  const [ error, setError ] = useState(false)
    
  async function getData(){
    await CatalogoController.getPrice({ ml })
    .then(res => {
      let numberRes = +res
      //  si la respuesta es un string por la coma
      if(Number.isNaN(numberRes)){
        let number = res.split(",").reverse()
        let suma = number.reduce((total, val) => val + total )
        return setMlPrecio(suma)

      }else if(!Number.isNaN(numberRes)){
        return setMlPrecio(numberRes)
      }

    })
    .catch((err) => err && setError(true) )
    .finally(() => setLoading(true))
  }
  
  useEffect(() => {
    if(ml){
      getData()

    }else if(!ml){
      setMlPrecio(null)
      setLoading(true)
    }
  },[ml])

  return { loading, mlPrecio: mlPrecio, mlError: error }
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
    const number = new Intl.NumberFormat('es-MX', { style:"currency", currency: "MXN"}).format(precio)
    return number
  }

  const dateIntlRef = (date) => {
    const styleDate = new Intl.DateTimeFormat('es-MX', { dateStyle: 'medium' }).format(new Date(date))
    return styleDate
  }

  
  const AppContextProvider = (props) => {
    
    const [ migas, setMigas ] = useState([])
    const [ famBarItemSelected, setFamBarItemSelected ] = useState([])

    const resetNotify = useCallback(() => {
        setTimeout(() => {
          setOpenNotify(true)
        }, 4000);
    })

      // evento de nortificacion
      const [ openNotify, setOpenNotify ] = useState(true)
      const handleNotifyCart = ({ ref } = {}) => {
        resetNotify()
        setOpenNotify(false)
        return utils.scrollTotop(ref)
      }
    

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
        handleNotifyCart,
        openNotify,
        dateIntlRef
    }}>
      { props.children }
    </AppContext.Provider>
  )

}

export default AppContextProvider
