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
        <Fragment>
            <CRow className="d-md-none ml-3 d-flex wrapper">            

            {/* menu para celular */}

            <CDropdown className="m-1 btn btn-warning">
                <CDropdownToggle>
                    Catagorias
                </CDropdownToggle>
                <CDropdownMenu>
                    {labels.map(item => <CDropdownItem to={`/label/${item._id}`}>{item.title}</CDropdownItem> )}
                </CDropdownMenu>
            </CDropdown>

            <CDropdown className="m-1 btn btn-warning">
                <CDropdownToggle>
                    Marcas
                </CDropdownToggle>
                <CDropdownMenu>
                    {brands.map(item => <CDropdownItem to={`/brand/${item._id}`}>{item.title}</CDropdownItem> )}
                </CDropdownMenu>
            </CDropdown>
            
            </CRow>


            <CRow className="d-flex flex-column d-sm-down-none">
                {/* nombre del productos buscado */}
                <CCol className="d-flex justify-content-center">
                    <h1>Bienvenido</h1>
                </CCol>

                
                <CCol className="mt-5 mb-5">
                {/* menu de categorias */}
                <Cmenu props={{...brands, cardname: "Marcas" }} />

                {/* Labels */}
                <Cmenu props={{...labels, cardname: "Categorias" }} />

                </CCol>
                {/* menu vista celular */}
                {/* <CCol className="d-flex flex-column">
                    <h5 className="mb-3">Condición</h5>
                    <CSidebarNav>
                    <CLink  className="mb-2 link-categories">Nuevo</CLink>
                    <CLink  className="mb-2 link-categories">Usado</CLink>
                    <CLink  className="mb-2 link-categories">Reacondicionado</CLink>
                    </CSidebarNav>
                </CCol> */}
            </CRow>
            
        </Fragment>
    )
}


export default Categories