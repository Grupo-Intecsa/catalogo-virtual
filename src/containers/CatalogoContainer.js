import React, { Suspense } from 'react'
import { 
    CCol,
    CContainer, 
} from '@coreui/react'

import { Switch, Redirect, Route } from 'react-router-dom'

// rutas de la aplicacion
import routes from '../routes'

import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const antIcon = <LoadingOutlined style={{ 'fontSize': 24 }} spin />
const loading = <Spin indicator={antIcon} />

const CatalogoContainer  = () => {
    
    return(
    <CContainer>        
        
            <CCol className="d-flex justify-content-center">
                <Suspense fallback={loading}>
                    <Switch>
                        {
                            routes
                            .map((route, index) => {
                                return route.componente && (
                                        <Route 
                                        key={index}
                                            path={route.path}
                                            exact={route.exact}
                                            name={route.name}
                                            render={(props) => (
                                                <route.componente { ...props }/>
                                                )}
                                                />
                                    )
                                })
                            }
                        <Redirect from="/" to="/dashboard" />
                    </Switch>
                </Suspense>
            </CCol>
        
    </CContainer>
        
    )
}

export default React.memo(CatalogoContainer)