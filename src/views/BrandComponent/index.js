import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

import { Helmet } from 'react-helmet'

import { useMachine } from '@xstate/react'
import { CatalogoXstate } from 'context/CatalogoXstate'

import CardBrandComponent from './CardBrandComponent'

import SkeletonCardProduct from 'components/skeletons/SkeletonCardProduct'
import TopButton from 'reusable/TopButton'
import utils from 'utils/utils'


const BrandComponent = ({  match }) => {

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

        return Object.entries(queryBrand).map(([key, val]) => {
            val.payload.map(({familia, img, label}) => {
                if(familia === name) return setSearchArray({ familia, img, label, key })
            })
        })
    }

    return (
        <>
        <Helmet
        meta={[
            {
                name: "keywords",
                content: queryBrand.map(({familia}) => JSON.stringify(familia))
            }
        ]}
         >
            
        </Helmet>

        {/* menu input search */}
        <div className="brand--menu--container" ref={containerRef}>
        <div>
            <h2>{`Productos de la Marca ${params.slug.toUpperCase()}`}</h2>
            <input 
                placeholder="Busca dentro de está sección" 
                list="familiaList"
                type="search"
                onChange={(e) =>  handleSearch({ name: e.target.value })}
            />
            <datalist id="familiaList">
            { Object.entries(queryBrand).map(([key, val]) => {
               return val.payload.map(({ familia }) => {
                    return (
                        <option key={key + familia }>
                            { familia }
                        </option>   
                    )
                })
            })}
            </datalist>
        </div>
        <hr />
            {
                state.matches("getProducsByBrandId") && <SkeletonCardProduct />
            }
            { state.matches("success") && searchArray.length === 0 && (
                Object.entries(queryBrand).map(([key, val]) => <CardBrandComponent key={key} val={val} /> )
            )}
            {/* este es en la parte del buscador */}
            { Object.values(searchArray).length > 0 && (
            <Link to={`/products/brand/label/${searchArray["label"]}/familia/${searchArray["familia"]}`} >
                <div key={searchArray["familia"]} className="brand--menu--card">
                    <img src={searchArray["img"]} alt={searchArray["familia"]}/>
                    <p>{searchArray["familia"]}</p>
                </div>
            </Link>
            )}
            {
                state.matches("success") && queryBrand.length === 0 && <span>Aún no tenemos productos disponibles</span>
            }
            <TopButton divRef={containerRef} />
        </div>
        </>
    )
}


export default BrandComponent