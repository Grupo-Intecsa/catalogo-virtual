import React, { useContext, memo } from 'react'
import { Link, useParams } from "react-router-dom"


import utils from 'utils/utils'
import { AppContext } from 'context/AppContext'

const SlimCard = ({ data }) => {
  
  const { logoSelector } = useContext(AppContext)
  const params = useParams()
  const { title, brand, model, capacidad, urlfoto, _id } = data 

  return(
    
    <Link className="slimCard" to={{ pathname: `/product/${_id}/name/${data.title}`, state: { categoria: params.slug, familia: params.item } }}>

      <section className="slim-a">
        <img src={urlfoto[0]} />
      </section>

      <section className="slim-b">
        <p>{ title }</p>
      <span>{ brand.map(item=> logoSelector(item.brand_id)) }</span>    

        <div className="slim-c">

            <div>
              <p>Modelo:</p>
              <span>{ model }</span>
            </div>

            <div>
              <p>Capacidad:</p>
              { <span>{ utils.capacidadSet(capacidad) }</span> }
            </div>
        </div>
      </section>
    </Link>
    
  )
}


export default memo(SlimCard)