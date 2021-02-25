import React, { useEffect, useState } from 'react'
import { 
    CCol,
    CContainer, 
    CRow,
    // CCarousel,
    // CCarouselInner,
    // CCarouselItem,
    // CCarouselCaption,
    // CCarouselControl,
    // CCarouselIndicators,
    // CCard

} from '@coreui/react'



import Card from '../views/ProductosCards/Card'
import Categories from '../views/ProductosCards/Categories'

import { useMachine } from '@xstate/react'
import { CatalogoXstate } from '../context/CatalogoXstate'

// import slide from '../assets/unisec.PNG'

// TODO hacer modal una vez que se hace link en la tienda virtual
// TODO crear el paginador de busqueda
// TODO implementar la API
// TODO crear en el sider el bloque de identifiacion de la tienda.
// TODO copiar el footer de mercado libre
// TODO implemetar la API de mercado libre para la creacion de elementos



const CatalogoContainer  = () => {

    const [ activeIndex ] = useState(0)

    const [ state, send ] = useMachine(CatalogoXstate)
    useEffect(() => {
        send('ALL_PRODUCTOS')
    },[send])

    const { all_products } = state.context
    
    return(
    <CContainer>

        <CRow className="d-flex mt-5 justify-content-arround justify-content-center mb-4">
            <CCol className="col-sm-3">
                <Categories />
            </CCol>
            <CCol className="col-12 col-md-8 col-lg-6">
                {state.matches('all_products') && <span>Cargando la busqueda</span>}
                {state.matches('success') && 
                    all_products?.map(item => <Card key={item._id} props={item} />)    
                }
                
            </CCol>
        </CRow>
    </CContainer>
        
    )
}

export default CatalogoContainer