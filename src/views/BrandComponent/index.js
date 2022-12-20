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

const api = 'https://graphql-api-production.up.railway.app/api'
const GetAllCatalogs = `
query GetAllCatalogos {
    getAllCatalogos {
      _id
      name
      url
    }
  }
`

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

    
    const [catalogoAnchores, setCatalogoAnchores] = useState([])
    console.log("🚀 ~ file: index.js:55 ~ BrandComponent ~ catalogoAnchores", catalogoAnchores)
    const getAllCatatalogos = async () => {
        try {
            const slug = {
                "abb-catalogo": "abb",
                "onka-catalogo": "onka",
                "canalizacion-catalogo": "csm"
            }
            const data = await fetch(api, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ query: GetAllCatalogs })
            })
            .then(res => res.json())
            .then(res => {
                return res.data.getAllCatalogos.map((cat) => {
                    return { [slug[cat.name]]: cat.url }
                })
            })
            .then(res => {
                return res.reduce((acc, curr) => {
                    return { ...acc, ...curr }
                }, {})
            })
            console.log("🚀 ~ file: index.js:61 ~ getAllCatatalogos ~ data", data)
            setCatalogoAnchores({...data})
        } catch (error) {
            console.log("🚀 ~ file: index.js:61 ~ getAllCatatalogos ~ error", error)
        }
        // setCatalogoAnchores(getAllCatatalogos)        
    }

    useEffect(() => {
        getAllCatatalogos()
    }, [])
    
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