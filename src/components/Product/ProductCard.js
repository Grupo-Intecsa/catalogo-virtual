import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { useMachine } from '@xstate/react'
import { CatalogoXstate } from 'context/CatalogoXstate'

import ProducHeader from './ProductoHeader'
import ProductoMiddle from './ProductoMiddle'

const ProductCard = () => {

  const [ state, send ] = useMachine(CatalogoXstate)

  const { description } = []
  const params = useParams()
  
  useEffect(() => {
    send('GET_CATALOGO_BY_ID', { data: params?.slug })
    
  },[params, send])

  useEffect(() => {
    const top = document.getElementById("topMenuCard")
    top.scrollIntoView()
  })


  const { queryBrand } = state.context
  console.log(queryBrand)

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
    <div className="product--card--container" id="topCard">
        <section className="section--product--main">
          {
            Object.values(queryBrand).length > 0 && <ProducHeader data={queryBrand} />
          }
          
        </section>

        <section className="section--product--entrada">
            <ProductoMiddle data={queryBrand} />
        </section>
{/* 
        <section className="section--product--entrada">
        </section> */}
          
      </div>
  </div>
  )

}


export default ProductCard