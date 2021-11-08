import React, { Suspense } from 'react'

import { Switch, Redirect, Route } from 'react-router-dom'
import SkeletonCardProduct from 'components/skeletons/SkeletonCardProduct'

import routes from '../routes'

// rutas de la aplicacion

const CatalogoContainer  = () => {
    
    return(
    <div id="topMenuCard">        
        <Suspense fallback={<SkeletonCardProduct />}>
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
    </div>
        
    )
}

export default React.memo(CatalogoContainer)