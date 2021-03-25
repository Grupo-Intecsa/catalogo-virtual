import React, { useState, useEffect } from 'react'

import { 
  CPagination
  } from '@coreui/react'


import { useMachine } from '@xstate/react'
import { CatalogoXstate } from '../../context/CatalogoXstate'
import { useParams } from 'react-router'

const Card = React.lazy(() => import('../ProductosCards/Card'))
const HookFamilasBar = React.lazy(() => import('./HookFamilasBar'))

// TODO crear vista de tarjetas 
// TODO crear paginador en todas las rutas

const HookProduct = ({ query }) => {
  

  const params = useParams()
  const { slug, id }  = params
  const [ state, send ] = useMachine(CatalogoXstate)
    

  const [ queryData, setQueryData ] = useState(query)

  const [ memoria, seMemoria ] = useState({
    limit: Object.entries(queryData?.response).length,
    count: Number(Object.values(queryData.info).map((total) => total ).toString())
  })

  const { queryBrand } = state.context  
  const [ currentPage, setCurrentPage ] = useState(1)

  const limit = memoria.count || memoria.limit
  const pages = Math.ceil( memoria.count / 10)
  
  useEffect(() => {
    if(slug === 'marcas'){
      send('GET_BRAND_ID', { id: id, page: currentPage })
    }

    else if(slug === 'text'){
      send("GET_TEXT_QUERY", { id: params.id, slug: params.slug, page: currentPage })

    }else if(slug === 'familias'){
      send("GET_FAMILA_BY_TITLE", { id: params.id, page: currentPage })
    }

  },[currentPage])

  useEffect(() => {
    if(state.matches('success')){
      setQueryData(queryBrand)
    }
  },[state.value])


  return(
    <div>
      
      <div>
        <HookFamilasBar  id={ id }/>
      </div>
      
      <div className="center--content">
      <h4 className="text-center mt-5">Pagína: {currentPage}</h4>
      <span className="d-flex flex-row text-center"><p className="pr-3">Productos encontrados:</p>{limit}</span>
      { Array.isArray(queryData) 
          ? queryData.response.map(item => <Card key={ item._id } props={item} />) 
          : Object.values(queryData.response).map(item => <Card key={ item._id } props={item} />)
      }
    </div>

{/*     
    <h1>{JSON.stringify(state.context.id)}</h1>
    <h1>{JSON.stringify(state.value)}</h1> */}

    { limit >= 10 &&(
    
        <CPagination
          size="lg"
          align="center"
          addListClass="some-class"
          activePage={currentPage}
          pages={pages}
          onActivePageChange={setCurrentPage}
          onClick={() => document.body.scrollTop = 0}
      />
    
    )
    
  }
</div>
  )
}


export default HookProduct