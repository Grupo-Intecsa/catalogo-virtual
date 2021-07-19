import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

import { useMachine } from '@xstate/react'
import { CatalogoXstate } from 'context/CatalogoXstate'

import SkeletonCardProduct from 'components/skeletons/SkeletonCardProduct'
import utils from 'utils/utils'

const BrandComponent = ({  match }) => {

    //:check TODO hacer un endpoit donde haga un join con labels de todos los productos que sean de la marca
    // 

    const { params } = match 
    const [ state, send ] = useMachine(CatalogoXstate)
    
    useEffect(() => {
        send("GET_PRODUCTS_BY_BRAND_ID", { brand_id: params.id })
    },[params])

    const containerRef = useRef()
    useEffect(() => {
        utils.scrollTotop(containerRef)
    },[])

    
    const { queryBrand } = state.context
    
    const [ searchArray, setSearchArray ] = useState([])

    useEffect(() => {
        setSearchArray([])
    },[params])
    
    const handleSearch = ({ name }) => {
        if(name.length === 0) setSearchArray([])
        return queryBrand.forEach(({ familia, img }) => {
            if(familia === name) return setSearchArray({ familia, img })
        })
    }

    return (
        <>
        {/* menu input search */}
        <div className="brand--menu--container" ref={containerRef}>
        <section>
            <h2>Productos de la Marca ABB</h2>
            <input 
                placeholder="Busca dentro de está sección" 
                list="familiaList"
                type="search"
                onChange={(e) =>  handleSearch({ name: e.target.value })}
            />
            <datalist id="familiaList">
            { Object.values(queryBrand).map(({familia}, index) => {
                return (
                    <option key={index}>
                        { familia }
                    </option>
                )
            })}
            </datalist>
        </section>
        <hr />
            {
                state.matches("getProducsByBrandId") && <SkeletonCardProduct />
            }
            { state.matches("success") && searchArray.length === 0 && (
                queryBrand.map(({familia, img, label}, index) => {
                    // familia => nombre string
                    // label => id de mongo
                    return(
                        <Link key={index} to={`/products/brand/label/${label}/familia/${familia}`} >
                        <div className="brand--menu--card">
                            <img src={img} alt={familia}/>
                            <p>{familia}</p>
                        </div>
                        </Link>
                    )
                })
            )}
            { Object.values(searchArray).length > 0 && (
                <div key={searchArray["familia"]} className="brand--menu--card">
                    <img src={searchArray["img"]} alt={searchArray["familia"]}/>
                    <p>{searchArray["familia"]}</p>
                </div>
            )}
            {
                state.matches("success") && queryBrand.length === 0 && <span>Aún no tenemos productos disponibles</span>
            }
        </div>
        </>
    )
}


export default BrandComponent