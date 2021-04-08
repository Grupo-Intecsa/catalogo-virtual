import React, { useEffect } from 'react'
import { 
    CCol, 
    CRow,
} from '@coreui/react'

import { useMachine } from '@xstate/react'
import { CatalogoXstate } from 'context/CatalogoXstate'

import { Spin, Space } from 'antd';

const Card = React.lazy(() =>  import('../ProductosCards/Card'))

const Dashboard = ({ match }) => {

    const { isExact } = match
    const [ state, send ] = useMachine(CatalogoXstate)

    useEffect(() => {
        send('SAMPLE')
    },[send])

    const { sample } = state.context
    
    return(
    <CRow>
            <CCol>
                {state.matches('sample') && isExact && (
                    <div className="content--no--data">
                        <h2 className="mr-3">Cargando productos...</h2>{" "}
                        <Space size="large">
                            <Spin size="large" />
                        </Space>
                    </div>
                ) }
                
                {state.matches('success') && (
                    <div>
                    <div><p className="bg--random--products text-center">Ultimos productos <small>de {sample.count}</small></p></div>
                        <div className="center--content">
                            {sample?.prod.map(item => <Card key={ item._id } props={item} badge={true} />)}
                        </div>
                    </div>
                )
                    
                }
                
            </CCol>
        </CRow>
    )
}


export default Dashboard