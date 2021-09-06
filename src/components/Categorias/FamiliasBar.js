import { useMemo, useContext } from 'react'

import { AppContext } from 'context/AppContext'
import ButtonOption from "reusable/ButtonOption"
import utils from 'utils/utils'

const FamiliasBar = ({ payload, slug }) => {

  const { setFamBarItemSelected } = useContext(AppContext)

  const familia = payload.filter(item => item.familia === slug )
  
    let capacidades = useMemo(() => {

      
      let valores = familia.map(({ capacidad }) => capacidad )
      if (valores[0].mm) {

        const capacidad = valores
        .reduce(( array, item ) => array.includes(item.mm) ? array : [ ...array, item.mm ], [])
        .sort(utils.orderArray)
      
        let unidad = Object.keys(valores[0]).map(item => item)[0]
        return { capacidad, unidad }

      }else if (valores[0].amps) {
        const capacidad = valores
        .reduce(( array, item ) => array.includes(item.amps) ? array : [ ...array, item.amps ], [])
        .sort(utils.orderArray)
  
        let unidad = Object.keys(valores[0]).map(item => item)[0]
        return { capacidad, unidad }
      }

    },[])

    const handleResetAll = () =>  {
      let selectedButtons = document.querySelectorAll(".button--capacidad--selected")
      selectedButtons.forEach(nodo => nodo.classList.replace("button--capacidad--selected", "button--capacidad"))
      
      setFamBarItemSelected([])
    }

  return(
    <div className="familias-grid-container">
      <section>
        <button className="btn--reset--cap" onClick={handleResetAll}>Mostar todos</button>
        {
          capacidades.capacidad.map((item, index) => 
              <ButtonOption key={index}>{ `${item} ${capacidades.unidad}` }</ButtonOption>    
            )
        }
      </section>
    </div>
  )
}

export default FamiliasBar
