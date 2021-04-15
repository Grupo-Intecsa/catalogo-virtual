import React, { useEffect, useRef, useState } from 'react'
import { 
    CCol, 
    CRow,
} from '@coreui/react'


import { useMachine } from '@xstate/react'
import { CatalogoXstate } from 'context/CatalogoXstate'
import useNearScreen from 'hooks/useNearScreen'

import { Spin, Space } from 'antd';

const Card = React.lazy(() =>  import('../ProductosCards/Card'))

const Dashboard = ({ match }) => {

    const { isExact } = match
    const [ state, send ] = useMachine(CatalogoXstate)
    const [ loading, setLoading ] =  useState(true)

    const { sample, infiniteData } = state.context

    const observerRef = useRef()
    const { isNearScreen } = useNearScreen({ externalRef: loading ? null : observerRef })

    useEffect(() => {
    if(isNearScreen === true ){
        console.log(isNearScreen)
        send('MORE_DATA')
    }
    },[isNearScreen])
    

    useEffect(() => {
        send('SAMPLE')
    },[send])


    useEffect(() => {
        if(state.matches("success")){
        setLoading(false)
        }
        return () => setLoading(true)
    },[state.value])
    
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
                
                { Object.values(sample).length > 0 && (
                <>
                    <div>
                        <div>
                            <p className="bg--random--products text-center">Ultimos productos <small>de {sample.count}</small></p>
                        </div>
                        <div className="center--content">
                            {sample?.prod.map(item => <Card key={ item._id } props={item} badge={true} />)}  
                        </div> 
                    </div>

                    <div className="center--content">
                        {Object.values(infiniteData).length === 0 && <span>Cargando más...</span>}
                        {Object.values(infiniteData).length > 0 && infiniteData.prod.map(item => {
                            return(
                                <Card props={item} />
                            )
                        })}
                    </div>

                    <div id="chivato" ref={observerRef}></div>
                    { JSON.stringify(state.value) }
                </>  
                )}

            </CCol>
            
        </CRow>
    )
}


export default Dashboard