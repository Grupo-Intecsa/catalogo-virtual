import React, { useState, useEffect, useRef, useContext } from  "react"

import { useMachine } from '@xstate/react'
import { CatalogoXstate } from 'context/CatalogoXstate'
import { AppContext } from 'context/AppContext'

import debounce from 'just-debounce-it'
import { Link } from 'react-router-dom'

const SearchEngine = () => {

    const { linkName } = useContext(AppContext)
    const [ state, send ] = useMachine(CatalogoXstate)
    const [ keywordSearch, setKeywordSearch ] = useState(undefined)
    const [ open, setOpen ] = useState(true)
    
    const resultsRef = useRef()
    let { hitSearch } = state.context

    const handleClose = () => {
        send("EMPTY")
        setOpen(true)
        return document.getElementById("search").value = ""
    }
    
    const onChangeHanldeSearch = debounce((e) => {
        if(e.target.value === ""){
            handleClose()

        }else if(e.target.value.length >= 3 ){
            setKeywordSearch(e.target.value)
            send("GET_TEXT_QUERY", { id: e.target.value, page: 1 })
            setOpen(false)
        }
    },300)

    // cerrar cuando no hay texto
    useEffect(() => {
        let value = resultsRef.current?.value
        if(value && value.length === 0){
            handleClose()
        }

    },[resultsRef])

    // cerrar cuando se quita el mouse del div
    const balckDropMenu = useRef()
    useEffect(() => {
        balckDropMenu.current && balckDropMenu.current.addEventListener("click", function(){
            handleClose()
        })
    })

    // abrir ultima busqueda
    useEffect(() => {
        let mounted = true

        let input = document.getElementById("search")
        input.addEventListener("click", function(){
            if(hitSearch.length > 0 && mounted ) setOpen(false)
        })
        return function cleanUp(){
            mounted = false
        }
    })

    return(
        <div className="engine--shearch">
        <div id="modal--backDrop">   
            <input 
                type="search" 
                autoComplete="off"
                placeholder="Buscar..." 
                onChange={onChangeHanldeSearch} 
                id="search" 
                ref={resultsRef} />
            <label id="btn--input" htmlFor="search"></label>
            <div id="blackDrop" ref={balckDropMenu} hidden={open}></div>
            {
                state.matches("success") && hitSearch.length > 0 ? (
                    <div className="hits--results" id="hits--results" hidden={open}> 
                    {/* <button className="ico-bg-close" onClick={() => handleClose()}></button> */}
                        <ul>
                            { hitSearch.slice(0, hitSearch.length - 1).map((prod, index) => {
                                return(
                                <li key={index}>
                                <Link  
                                    to={`/product/${prod._id}/name/${linkName(prod.title)}`}
                                    onClick={() => setOpen(true)}
                                >
                                        <p>{ prod.title }</p>
                                        <img src={ prod.urlfoto[0].toString() } alt={prod.title} />
                                </Link>
                                </li>
                                )
                            })}
                            <li>
                            <Link to={`/search/${keywordSearch}/`}>                                
                                {`Ve los ${(hitSearch.slice(hitSearch.length - 1)[0].title)} resultados  tu busqueda`}
                            </Link>
                            </li>
                        </ul>
                        </div>                    
                )
                : state.matches("success") && hitSearch.length === 0 && (
                    <div className="hits--results" hidden={open}>
                    {/* <button className="ico-bg-close" onClick={() => handleClose()}></button> */}
                        <ul id="error--hits">Ultimas Busquedas</ul>
                    </div>
                )
            }
            </div>
        </div>

    )
}

export default SearchEngine