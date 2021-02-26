import React from 'react'
import {
  CatalogoContainer,
  TheSidebar,
  TheFooter,
  TheHeader
} from './index'

// import Csv2Json from '../lab/Csv2Json'

const TheLayout = (props) => {

  return (
    <div className="c-app c-default-layout">
      <TheSidebar/>
      {/* <Csv2Json /> */}
      <div className="c-wrapper">
        <TheHeader/>
        <div className="c-body">
          <CatalogoContainer {...props} />
        </div>
        <TheFooter/>
      </div>
    </div>
  )
}

export default TheLayout
