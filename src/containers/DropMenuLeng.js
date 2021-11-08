import { useContext, useEffect } from 'react'
import { AppContext } from 'context/AppContext'

const DropMenuLeng = () => {

  const { lenguage, changeLenguage } = useContext(AppContext)	
  
  useEffect(() => {    
    const lang = localStorage.getItem('lang')
    if (lang) {
      changeLenguage(lang)
    }
  }, [lenguage])


  return (
    <>
      <select onChange={(e) => changeLenguage(e.target.value) } className="switch__lenguage" defaultValue={lenguage}>
        <option value="es">Español</option>
        <option value="en">English</option>
      </select>
    </>
  )
}

export default DropMenuLeng
