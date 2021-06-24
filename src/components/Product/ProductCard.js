import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { useMachine } from '@xstate/react'
import { CatalogoXstate } from 'context/CatalogoXstate'


const ProductCard = () => {

  const [ state, send ] = useMachine(CatalogoXstate)

  const { description } = []
  const params = useParams()
  
  useEffect(() => {
    send('GET_CATALOGO_BY_ID', { data: params?.slug })
    console.log(params)
    
  },[params, send])

  console.log(state.matches("success"), state)
  const { queryBrand } = state.context

  return(
    <div>
      <Helmet
          title={params.title}
          htmlAttributes={{ lang: "es" }}
          meta={
            [
              {
                name: "description",
                content: description

              }
            ]
          }
        >

      </Helmet>
    <h1>Para nulificar</h1>
    <div>
      <span>{state.matches('success') && <div>{queryBrand?.title}</div>}</span>
    </div>
  </div>
  )

}


export default ProductCard