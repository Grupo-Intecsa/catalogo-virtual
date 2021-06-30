import React, { Suspense } from 'react'

import { Switch, Redirect, Route } from 'react-router-dom'
import { useEffect } from 'react/cjs/react.development'
import routes from '../routes'

const spinner = (
    <div className="logo--intecsa--spinner">
        <div className="bouncingLoader">Cargando</div>
    </div>
)
// rutas de la aplicacion

const CatalogoContainer  = () => {
    
    return(
    <div id="topMenuCard">        
        <Suspense fallback={spinner}>
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