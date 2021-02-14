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
            <CRow className="d-sm-none ml-3">
            <CDropdown className="m-1 btn btn-outline-warning">
            <CDropdownToggle>
                Condición
            </CDropdownToggle>
            <CDropdownMenu>
                <CDropdownItem>Nuevo</CDropdownItem>
                <CDropdownItem>Usado</CDropdownItem>
                <CDropdownItem>Reacondicionado</CDropdownItem>
            </CDropdownMenu>
            </CDropdown>
            </CRow>
            <CRow className="d-flex flex-column d-md-down-none">
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