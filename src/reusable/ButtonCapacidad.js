import React, { useState } from 'react'



const ButtonMultipleOption = ({ children }) => {

  const [ selected, setSelected ] = useState(false)
  const handleCapacidad = () => setSelected(!selected)

  return <button 
    className={ selected ? "medidas--items" : "button--capacidad" }
    onClick={handleCapacidad}
    >
      { children }
    </button>

}

export default ButtonMultipleOption