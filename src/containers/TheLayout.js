import React, { useState, useEffect } from 'react'
import {
  CatalogoContainer,
  TheSidebar,
  TheFooter,
  TheHeader
} from './index'


// import Csv2Json from '../lab/Csv2Json'
import GtiBanner from '../views/gtiBanner/GtiBanner'

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
        <div className="c-body">
          <GtiBanner />
          <CatalogoContainer {...props} busqueda={busqueda} />
        </div>
        <TheFooter/>
      </div>
    </div>
  )
}

export default TheLayout
