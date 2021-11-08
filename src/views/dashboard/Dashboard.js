import React, { useEffect, useRef } from 'react'
import AllProductos from 'components/AllProductos'
import SliderLastProd from 'components/SliderLastProd'
import utils from 'utils/utils'


const Dashboard = () => {

  let topView = document.getElementById("Navigation")  
  const topRef = useRef(topView)

  useEffect(() => {
    utils.scrollTotop(topRef)
  })

  return(
    <div>
        <AllProductos />
        <SliderLastProd />    
    </div>
  )
}

export default Dashboard