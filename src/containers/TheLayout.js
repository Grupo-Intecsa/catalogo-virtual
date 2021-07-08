import React from 'react'
import { useLocation } from 'react-router-dom'
import {
  CatalogoContainer,
  // TheSidebar,
  TheFooter,
  TheHeader,
} from './index'

import CarouselHeader from 'components/Slider/CarouselHeader'
const  MarcasLabel = React.lazy(() => import('../views/ProductosCards/Categories'))

const TheLayout = (props) => {

  const location = useLocation()
  const { pathname } = location

  return (
    <div>
      <div>
        <TheHeader  />
      <div>
        <div className="d-flex justify-content-center">
          { pathname === "/dashboard" && <CarouselHeader /> }
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
