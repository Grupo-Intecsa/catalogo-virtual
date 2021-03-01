import React, { Fragment, useEffect } from 'react'

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

const Categories = () => {

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
                
                    <h1 className="mt-5">Bienvenido</h1>
                                
                <CCol className="mt-5 mb-5 col-8">
                {/* menu de categorias */}
                <Cmenu props={{...brands, cardname: "Marcas" }} />

                {/* Labels */}
                <Cmenu props={{...labels, cardname: "Categorias" }} />

                </CCol>
            </CRow>
            
        </CContainer>
    )
}


export default Categories