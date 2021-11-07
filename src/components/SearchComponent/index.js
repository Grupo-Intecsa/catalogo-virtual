import { useEffect, useState, useRef  } from 'react'
import { useParams } from 'react-router-dom'

import { useMachine } from '@xstate/react'
import { SearchContext } from 'context/SearchContext'
import SkeletonCardProduct from 'components/skeletons/SkeletonCardProduct'

import SlimCard from 'components/Product/SlimCard'
import FilterProducts from 'utils/FilterProducts'
import TopButton from 'reusable/TopButton'
import utils from 'utils/utils'

import { Pagination } from 'antd';
// debe tener un filto de familias

const SearchComponent = () => {

    const [ state, send ] = useMachine(SearchContext)
    const { hitSearch } = state.context
    const { slug } = useParams()
    
    useEffect(() => {
        send("GET_TEXT_QUERY", { id: slug })
        cleanUp()
        return ()  => cleanUp()

    },[slug, send])
        
    const [ pagInicio, setPagInicio ] = useState(0)
    const [ pagFinal, setPagFinal ] = useState(12)

    const handlePaginator = (page, size) => {
        setPagInicio( size * ( page - 1 ) )
        setPagFinal( size * page )
    }

    // funcion para borrar
    const cleanUp = () => {
        setPagInicio(0)
        setPagFinal(12)
    }

    useEffect(() => {
        utils.scrollTotop(divTopRef)
    },[slug, pagInicio])

    const hitSearchControl = hitSearch.length
    useEffect(() => {
        setPagInicio(0)
        setPagFinal(12)
    },[hitSearchControl])

        
    const divTopRef = useRef()    
    return (
        <div className="search__header__container" ref={divTopRef}>
            <h1 className="title">Estos son los resultados de tu busqueda: { slug }</h1>  


        <div className="search__header">
            
            <section className="search__filter">
                <FilterProducts payload={state.context} send={send} state={state} />
            </section>             

            <div>
                <section className="searchResults">

                    {/*  aqui van todo los porductos de la busqueda */}
                    {
                        state.matches("getTextQuery") || state.matches("moreData") && <SkeletonCardProduct />
                    }
                    {
                        hitSearch.length > 0 && hitSearch.slice(pagInicio, pagFinal).map((prod, index) => <SlimCard key={index} data={prod} />)
                    }
                </section>
                <section className="search__footer">
                    <TopButton divRef={divTopRef} />
                    <Pagination 
                    defaultCurrent={1} 
                    total={hitSearch.length} 
                    pageSize={12}
                    onChange={(page, size) => handlePaginator(page, size)} 
                />
                </section>
            </div>

        </div>
        </div>
    
    )
}

export default SearchComponent