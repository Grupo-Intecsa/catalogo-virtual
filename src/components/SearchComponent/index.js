import { useEffect, useState, useRef  } from 'react'
import { useParams } from 'react-router-dom'

import { useMachine } from '@xstate/react'
import { SearchContext } from 'context/SearchContext'
import SkeletonCardProduct from 'components/skeletons/SkeletonCardProduct'

import SlimCard from 'components/Product/SlimCard'
import TopButton from 'reusable/TopButton'
// debe tener un filto de familias

const SearchComponent = () => {

    const [ page, setPage ] = useState(0)
    const [ state, send ] = useMachine(SearchContext)
    const { hitSearch, pagesOf } = state.context

    const { slug } = useParams()
    const [ keywordSearch, setKeywordSerach ] = useState(slug)

    useEffect(() => {
        send("GET_TEXT_QUERY", { id: slug, page, limit: 10 })
        setPage(10)
        cleanUp()

        return ()  => cleanUp()

    },[slug, keywordSearch, send])
    
    // funcion para borrar
    const butonCargaTextRef = useRef()
    const cleanUp = () => {
        setPage(0)
        if(butonCargaTextRef.current){
            let text = butonCargaTextRef.current
            text.innerHTML = "Cargar más datos"
        }
    }

    const handleSearch = (e) => {
        // total del productos en el array 
        const arrayTotalProducts = hitSearch.length
        // controlamos la busqueda
        setKeywordSerach(e.target.value || slug )
        // data search siempre va a tener multiplos de 10
        if( pagesOf > arrayTotalProducts ){
            setPage(page => page + 10 )
            send("MORE_DATA", { id: keywordSearch || slug , skip: page, limit: 10 })

        }else if(pagesOf <= arrayTotalProducts ){
            butonCargaTextRef.current.innerHTML = "No hay más productos"
        }
    }


    const divTopRef = useRef()    
    return (
        <div className="search__hedaer__container" ref={divTopRef}>
            <h1 className="title">Estos son los resultados de tu busqueda { slug }</h1>               

            <section className="searchResults">
                {/*  aqui van todo los porductos de la busqueda */}
                {
                    state.matches("getByText") || state.matches("moreData") && <SkeletonCardProduct />
                }
                {
                    hitSearch.length > 0 && hitSearch.map((prod, index) => <SlimCard key={index} data={prod} />)
                }
            </section>
            <section>
                <TopButton divRef={divTopRef} />
                <span className="moreDataButton" ref={butonCargaTextRef} onClick={handleSearch}>Cargar más datos</span>
            </section>
        </div>
    )
}

export default SearchComponent