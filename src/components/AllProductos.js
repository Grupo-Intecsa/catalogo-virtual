import React, { useEffect, useContext } from 'react'
import { AppContext } from 'context/AppContext'
import { useCatalogoDispatch, useCatalogoState } from "context/catalogoContext"

import { Link } from 'react-router-dom'
import SkeletonCardProduct from './skeletons/SkeletonCardProduct'

import { Helmet } from 'react-helmet'

const Categorias = ({ payload }) => {

  return (
    payload.map((item) => {
      return(
        <Link to={{ pathname: `/categories/${item._id}`, state: { title: item.title }}} key={item._id} className="content--products">
          <div className="text-center">
              <img src={item.img} alt={item.title} loading="eager" />
              <span>{item.title}</span>
          </div>
        </Link>
      )
    })
  )
}


const AllProductos = () => {
  
  const { lenguage } = useContext(AppContext)  
  const dispatch = useCatalogoDispatch()
  const state = useCatalogoState()

  useEffect(() => {
    dispatch("GET_MENU")
  },[])

  const { labels } = state.context
  const descriptionMeta = labels.length > 0 && labels.map(item => item.title)
    
  return(
    <div id="allproducts">

        <Helmet 
          meta={[
            {
              name: "keywords",
              content: descriptionMeta.toString()
            }
          ]}
        >
          <title>Grupo Intecsa, Venta de productos e Ingeniería para el sector eléctrico</title>
        </Helmet>


      <div className="all--products-title mt-4 mb-4">
          <h2 className="text-center">
            { lenguage === 'es' ? 'Todos los productos' : 'All products' }
          </h2>
      </div>
    <div className="d-flex justify-content-center">
    <div className="all--products--container mb-4">
          { labels.length === 0 && <SkeletonCardProduct />}
          { state.matches("success") > 0 && <Categorias payload={ labels }/> }
    </div>
    </div>
    </div>
  )
}


export default AllProductos