import React, { useEffect } from 'react'
import { 
    CCol, 
    CRow,
} from '@coreui/react'

import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import Card from '../ProductosCards/Card'

import { useMachine } from '@xstate/react'
import { CatalogoXstate } from '../../context/CatalogoXstate'

const Dashboard = ({ match }) => {

    const { isExact } = match

    const [ state, send ] = useMachine(CatalogoXstate)

    useEffect(() => {
        send('SAMPLE')
    },[send])

    const { sample } = state.context
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />

    return(
    <CRow>

            <CCol>
                {state.matches('sample') && isExact && (
                    <div className="content--no--data">
                        <h2 className="mr-3">Cargando productos...</h2>{" "}
                        <Spin indicator={antIcon} />
                    </div>
                ) }
                
                {state.matches('success') && (
                    <div>
                    <div><p className="bg--random--products text-center">Ultimos productos <small>de {sample.count}</small></p></div>
                        <div className="center--content">
                            {sample?.prod.map(item => <Card key={ item._id } props={item} />)}
                        </div>
                    </div>
                )
                    
                }
                
            </CCol>
        </CRow>
    )
}


export default Dashboard