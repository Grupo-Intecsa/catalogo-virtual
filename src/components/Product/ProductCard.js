import React, { useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { useMachine } from '@xstate/react'
import { CatalogoXstate } from 'context/CatalogoXstate'

import utils from 'utils/utils'
import SkeletonCardProduct from 'components/skeletons/SkeletonCardProduct'

import ProducHeader from './ProductoHeader'
import ProductoMiddle from './ProductoMiddle'

const ProductCard = () => {

  const [ state, send ] = useMachine(CatalogoXstate)
  const params = useParams()
  
  useEffect(() => {
    send('GET_CATALOGO_BY_ID', { data: params?.slug })
    
  },[params])

  const topRef = useRef()
  useEffect(() => {
    utils.scrollTotop(topRef)
  })

  const { queryBrand } = state.context
  
  return(
    <div ref={topRef}>
      <Helmet
          title={queryBrand?.title}
          htmlAttributes={{ lang: "es" }}
          meta={
            [
              {
                name: "description",
                content: queryBrand?.desc

              }
            ]
          }
        >
          <script type="application/ld+json">
              {
                `
                {
                  "@context": "http://schema.org/",
                  "@type": "Product",
                  "image": ${JSON.stringify(queryBrand.urlfoto)},
                  "name": "${queryBrand.title}",
                  "description": "${queryBrand.desc}",
                  "brand": {
                    "@type": "Brand",
                    "name": "ABB"
                  },
                `
              }
          </script>
          <meta property="og:image" content={JSON.stringify(queryBrand.urlfoto)} />
      </Helmet>
    <div className="product--card--container" id="topCard">
        <section className="section--product--main">
          {
            state.matches("getCatalogoById") && <SkeletonCardProduct />
          }
          {
            Object.values(queryBrand).length > 0 && <ProducHeader data={queryBrand} />
          }
          
        </section>

        <section className="section--product--entrada">
          {
            state.matches("success") && <ProductoMiddle data={queryBrand} />
          }
        </section>
        {/* 
          <section className="section--product--entrada">
          </section> 
        */}
          
      </div>
  </div>
  )

}


export default ProductCard