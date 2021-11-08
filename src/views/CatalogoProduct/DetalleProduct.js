import React, { Fragment, useEffect } from 'react'
import { useLocation, useHistory } from 'react-router-dom'

import { useMachine } from '@xstate/react'
import { CatalogoXstate } from '../../context/CatalogoXstate'

import HookCardProduct from './HookCardProduct'

const DetalleProduct = (props) => {

    const { match } = props
    const location = useLocation()
    const viewTop = document.getElementById("DetalleProduct")
    
    const [ state, send ] = useMachine(CatalogoXstate)
    const { queryBrand } = state.context
    const { slug } = match.params


    const history = useHistory()

    useEffect(() => {
      send('GET_CATALOGO_BY_ID', { data: slug })
    },[slug, send])

    useEffect(() => {
      if(state.matches("error")){
        return history.push({ pathname: "/error404"})
      }
    },[state.value, history, state])

    useEffect(() => {
      if(location.state === "@send/hookcard"){
        viewTop.scrollIntoView()
      }
      
    },[location, viewTop])

    return (
    <Fragment>

      <div id="DetalleProduct">
        { state.matches('getCatalogoById') && (
          <div className="content--no--data">
            <div>Cargando vista</div>
          </div>
        )}
        { state.matches('getFamiliaById') && (
          <div className="content--no--data">
            <div>Cargando vista</div>
          </div>
        )}

        { state.matches('success') &&  <HookCardProduct data={queryBrand} />}  
        
        
      </div>
    </Fragment>
        
    )
}


export default DetalleProduct