import React, { Suspense } from 'react'
import { 
    CCol,
    CContainer, 
    CRow,
} from '@coreui/react'

import { Switch, Redirect, Route } from 'react-router-dom'

// rutas de la aplicacion
import routes from '../routes'

import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import Categories from '../views/ProductosCards/Categories'

const antIcon = <LoadingOutlined style={{ 'fontSize': 24 }} spin />
const loading = <Spin indicator={antIcon} />

const CatalogoContainer  = (busqueda) => {
    
    return(
    <CContainer className="c--layout">
        
        <CRow className="center--content-nav">
            <CCol className="col-12 col-md-4">
                <Categories busqueda={busqueda} />
            </CCol>
            <CRow className="col-12 col-md-8 d-flex">
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
            </CRow>
        </CRow>
    </CContainer>
        
    )
}

export default CatalogoContainer