import React, { useState, useEffect } from 'react'
import {
  CatalogoContainer,
  TheSidebar,
  TheFooter,
  TheHeader,
} from './index'

import CarouselHeader from 'components/Slider/CarouselHeader'
const  MarcasLabel = React.lazy(() => import('../views/ProductosCards/Categories'))
const TheLayout = (props) => {

  return (
    <div>
      <TheSidebar/>
      {/* <Csv2Json /> */}
      <div>
        <TheHeader  />
      <div>
        <div className="d-flex justify-content-center">
          <CarouselHeader />
        </div>
            <MarcasLabel busqueda={props} />
        </div>
        <div id="CatalogoContainer">
          <CatalogoContainer {...props}/>
        </div>
        

      <div id="footer">
        <TheFooter/>
      </div>
      </div>
    </div>
  )
}

export default TheLayout
