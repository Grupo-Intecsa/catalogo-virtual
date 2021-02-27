import React, { useEffect } from 'react'
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
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import Card from '../views/ProductosCards/Card'
import Categories from '../views/ProductosCards/Categories'

import { useMachine } from '@xstate/react'
import { CatalogoXstate } from '../context/CatalogoXstate'



const CatalogoContainer  = () => {

    const [ state, send ] = useMachine(CatalogoXstate)

    useEffect(() => {
        send('SAMPLE')
    },[send])

    const { sample } = state.context
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />


    return(
    <CContainer>
        
        <CRow className="d-flex mt-5 justify-content-arround justify-content-center mb-4">
            <CCol className="col-sm-3">
                <Categories />
            </CCol>
            <CCol className="col-12 col-md-8 col-lg-6">
                {state.matches('sample') && (
                    <div className="d-flex">
                        <h2 className="mr-3">Cargando productos...</h2>{" "}
                        <Spin indicator={antIcon} />
                    </div>
                ) }
                
                {state.matches('success') && (
                    <div>
                    <div><p className="bg--random--products">{`Descubre más de ${sample.count} productos`}</p></div>
                    {sample?.prod.map(item => <Card key={ item._id } props={item} />)}
                    </div>
                )
                    
                }
                
            </CCol>
        </CRow>
    </CContainer>
        
    )
}

export default CatalogoContainer