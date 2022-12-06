import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

import { Helmet } from 'react-helmet'

import { useMachine } from '@xstate/react'
import { CatalogoXstate } from 'context/CatalogoXstate'

import CardBrandComponent from './CardBrandComponent'
import BuscadorMini from 'reusable/BuscadorMini'

import SkeletonCardProduct from 'components/skeletons/SkeletonCardProduct'
import TopButton from 'reusable/TopButton'
import utils from 'utils/utils'

import downloadButton from 'assets/icons/download.png'


const catalogoAnchores = {
    "onka": 'https://firebasestorage.googleapis.com/v0/b/itacatalgo.appspot.com/o/ONKA%20CATALOGO.pdf?alt=media&token=06136a91-b618-4b41-b802-e9f7340c818b',
    "abb": "https://firebasestorage.googleapis.com/v0/b/itacatalgo.appspot.com/o/cat_abb.pdf?alt=media&token=6be8bef9-12b9-4fa3-b5e5-879caaffca86",
    "csm": "https://firebasestorage.googleapis.com/v0/b/itacatalgo.appspot.com/o/catalogos%2FCATALOGO_CSM_20221201.pdf?alt=media&token=aecc738d-dd77-4134-9626-4618b9252c96"
}


const BrandComponent = ({  match }) => {

    const { params } = match 
    console.log("🚀 ~ file: index.js ~ line 29 ~ BrandComponent ~ params", params)
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

    console.log({ queryBrand })

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

    const handlderDownloadCat = () => {
        const url = catalogoAnchores[params.slug]
        window.open(url, '_blank')
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
            <BuscadorMini dataSet={queryBrand} >
                <input 
                    placeholder="Busca dentro de está sección" 
                    list="familiaList"
                    type="search"
                    onChange={(e) =>  handleSearch({ name: e.target.value })}
                />
            </BuscadorMini>
        </div>
       {params.slug !== 'ita' && (
            <div className="catalogo-divider">
                <div role="button" onClick={() => handlderDownloadCat()}>
                    <img src={downloadButton} alt="download" />
                    <a>Descarga nuestro catálogo</a>
                </div>
            </div>
        )}
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