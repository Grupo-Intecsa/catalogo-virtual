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
    <div className="container--layout">
      <nav>
        <TheHeader />
        { pathname === "/dashboard" && <CarouselHeader /> }
        <MarcasLabel busqueda={props} />
      </nav>

      <section id="CatalogoContainer">
        <CatalogoContainer {...props}/>
      </section>

      <section id="footer">
        <TheFooter/>
      </section>
    </div>
  )
}

export default TheLayout
