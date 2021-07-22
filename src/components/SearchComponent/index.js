import { useState } from 'react'
import { useParams } from 'react-router-dom'

import { useMachine } from '@xstate/react'
import { CatalogoXstate } from 'context/CatalogoXstate'

const SearchComponent = () => {

    const [state] = useMachine(CatalogoXstate)

    const { hitSearch } = state.context

    const { slug } = useParams()
    const [ keywordSearch, setKeywordSerach ] = useState(slug)
    const handleSearch = (e) => {
        setKeywordSerach(e)
    }

    return (
        <div className="search__hedaer__container">
            <h1 className="title">Estos son los resultados de tu busqueda</h1>               

            <section className="search">
            <div>
                
                <input 
                    type="search" 
                    id="search"
                    value={keywordSearch}
                    onChange={(e) => handleSearch(e.target.value)}
                    
                />                
            </div>
            </section>

            <section className="searchResults">
                {/*  aqui van todo los porductos de la busqueda */}
                {JSON.stringify(hitSearch)}
            </section>
        </div>
    )
}

export default SearchComponent