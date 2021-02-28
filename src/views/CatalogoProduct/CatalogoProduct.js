import React, { useEffect } from 'react'
import { 
    CCol, 
    CRow,
} from '@coreui/react'

import Card from '../ProductosCards/Card'

import { useMachine } from '@xstate/react'
import { CatalogoXstate } from '../../context/CatalogoXstate'

import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';


const CatalogoProduct = ({ match }) => {


    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />

    const { params } = match
    const [ state, send ] = useMachine(CatalogoXstate)

    const { queryBrand } = state.context

    useEffect(() => {

        if(params.slug === "marcas"){
            send("GET_BRAND_ID", { id: params.id, slug: params.slug })
        }else if(params.slug === 'categorias'){
            send("GET_LABEL_ID", { id: params.id, slug: params.slug })
        }

    },[params.id])

    console.log(state)

    return(
    <CRow>

        <CCol className="mt-5">
        {state.matches('getBrandById') && (
                    <div className="content--no--data">
                        <h2 className="mr-3">Cargando productos...</h2>{" "}
                        <Spin indicator={antIcon} />
                    </div>
                ) }

        {state.matches('success') && (
                    <div>
                        { queryBrand.length === 0 && (
                        <div className="content--no--data">
                            <h4 className="mr-3">No hay productos en la categoría seleccionada</h4>{" "}
                        </div>
                        )}

                        <div className="center--content">
                            {queryBrand?.map(item => <Card key={ item._id } props={item} />)}
                        </div>
                    </div>
                )
                    
                }
        </CCol>

    </CRow>
    )
}


export default CatalogoProduct