import React from 'react'
import { Carousel } from 'antd'

import { mediaCarousel } from '../EmblaCarousel/media'

const CarouselHeader = () => {
  return(
    <div id="carrouseNB">
      <Carousel autoplay>
        {
          Object.values(mediaCarousel).map((item, index) => {
            return <div key={index}>{ item }</div>
          })
        }
      </Carousel>
    </div>
    
  )
}

export default CarouselHeader