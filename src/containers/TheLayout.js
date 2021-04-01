import React, { useState, useEffect } from 'react'
import {
  CatalogoContainer,
  TheSidebar,
  TheFooter,
  TheHeader
} from './index'


// import Csv2Json from '../lab/Csv2Json'
// import GtiBanner from '../views/gtiBanner/GtiBanner'
const  EmblaCarousel  = React.lazy(() => import('../components/EmblaCarousel/EmblaCarousel'))
// const  EmblaCategorias  = React.lazy(() => import('../components/EmblaCarousel/EmblaCatergorias'))
const  Categories = React.lazy(() => import('../views/ProductosCards/Categories'))


const SLIDE_COUNT = 3
const slides = Array.from(Array(SLIDE_COUNT).keys())

const TheLayout = (props) => {

  const [ busqueda, setBusqueda ] = useState(undefined)
      
  useEffect(() => {
    if(props.match.isExact){
      setBusqueda("")
    }
  })

  return (
    <div className="c-app c-default-layout">
      <TheSidebar/>
      {/* <Csv2Json /> */}
      <div className="c-wrapper">
        <TheHeader busqueda={setBusqueda} />
          <div className="c-body bg-black">
            <EmblaCarousel  slides={slides} />
            <Categories busqueda={props} />
          </div>
        <div>
          
          <CatalogoContainer {...props} busqueda={busqueda} />
          {/* <EmblaCategorias /> */}
          <TheFooter/>
        </div>
      </div>
    </div>
  )
}

export default TheLayout
