import React, { useEffect } from 'react'

import { 
    CCol,
    CRow,
    CDropdown,
    CDropdownItem,
    CDropdownMenu,
    CDropdownToggle,
    CContainer,
    } from '@coreui/react'

// componentes

import Cmenu from '../Cmenu/Cmenu'

// Context
import { useCatalogoState, useCatalogoDispatch } from '../../context/catalogoContext'
import { useMemo } from 'react'

const Categories = (props) => {

    const { location } = props.busqueda

    const busquedaText = useMemo(() => {
        let nameSearch = location.pathname.split("/")
        return nameSearch.slice(nameSearch.length - 2, nameSearch.length)
    },[location])

    const dispatch = useCatalogoDispatch()
    const state = useCatalogoState()

    const { labels, brands } = state.context

    useEffect(() => {
        dispatch("GET_MENU")
    },[dispatch])

    return(
        <CContainer className="categorias">
            {/* menu para celular */}
            <CRow className="d-md-none ml-3 d-flex wrapper">            
            <CDropdown className="m-1 p-3" style={{ "background-image": "linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%)" }}>
                <CDropdownToggle>
                    Catagorias
                </CDropdownToggle>
                <CDropdownMenu>
                    {labels.map(item => <CDropdownItem to={`/product/categorias/${item._id}`}>{item.title}</CDropdownItem> )}
                </CDropdownMenu>
            </CDropdown>
            
            <CDropdown className="m-1 p-3" style={{ "background-image": "linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%)" }}>
                <CDropdownToggle>
                    Marcas
                </CDropdownToggle>
                <CDropdownMenu>
                    {brands.map(item => <CDropdownItem to={`/product/marcas/${item._id}`}>{item.title}</CDropdownItem> )}
                </CDropdownMenu>
            </CDropdown>
            
            </CRow>
        
            <CRow className="d-flex flex-column d-sm-down-none">
                {/* nombre del productos buscado */}
                    
                    {busquedaText[1].toString() === 'dashboard'
                        ? <h1 style={{ "font-family": "'Roboto', sans-serif" }} >Bienvenido</h1>
                        : (
                            <span className="breadcrumb--custom">
                                
                                {
                                    busquedaText[0].toString() === 'marcas' && (
                                        <span>
                                            <small style={{ "font-family": "'Roboto', sans-serif" }}>BUSCA POR: </small>
                                            <h4>Marcas</h4>
                                        </span>
                                        )
                                }
                                {
                                    busquedaText[0].toString() === 'categorias' && (
                                        <span>
                                            <small style={{ "font-family": "'Roboto', sans-serif" }}>BUSCA POR: </small>
                                            <h4>Categorías</h4>
                                        </span>
                                        )
                                }
                                {   
                                
                                    busquedaText[0].toString() === 'text' && (
                                    <span>
                                        <small style={{ "font-family": "'Roboto', sans-serif" }}>Resultados de tu busqueda</small>
                                        <h4>{busquedaText[1]}</h4>
                                    </span>
                                    )
                                }
                            </span>
                            )
                        }
        
                <CCol className="mt-5 mb-5 col-8">
                {/* menu de categorias */}
                <Cmenu props={{...brands, cardname: "Marcas" }} />

                {/* Labels */}
                {/* <Cmenu props={{...labels, cardname: "Categorias" }} /> */}

                </CCol>
            </CRow>
            
        </CContainer>
    )
}


export default Categories