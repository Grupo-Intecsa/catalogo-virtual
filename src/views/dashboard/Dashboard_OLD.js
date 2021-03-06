
// v1 -- version del dashboard 
import React, { useEffect, useRef, useState, useCallback } from 'react'


import { useMachine } from '@xstate/react'
import { CatalogoXstate } from 'context/CatalogoXstate'
import useNearScreen from 'hooks/useNearScreen'

import { Spin, Space } from 'antd';
import debounce from 'just-debounce-it'

const Card = React.lazy(() =>  import('../ProductosCards/Card'))

const Dashboard = ({ match }) => {

    const { isExact } = match
    const [ state, send ] = useMachine(CatalogoXstate)
    const [ loading, setLoading ] =  useState(true)

    const { sample, infiniteData, infiniteCount } = state.context

    const topDashBoard = document.getElementById("topDashBoard")

    const observerRef = useRef()
    const { isNearScreen } = useNearScreen({ externalRef: loading ? null : observerRef, once: false })

    const infiniteDebounce = useCallback(debounce(() => {
        send('MORE_DATA')
    }, 500),[])

    useEffect(() => {
    if(isNearScreen){
        infiniteDebounce()
    }
    },[ isNearScreen, infiniteDebounce ])
    

    useEffect(() => {
        send('SAMPLE')
    },[send])


    useEffect(() => {
        if(state.matches("success")){
        setLoading(false)
        }
    },[state.value])
    
    return(
    <div id="topDashBoard">
            <div>
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
                            {/* <p className="bg--random--products text-center">Ultimos productos <small>de {sample.count}</small></p> */}
                            <p className="bg--random--products text-center">Ultimos productos</p>
                        </div>
                        <div className="center--content">
                            {sample?.prod.map(item => <Card key={ item._id } props={item} badge={true} />)}  
                        </div> 
                    </div>

                    <div className="center--content">
                        {/* {Object.values(infiniteData).length === 0 && <span>Cargando más...</span>} */}
                        {Object.values(infiniteData).length > 0 && infiniteData.map(item => {
                            return(
                                <Card props={item} />
                            )
                        })}
                    </div>

                    <div id="chivato" ref={observerRef}>
                        <div className="d-flex justify-content-center">
                            {infiniteCount && infiniteCount.message 
                                ? <div className="text-black-50 font-weight-bold font-2xl" onClick={() => topDashBoard.scrollIntoView()}>¡Subir!</div> 
                                : <div className="bouncingLoader" />}
                        </div>
                    </div>
                </>  
                )}

            </div>
            
        </div>
    )
}


export default Dashboard