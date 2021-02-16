import { 
    CCol,
    CLink,
    CRow,
    CSidebarNav,
    CDropdown,
    CDropdownItem,
    CDropdownMenu,
    CDropdownToggle,
    } from '@coreui/react'
import React, { Fragment } from 'react'

const Categories = () => {
    return(
        <Fragment>
            <CRow className="d-md-none ml-3">            
            <CDropdown className="m-1 btn btn-warning">
            <CDropdownToggle>
                Condición
            </CDropdownToggle>
            <CDropdownMenu>
                <CDropdownItem to="/product/new">Nuevo</CDropdownItem>
                <CDropdownItem to="/prodct/use">Usado</CDropdownItem>
                <CDropdownItem to="/product/refb">Reacondicionado</CDropdownItem>
            </CDropdownMenu>
            </CDropdown>
            </CRow>
            <CRow className="d-flex flex-column d-sm-down-none">
                {/* nombre del productos buscado */}
                <CCol>
                    <h2>Audifonos</h2>
                </CCol>
                <CCol className="mt-5 mb-5">

                </CCol>
                <CCol className="d-flex flex-column">
                    <h5 className="mb-3">Condición</h5>
                    <CSidebarNav>
                    <CLink  className="mb-2 link-categories">Nuevo</CLink>
                    <CLink  className="mb-2 link-categories">Usado</CLink>
                    <CLink  className="mb-2 link-categories">Reacondicionado</CLink>
                    </CSidebarNav>
                </CCol>
            </CRow>
        </Fragment>
    )
}


export default Categories