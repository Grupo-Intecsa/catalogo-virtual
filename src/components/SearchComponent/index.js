import { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'

import { useMachine } from '@xstate/react'
import { CatalogoXstate } from 'context/CatalogoXstate'
import SkeletonCardProduct from 'components/skeletons/SkeletonCardProduct'

import utils from 'utils/utils'
import SlimCard from 'components/Product/SlimCard'

// debe tener un filto de familias

const SearchComponent = () => {

    const [ dataSearch, setDataSearch ] = useState([])
    const [ page, setPage ] = useState(1)
    const [ limit ] = useState(10)

    const [state, send ] = useMachine(CatalogoXstate)
    const { hitSearch } = state.context

    const { slug } = useParams()
    const [ keywordSearch, setKeywordSerach ] = useState(slug)

    useEffect(() => {
        setDataSearch([])
    },[slug])

    // primera carga
    useEffect(() => {
        send("GET_TEXT_QUERY", { id: slug, page, limit })
    },[slug, keywordSearch, send])


    const handleSearch = (e) => {
        // controlamos la busqueda
        setKeywordSerach(e.target.value || slug )

        // cambiamos la pagina
        setPage(page => page + 1 )

        // generamos la consulta
        send("GET_TEXT_QUERY", { id: keywordSearch || slug , page, limit })
    }

    useEffect(() => {
        if(hitSearch.length > 0){
            return setDataSearch((data) => [...data, hitSearch])
        }
    },[hitSearch])

    const divTopRef = useRef()
    
    return (
        <div className="search__hedaer__container" ref={divTopRef}>
            <h1 className="title">Estos son los resultados de tu busqueda { slug }</h1>               


            <section className="searchResults">
                {/*  aqui van todo los porductos de la busqueda */}
                {
                    state.matches("getByText") && <SkeletonCardProduct />
                }
                {
                  dataSearch.length > 0 && dataSearch.map((prod) => {
                      return Object
                        .entries(prod)
                        .slice(0, prod.length -1 )
                        .map(([key, val]) =>  {
                           return <SlimCard key={key} data={val}/>
                       })
                    })
                }
            </section>
            <section>
                <button className="onTopButton" onClick={() => utils.scrollTotop(divTopRef)}></button>
                <button className="moreDataButton" onClick={handleSearch}>Cargar más datos</button>
            </section>
        </div>
    )
}

export default SearchComponent