import React, { Fragment, useEffect } from 'react'

import { useMachine } from '@xstate/react'
import { CatalogoXstate } from '../../context/CatalogoXstate'

import { Spin, Space } from 'antd';

import HookCardProduct from './HookCardProduct'

const DetalleProduct = (props) => {

    const { match } = props

    const [ state, send ] = useMachine(CatalogoXstate)
    const { queryBrand } = state.context
    const { slug } = match.params

    useEffect(() => {
      send('GET_CATALOGO_BY_ID', { data: slug })
    },[slug])


    return (
    <Fragment>

      <div>
        { state.matches('getCatalogoById') && (
          <Space size="large">
            <Spin size="large" />
          </Space>
        )}
        { state.matches('getFamiliaById') && (
          <Space size="large">
            <Spin size="large" />
          </Space>
        )}

        { state.matches('success') &&  <HookCardProduct data={queryBrand} />}  
        
        
      </div>
    </Fragment>
        
    )
}


export default DetalleProduct