// filtro para familias y capacidades
import { useParams } from 'react-router-dom'
import { useCallback, useEffect, useState } from 'react'


const CheckboxButton = ({ children }, valoresSelected ) => {

    const [ check, setCheck ] = useState(false)
    const { slug } = useParams()

    useEffect(() => {
        setCheck(false)
    },[slug])
    
    const isCheck = (e) => {

        const setvalor = e.target.value
        const isSelected = () => valoresSelected.filter(item => item === setvalor ).length

        if( Array.isArray(valoresSelected) && valoresSelected.includes(setvalor)){
            setCheck(true)
        }else if( isSelected > 1 ){
            setCheck(false)
        }
    }

    return(
        <label>
        <input 
            type="checkbox" 
            value={check} 
            onChange={(e) => isCheck(e)}            
            />
        { children }
        </label>
    )
}

const FilterProducts = ({ payload, send } = {}) => {

    const { familias, filtros, currentSelected } = payload
    const { sufijo } = filtros
    // TODO falta valores

    const recolector = useCallback((option) => {
        send("FILTER", { option })
    },[])


    return (
        <div className="filtros__App">
            <section>
                <div className="filtros__App__header">
                    <div>
                        <p>Familias</p>
                        { currentSelected }
                        <hr></hr>
                    </div>
                    <div>
                        {   
                            Array.isArray(familias) && familias.length > 0 &&
                            Object.values(familias).map((familia, index )=> {
                                return (
                                    <span key={index} onChange={() => recolector({ familia })}>
                                        <CheckboxButton valoresSelected={currentSelected} >
                                            { familia }
                                        </CheckboxButton>
                                    </span>
                                )
                            })
                        }
                    </div>
                </div>

                <hr></hr>

                <div className="filtros__App__header">
                    <div>
                        <span>
                            {
                                Array.isArray(familias) && familias.length > 0 &&
                                sufijo.map((sufijo, index) => <p key={index} >{sufijo.toUpperCase()}</p> )
                            }
                        </span>
                        <hr></hr>
                    </div>
                    <div>
                        {/* {
                            Array.isArray(familias) && familias.length > 0 &&
                            valores
                            .sort((a, b) => +a - +b)
                            .map((val, index) => {
                                return(
                                    <label key={index}>
                                        <input 
                                            type="checkbox" 
                                            value={val} 
                                            onChange={() => recolector({ val })}
                                            />
                                        {val}
                                    </label>
                                )
                            } )
                        } */}
                    </div>
                </div>
                
                
            </section>
        </div>
    )
}

export default FilterProducts