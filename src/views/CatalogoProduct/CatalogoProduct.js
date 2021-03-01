import React, { useEffect } from 'react'
import { 
    CCard,
    CCol, 
    CRow,
    CCardBody
} from '@coreui/react'

import Card from '../ProductosCards/Card'

import { useMachine } from '@xstate/react'
import { CatalogoXstate } from '../../context/CatalogoXstate'

import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';


const CatalogoProduct = ({ match }) => {

    const { params } = match
    const [ state, send ] = useMachine(CatalogoXstate)

    const { queryBrand } = state.context

    useEffect(() => {

        if(params.slug === "marcas"){
            send("GET_BRAND_ID", { id: params.id, slug: params.slug })
        }else if(params.slug === 'categorias'){
            send("GET_LABEL_ID", { id: params.id, slug: params.slug })
        }else if(params.slug === 'text'){
            send("GET_TEXT_QUERY", { id: params.id, slug: params.slug })
        }

    },[params.id])


    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />

    console.log(state)

    return(

    <CRow>

        <CCol className="mt-5 productos--height">
        { state.matches('init') && (
            <div className="content--no--data">
            <h2 className="mr-3">Cargando productos...</h2>{" "}
            <Spin indicator={antIcon} />
        </div>
        )}
        { state.matches('success') && queryBrand.length === 0 && (
            <div className="d-flex justify-content-center">
                <CCard>
                    <CCardBody>
                            <span className="bg--random--products">No hay publicaciones que coincidan con tu búsqueda.</span>
                                    <ul className="mt-2">
                                        <li>Revisa la ortografía de la palabra.</li>
                                        <li>Utiliza palabras más genéricas o menos palabras.</li>
                                        <li>Navega por las categorías para encontrar un producto similar</li>
                                    </ul>
                    </CCardBody>
                </CCard>
            </div>
        ) }

        {state.matches('success') && (
                    <div>
                        {console.log(typeof queryBrand)}
                        <div className="center--content">
                        { Array.isArray(queryBrand) 
                            ? queryBrand.map(item => <Card key={ item._id } props={item} />) 
                            : Object.values(queryBrand).map(item => <Card key={ item._id } props={item} />)
                        }
                        </div>
                    </div>
                )
                    
                }
        </CCol>

    </CRow>
    )
}


export default CatalogoProduct