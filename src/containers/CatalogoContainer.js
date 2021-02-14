import React from 'react'
import { 
    CCol,
    CContainer, 
    CRow,
} from '@coreui/react'

import Card from '../views/ProductosCards/Card'
import Categories from '../views/ProductosCards/Categories'


const CatalogoContainer  = () => {
    
    return(
    <CContainer fluid>
        <CRow className="d-flex mt-5 justify-content-arround justify-content-center">
            <CCol className="col-sm-3">
                <Categories />
            </CCol>
            <CCol className="col-12 col-sm-6">
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
            </CCol>
        </CRow>
    </CContainer>
        
    )
}

export default CatalogoContainer