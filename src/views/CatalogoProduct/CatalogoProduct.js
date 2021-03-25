import React, { useEffect, useState } from 'react'
import { 
    CCard,
    CCol, 
    CRow,
    CCardBody
} from '@coreui/react'


import { useMachine } from '@xstate/react'
import { CatalogoXstate } from '../../context/CatalogoXstate'

import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import HookProduct from './HookProduct'


const CatalogoProduct = ({ match }) => {

    const [ currentState, setCurrentState ] = useState('idle')

    const { params } = match
    
    const [ state, send, service ] = useMachine(CatalogoXstate)

    useEffect(() => {
        const sub = service.subscribe((state) => console.log(state))
        return () => sub.unsubscribe()
    },[state, service])

    const { queryBrand } = state.context

    useEffect(() => {
        // Ok
        if(params.slug === "marcas"){
            setCurrentState("getBrandById")
            send("GET_BRAND_ID", { id: params.id, slug: params.slug, page: 1 })
            

        }else if(params.slug === 'categorias'){
            setCurrentState("getLabelsById")
            send("GET_LABEL_ID", { id: params.id, slug: params.slug })
            

        }else if(params.slug === 'text'){
            setCurrentState("getByText")
            send("GET_TEXT_QUERY", { id: params.id, slug: params.slug, page: 1 })          


        }else if(params.slug === 'familias'){
            setCurrentState("getFamilia")
            send("GET_FAMILA_BY_TITLE", { id: params.id, slug: params.slug, page: 1 })
        }

    },[params.id])


    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />

    return(

    <CRow>

        <CCol>
        { state.matches(`${currentState}`) && (
            <div className="content--no--data">
            <h2>Cargando productos...</h2>{" "}
            <Spin indicator={antIcon} />
        </div>
        )}
        { state.matches('success') && queryBrand.length === 0 && (
            <div>
                <CCard>
                    <CCardBody>
                            <span className="bg--random--products">No hay productos que coincidan con tu búsqueda.</span>
                                    <ul className="mt-2">
                                        <li>Revisa la ortografía de la palabra.</li>
                                        <li>Utiliza palabras más genéricas o menos palabras.</li>
                                        <li>Navega por las categorías para encontrar un producto similar</li>
                                    </ul>
                    </CCardBody>
                </CCard>
            </div>
        )}

        { state.matches('error') && (
            <div className="mt-5">
                <CCard>
                    <CCardBody>
                            <span className="bg--random--products">No hay productos que coincidan con tu búsqueda.</span>
                                    <ul className="mt-2">
                                        <li>Revisa la ortografía de la palabra.</li>
                                        <li>Utiliza palabras más genéricas o menos palabras.</li>
                                        <li>Navega por las categorías para encontrar un producto similar</li>
                                    </ul>
                    </CCardBody>
                </CCard>
            </div>
        )}

        {
            state.matches('success') && <HookProduct query={ queryBrand } />                    
        }
        {
            state.matches('reject') && (
                <div className="alert alert-warning alert-dismissible fade show text-center" role="alert">
                    <strong>Tenemos un problema!</strong><hr/>
                        Incluye más letras en el campo de búsqueda.
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            )
        }
        </CCol>
    </CRow>
    )
}


export default CatalogoProduct