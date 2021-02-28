import React, { Fragment, useEffect } from 'react'

import { 
    CCol,
    CRow,
    CDropdown,
    CDropdownItem,
    CDropdownMenu,
    CDropdownToggle,
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
        <section>
            {/* menu para celular */}
            <CRow className="d-md-none ml-3 d-flex wrapper">            
            <CDropdown className="m-1 btn btn-warning">
                <CDropdownToggle>
                    Catagorias
                </CDropdownToggle>
                <CDropdownMenu>
                    {labels.map(item => <CDropdownItem to={`/product/categorias/${item._id}`}>{item.title}</CDropdownItem> )}
                </CDropdownMenu>
            </CDropdown>

            <CDropdown className="m-1 btn btn-warning">
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
                                
                <CCol className="mt-5 mb-5">
                {/* menu de categorias */}
                <Cmenu props={{...brands, cardname: "Marcas" }} />

                {/* Labels */}
                <Cmenu props={{...labels, cardname: "Categorias" }} />

                </CCol>
            </CRow>
            
        </section>
    )
}


export default Categories